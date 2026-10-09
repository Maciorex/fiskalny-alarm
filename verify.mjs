import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {sources,motifs} from './src/data.mjs';
import {bodies,themes,intros,endings,generateAlarm,clipboardText} from './src/engine.mjs';
const unique=items=>new Set(items.map(x=>x.id)).size===items.length;
assert(unique(sources)&&unique(motifs)&&unique(bodies),'IDs must be unique');
for(const m of motifs)assert(sources.some(s=>s.id===m.source),'Every motif must have an existing source');
for(const b of bodies){assert(themes.includes(b.theme));if(b.motif)assert(motifs.some(m=>m.id===b.motif));}
for(const s of sources){assert.equal(new URL(s.url).protocol,'https:');if(s.date)assert(s.date<='2026-10-09');}
for(const s of sources){const words=motifs.filter(m=>m.source===s.id&&m.quote).flatMap(m=>m.quote.trim().split(/\s+/)).length;assert(words<=25,'Quoted words per source exceed limit: '+s.id);}
assert.equal(motifs.find(m=>m.id==='kula-noga').author,'Inni');
let count=0;
for(const theme of themes)for(let level=0;level<3;level++){
  let previousBody=null;
  for(let i=0;i<200;i++){
    const a=generateAlarm({theme,level,previousBody});
    assert(a.id!==previousBody,'Avoid consecutive body repeats');
    assert(theme==='all'||a.theme===theme,'Theme filtering must hold');
    assert(intros[level].some(x=>a.text.startsWith(x))&&endings[level].some(x=>a.text.endsWith(x)),'Correct intensity');
    assert(!a.text.includes('undefined')&&!a.text.includes('[object Object]'));
    assert(clipboardText(a).includes('Satyra')&&clipboardText(a).includes('nie cytat'));
    previousBody=a.id;count++;
  }
}
for(const options of [{theme:'missing'},{level:-1},{level:3},{level:'1'},{level:1.5}])assert.throws(()=>generateAlarm(options),TypeError);
const html=await readFile(new URL('./dist/index.html',import.meta.url),'utf8');
assert(!/<script[^>]+src=|<link[^>]+href="https?:|<img[^>]+src="https?:/.test(html),'No network assets');
assert(html.includes('lang="pl"')&&html.includes('rel="icon"')&&html.includes('aria-live="polite"'));
const comboCount=bodies.length*intros.reduce((sum,list,i)=>sum+list.length*endings[i].length,0);
console.log(JSON.stringify({status:'passed',generatedChecks:count,motifs:motifs.length,sources:sources.length,bodies:bodies.length,combinations:comboCount,bytes:Buffer.byteLength(html)}));
