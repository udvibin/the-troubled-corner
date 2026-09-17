// Run with Node. No packages or build step are needed.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const html = fs.readFileSync('index.html', 'utf8');
const scripts = [...html.replace(/<!--[\s\S]*?-->/g,'').matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
scripts.forEach(s=>new vm.Script(s));
const code=scripts.at(-1);
const matching=code.slice(code.indexOf('const sameEntry='),code.indexOf('// the preview renders'));
const context=vm.createContext({});
vm.runInContext(matching+'\nthis.sameEntry=sameEntry;',context);
assert.equal(context.sameEntry({id:'one',type:'song',date:'2026-09-17',text:''},{id:'two',type:'song',date:'2026-09-17',text:''}),false,'Distinct song IDs must not collide');
assert.equal(context.sameEntry({id:'one'},{id:'one'}),true);
assert.equal(context.sameEntry({id:'new',type:'song',date:'today',text:''},{type:'song',date:'today',text:''}),false,'New entries must not replace legacy entries');
vm.runInContext(code.slice(code.indexOf('function applyOp('),code.indexOf('function stage(')),context);
vm.runInContext("const byDateDesc=(a,b)=>a.date<b.date?1:a.date>b.date?-1:0",context);
const first={id:'one',type:'song',date:'2026-09-17',text:''};
const second={...first,id:'two'};
assert.equal(context.applyOp([first],{add:second}).length,2);
const edited=context.applyOp([first,second],{add:{...first,text:'edit'},remove:first});
assert.equal(edited.length,2);
assert.equal(edited.find(e=>e.id==='one').text,'edit');
const serial=code.match(/function serializeEntries\(entries\)\{[^\n]+\}/);
assert.ok(serial,'Publish needs safe HTML serialization');
vm.runInContext(serial[0],context);
const sample=[{body:'</script><script>alert(1)</script> — words'}];
const json=context.serializeEntries(sample);
assert.ok(!json.includes('<'),'Serialized data must not close its script');
assert.deepEqual(JSON.parse(json),sample);
async function checkShareErrors(){
  const nodes=new Map(), handlers=new Map();
  const node=id=>{
    if(!nodes.has(id)) nodes.set(id,{value:'https://example.test/#post-test',textContent:'',select(){this.selected=true;},addEventListener(event,fn){handlers.set(id+':'+event,fn);}});
    return nodes.get(id);
  };
  const shareContext=vm.createContext({$:node,navigator:{share:async()=>{throw new Error('share blocked');},clipboard:{writeText:async()=>{throw new Error('copy blocked');}}}});
  vm.runInContext(code.slice(code.indexOf('let cardFile='),code.indexOf('/* ---------- a tiny Markdown')),shareContext);
  await handlers.get('#card-share:click')();
  assert.match(node('#card-status').textContent,/Sharing failed/);
  await handlers.get('#card-copy:click')();
  assert.match(node('#card-status').textContent,/Copy failed/);
  assert.equal(node('#card-link').selected,true);
  shareContext.navigator.clipboard.writeText=async()=>{};
  await handlers.get('#card-copy:click')();
  assert.equal(node('#card-status').textContent,'Link copied.');
}
async function checkCrypto(){
  const tool=fs.existsSync('encrypt-token.html') ? fs.readFileSync('encrypt-token.html','utf8') : null;
  const crypto=require('node:crypto').webcrypto;
  let c;
  if(tool){
  const script=tool.match(/<script>([\s\S]*?)<\/script>/)[1];
  new vm.Script(script);
  const cryptoContext=vm.createContext({crypto:require('node:crypto').webcrypto,TextEncoder,Uint8Array,btoa});
  vm.runInContext(script.slice(0,script.indexOf("document.querySelector('#reset')")),cryptoContext);
  c=await cryptoContext.encryptToken('test-token-only','four test words here');
  }else{
    // The reset page is local-only. A fresh checkout still tests the site's unlock code.
    const salt=crypto.getRandomValues(new Uint8Array(16)), iv=crypto.getRandomValues(new Uint8Array(12));
    const km=await crypto.subtle.importKey('raw',new TextEncoder().encode('four test words here'),'PBKDF2',false,['deriveKey']);
    const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt,iterations:250000,hash:'SHA-256'},km,{name:'AES-GCM',length:256},false,['encrypt']);
    const ct=await crypto.subtle.encrypt({name:'AES-GCM',iv},key,new TextEncoder().encode('test-token-only'));
    c={salt:Buffer.from(salt).toString('base64'),iv:Buffer.from(iv).toString('base64'),ct:Buffer.from(ct).toString('base64')};
  }
  const keyMaterial=await crypto.subtle.importKey('raw',new TextEncoder().encode('four test words here'),'PBKDF2',false,['deriveKey']);
  const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:Buffer.from(c.salt,'base64'),iterations:250000,hash:'SHA-256'},keyMaterial,{name:'AES-GCM',length:256},false,['decrypt']);
  const plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:Buffer.from(c.iv,'base64')},key,Buffer.from(c.ct,'base64'));
  assert.equal(new TextDecoder().decode(plain),'test-token-only');
  // Use the site's actual unlock function, not just a second copy of its settings.
  const unlockContext=vm.createContext({crypto,TextEncoder,TextDecoder,Uint8Array,atob,CONFIG:{TOKEN_CIPHER:c},$:()=>({value:'four test words here'})});
  vm.runInContext(code.slice(code.indexOf('const b64ToBuf'),code.indexOf('// THE GATE:')),unlockContext);
  assert.equal(await unlockContext.getToken(),'test-token-only');
  vm.runInContext('TOKEN=null',unlockContext);
  unlockContext.$=()=>({value:'wrong passphrase'});
  await assert.rejects(unlockContext.getToken(),/Wrong passphrase/);
  const bad=Buffer.from(c.ct,'base64'); bad[0]^=1;
  await assert.rejects(crypto.subtle.decrypt({name:'AES-GCM',iv:Buffer.from(c.iv,'base64')},key,bad));
  await checkShareErrors();
  console.log('PASS: script syntax, entry add/edit IDs, safe serialization, actual site unlock, wrong passphrase, tamper rejection, share/copy error messages');
}
checkCrypto().catch(e=>{console.error(e);process.exitCode=1;});
