import {sources,motifs} from './data.mjs';
import {bodies,intros,endings,themes,generateAlarm,clipboardText} from './engine.mjs';
const $=id=>document.getElementById(id);
const node=(tag,className,text)=>{const el=document.createElement(tag);if(className)el.className=className;if(text!==undefined)el.textContent=text;return el;};
const sourceById=new Map(sources.map(x=>[x.id,x]));
const motifById=new Map(motifs.map(x=>[x.id,x]));
const timeline=[{...bodies.find(x=>x.motif==='transatlantyk'),text:$('result').textContent,level:1,serial:1}];
let position=0,serial=1,toastTimeout;
const archive=node('div');
const toolbar=node('div','archive-toolbar');
const search=node('input');search.type='search';search.placeholder='Szukaj metafory, np. Grecja, garb, sepsa…';search.setAttribute('aria-label','Szukaj w archiwum metafor');
const author=node('select');author.setAttribute('aria-label','Filtruj według autora');
for(const [value,label] of [['all','Wszyscy autorzy'],['Balcerowicz','Leszek Balcerowicz'],['Dudek','Sławomir Dudek'],['Mentzen','Sławomir Mentzen'],['Inni','Inni autorzy']]){const opt=node('option','',label);opt.value=value;author.append(opt);}
toolbar.append(search,author);const archiveCount=node('p','archive-count');archiveCount.setAttribute('role','status');
const grid=node('div','archive-grid');archive.append(toolbar,archiveCount,grid);
const method=node('div','method');method.append(node('h2','','Co jest prawdziwe, a co wymyślone?'));
for(const text of [
  'Generator składa '+bodies.length+' autorskich scenek z wstępami i puentami: '+(bodies.length*intros.reduce((sum,list,i)=>sum+list.length*endings[i].length,0)).toLocaleString('pl-PL')+' możliwych kombinacji. Wszystkie są satyrą. Nazwiska pojawiają się wyłącznie przy udokumentowanych inspiracjach.',
  'Archiwum obejmuje '+motifs.length+' motywów i analogii. Research zawiera '+sources.length+' publikacji z lat 2003–2026, w tym analizę krytyczną wskazaną osobno na karcie. Kilka motywów to rozwinięcia jednej wypowiedzi lub odrębne użycia podobnego obrazu przez różnych autorów. Cytaty oznaczono osobno; pozostałe opisy są omówieniami. Research zamknięto 9 października 2026. Datę pokazujemy tam, gdzie udało się ją potwierdzić w źródle.',
  'Dramatyczna metafora nie dowodzi trafności prognozy. Dudek w rozmowach wskazuje także mocniejsze fundamenty Polski i brak kryzysu „tu i teraz”. Balcerowicz w Radiu ZET 6 października 2026 nie potwierdza katastrofy rozumianej jako całkowite załamanie.',
  'Ważne autorstwo: kulę u nogi w debacie o OFE przywołał Rostowski. Balcerowicz przypisuje rękę w cudzej kieszeni Erhardowi. Pociąg zadłużenia w materiale DGP jest parafrazą redakcji. Dudek użył transatlantyku; Mentzen 8 października 2026 mówił dosłownie o Titanicu. Generatorowe żarty pozostają naszymi tekstami.',
  'Mentzen: wystąpienia z 2023 i 2025 roku sprawdzono w urzędowych stenogramach. Tekst z 8 października 2026 pochodzi z transkrypcji opublikowanej przez Konfederację. Udokumentowanie metafory nie potwierdza wyliczeń ani zarzutów mówcy. Teza „bankructwo albo likwidacja socjalu” jest jego politycznym zawężeniem wyboru, nie dowodem braku innych wariantów. Analiza OKO.press wskazuje ograniczenia analogii greckiej; odnosi się do wywiadu ze stycznia 2026, nie do wczorajszego wystąpienia.'
])method.append(node('p','',text));
archive.append(method);$('archive-content').append(archive);
function authorName(m){if(m.author==='Balcerowicz')return 'Leszek Balcerowicz';if(m.author==='Dudek')return 'dr Sławomir Dudek';if(m.author==='Mentzen')return 'Sławomir Mentzen';return m.source==='kula'?'Jacek Rostowski':'Mateusz Morawiecki';}
function renderArchive(){
  const term=search.value.trim().toLocaleLowerCase('pl');
  const items=motifs.filter(m=>(author.value==='all'||m.author===author.value)&&[m.title,m.context,authorName(m),sourceById.get(m.source).publisher].join(' ').toLocaleLowerCase('pl').includes(term));
  grid.replaceChildren();archiveCount.textContent=items.length+' / '+motifs.length+' motywów · '+new Set(items.map(x=>x.source)).size+' publikacji';
  for(const m of items){
    const s=sourceById.get(m.source);const card=node('article','source-card');card.id='motif-'+m.id;
    const meta=node('div','card-meta');meta.append(node('span','',m.quote?'KRÓTKI CYTAT':'MOTYW / OMÓWIENIE'),node('span','',s.date?s.date.slice(0,4):'DATA NIEUSTALONA'));
    card.append(meta,node('h2','',m.title));
    if(m.quote)card.append(node('blockquote','','„'+m.quote+'”'));
    card.append(node('p','',m.context),node('div','attribution',authorName(m)));
    const date=s.date?new Date(s.date+'T12:00:00Z').toLocaleDateString('pl-PL',{timeZone:'Europe/Warsaw'}):'data nieustalona';
    const link=node('a','source-link',s.publisher+' · '+date+' · Czytaj źródło');link.href=s.url;link.target='_blank';link.rel='noopener noreferrer';link.title=s.title;
    card.append(link,node('div','kind',s.type+(s.dateNote?' · '+s.dateNote:'')));
    if(m.analysis){const analysis=sourceById.get(m.analysis);const extra=node('a','source-link','Analiza ograniczeń porównania · '+analysis.publisher);extra.href=analysis.url;extra.target='_blank';extra.rel='noopener noreferrer';card.append(extra);}
    grid.append(card);
  }
  if(!items.length)grid.append(node('div','empty','Brak takich motywów. Spróbuj innego słowa albo zmień autora.'));
}
function showView(view,{focus=false}={}){
  const isArchive=view==='archive';$('generator-view').hidden=isArchive;$('archive-view').hidden=!isArchive;
  for(const [id,active] of [['nav-generator',!isArchive],['nav-archive',isArchive]]){$(id).classList.toggle('active',active);$(id).setAttribute('aria-pressed',String(active));}
  if(focus){$('main').focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
}
function navigate(view){window.location.hash=view;showView(view,{focus:true});}
function openMotif(id){search.value='';author.value='all';renderArchive();showView('archive');window.location.hash='motif-'+id;requestAnimationFrame(()=>document.getElementById('motif-'+id)?.scrollIntoView({block:'center'}));}
function route(){const hash=window.location.hash.slice(1);showView(hash==='archive'||hash.startsWith('motif-')?'archive':'generator');if(hash.startsWith('motif-'))requestAnimationFrame(()=>document.getElementById(hash)?.scrollIntoView({block:'center'}));}
function draw(){
  const x=timeline[position];$('result').textContent=x.text;$('diagnosis').textContent=x.diagnosis;
  $('serial').textContent='KOMUNIKAT '+String(x.serial).padStart(3,'0');$('history-count').textContent=(position+1)+' / '+timeline.length;
  $('previous').disabled=position===0;$('next').disabled=position===timeline.length-1;
  $('inspiration').replaceChildren();document.getElementById('copy-fallback')?.remove();
  if(x.motif){const m=motifById.get(x.motif);const line=node('span','','Prawdziwa inspiracja: '+m.title+' · '+authorName(m)+'. ');const link=node('a','','Zobacz kontekst');link.href='#motif-'+m.id;link.onclick=e=>{e.preventDefault();openMotif(m.id);};$('inspiration').append(line,link);}
  else $('inspiration').textContent='Motyw autorski. Ta metafora pochodzi z generatora, nie z archiwum wypowiedzi.';
}
function makeAlarm(options={}){
  const alarm=generateAlarm({theme:options.theme??$('theme').value,level:options.level??Number(document.querySelector('input[name="level"]:checked').value),previousBody:timeline[position].id});
  timeline.push({...alarm,serial:++serial});if(timeline.length>100)timeline.shift();position=timeline.length-1;draw();return alarm;
}
function notify(text){clearTimeout(toastTimeout);$('toast').textContent=text;$('toast').hidden=false;toastTimeout=setTimeout(()=>$('toast').hidden=true,3500);}
$('generate').onclick=()=>makeAlarm();
$('randomize').onclick=()=>{
  const theme=themes[Math.floor(Math.random()*themes.length)];
  const level=Math.floor(Math.random()*intros.length);
  $('theme').value=theme;
  document.querySelector('input[name="level"][value="'+level+'"]').checked=true;
  makeAlarm({theme,level});
};
$('previous').onclick=()=>{if(position>0){position--;draw();}};$('next').onclick=()=>{if(position<timeline.length-1){position++;draw();}};
$('copy').onclick=async()=>{
  const text=clipboardText(timeline[position]);
  try{if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');await navigator.clipboard.writeText(text);notify('Skopiowano komunikat z oznaczeniem satyry.');}
  catch{document.getElementById('copy-fallback')?.remove();const area=node('textarea','copy-fallback');area.id='copy-fallback';area.value=text;area.readOnly=true;area.setAttribute('aria-label','Komunikat z oznaczeniem satyry — skopiuj ręcznie');$('inspiration').after(area);area.focus();area.select();notify('Komunikat zaznaczony. Skopiuj go skrótem klawiaturowym.');}
};
$('nav-generator').onclick=()=>navigate('generator');$('nav-archive').onclick=()=>navigate('archive');$('browse').onclick=()=>navigate('archive');
search.oninput=renderArchive;author.onchange=renderArchive;window.addEventListener('hashchange',route);
document.addEventListener('keydown',e=>{if(e.code!=='Space'||e.repeat||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||$('generator-view').hidden)return;if(e.target.closest('input,select,textarea,button,a,[contenteditable="true"]'))return;e.preventDefault();makeAlarm();});
$('motif-count').textContent=motifs.length;$('source-count').textContent=sources.length;
renderArchive();draw();route();
if(document.modelContext?.registerTool){
  const lifecycle=new AbortController();
  try{Promise.resolve(document.modelContext.registerTool({name:'generate_fiscal_alarm',title:'Wygeneruj satyryczny alarm',description:'Generates a fictional Polish fiscal-panic joke, updates the visible generator and appends it to its session history. Never returns a real economist quote.',inputSchema:{type:'object',properties:{theme:{type:'string',enum:themes},level:{type:'integer',minimum:0,maximum:2}},additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){
    if(!input||typeof input!=='object'||Array.isArray(input)||Object.keys(input).some(k=>!['theme','level'].includes(k)))throw new TypeError('Nieprawidłowe parametry.');
    const theme=input.theme??'all',level=input.level??1;
    if(!themes.includes(theme)||!Number.isInteger(level)||level<0||level>2)throw new TypeError('Nieprawidłowy motyw lub poziom.');
    $('theme').value=theme;document.querySelector('input[name="level"][value="'+level+'"]').checked=true;showView('generator');window.location.hash='generator';const alarm=makeAlarm({theme,level});return {text:alarm.text,theme,level,fictional:true};
  }},{signal:lifecycle.signal})).catch(()=>{});}catch{}
  window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
}
