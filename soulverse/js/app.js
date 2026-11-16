/* ===== 5. FAVORITES / RECENTS ===== */
const arr=k=>{const v=store.get(k,[]);return Array.isArray(v)?v:[]};
const fav=()=>arr('fav'),rec=()=>arr('rec');
const toggleFav=id=>{let f=fav();f=f.includes(id)?f.filter(x=>x!==id):[...f,id];store.set('fav',f);route()};
const cardHTML=t=>`<div class="card" tabindex="0" role="button" data-open="${esc(t.id)}"><button class="star ${fav().includes(t.id)?'on':''}" data-fav="${esc(t.id)}" aria-label="Favorite ${esc(t.n)}">★</button><div class="ico">${I(t.ic)}</div><b>${esc(t.n)}</b><br><small>${esc(t.d)}</small><br><span class="tag">${IMPL[t.id]?'Ready':'Planned'}</span></div>`;
const byId=id=>TOOLS.find(t=>t.id===id);

/* ===== 6. VIEWS ===== */
const V=$('#view');
function anim(){if(RM()||!window.gsap)return;gsap.from('#view .card,#view .ws',{y:18,opacity:0,duration:.4,stagger:.025,ease:'power2.out',clearProps:'all'})}
function dashboard(){cleanup();const n=new Date(),h=n.getHours();const rc=rec().map(byId).filter(Boolean),fv=fav().map(byId).filter(Boolean);
V.innerHTML=`<div class="card" style="display:flex;gap:16px;align-items:center;margin-bottom:18px" data-open="About Soumadip" tabindex="0" role="button"><div class="avatar">SB</div><div><b style="font-size:18px">Soumadip Biswas</b><br><small>Young Developer | Web Creator | Future Tech Innovator</small><br><small>Creator of SOUL — Soumadip Orbit Universal Labs</small></div></div><h1>${h<12?'Good morning':h<18?'Good afternoon':'Good evening'}, Soumadip</h1><p class="mu" id="hd"></p>
<h2>Quick access</h2><div class="grid">${['Live Digital Clock','Scientific Calculator','To-do List','Snake Game','Password Generator','Notes'].map(i=>cardHTML(byId(i))).join('')}</div>
<h2>Departments</h2><div class="grid">${DEPTS.map(d=>`<div class="card" tabindex="0" role="button" data-dept="${esc(d[0])}"><div class="ico">${I(d[1])}</div><b>${d[0]}</b><br><small>${d[2].length} tools</small></div>`).join('')}</div>
<h2>Recently used</h2>${rc.length?`<div class="grid">${rc.map(cardHTML).join('')}</div>`:'<p class="mu">Open a tool and it will appear here.</p>'}
<h2>Favorites</h2>${fv.length?`<div class="grid">${fv.map(cardHTML).join('')}</div>`:'<p class="mu">Tap ★ on any tool to pin it.</p>'}
<h2>Daily info</h2><div class="card" style="cursor:default"><b>${n.toLocaleDateString([], {dateStyle:'full'})}</b><br><small>Day ${Math.ceil((n-new Date(n.getFullYear(),0,0))/864e5)} of the year · Week ${Math.ceil(((n-new Date(n.getFullYear(),0,1))/864e5+new Date(n.getFullYear(),0,1).getDay()+1)/7)}</small></div>`;
const t=()=>$('#hd').textContent=fmtTime(new Date())+' · '+new Date().toLocaleDateString([], {dateStyle:'medium'});t();timers.push(setInterval(t,1000));anim()}
function dept(name){cleanup();const d=DEPTS.find(x=>x[0]===name);V.innerHTML=`<h1 style="display:flex;align-items:center;gap:10px"><span class="ico sm">${I(d[1])}</span>${esc(d[0])}</h1><div class="grid" style="margin-top:16px">${d[2].map(n=>cardHTML(byId(n))).join('')}</div>`;anim()}
function openTool(id){cleanup();const t=byId(id);if(!t)return dashboard();store.set('rec',[id,...rec().filter(x=>x!==id)].slice(0,8));
V.innerHTML=`<button class="btn" data-back="1">← Back</button><h1 style="margin-top:14px;display:flex;align-items:center;gap:10px"><span class="ico sm">${I(t.ic)}</span>${esc(t.n)}</h1><p class="mu">${esc(t.d)}</p><div class="ws" id="ws"></div>`;const w=$('#ws');
if(IMPL[id])IMPL[id](w);else w.innerHTML=`<h3>Not built yet</h3><p>This tool is registered in SOULVERSE but its interface is still in a later phase.</p>${NEEDS[id]?`<p class="tag">Will require: ${NEEDS[id]}</p>`:'<p class="tag">Planned as an offline / browser-only tool</p>'}`;anim()}
function settings(){cleanup();V.innerHTML=`<h1>Settings</h1><div class="ws"><div class="row"><b>Theme</b><button class="btn" data-th="dark">Dark</button><button class="btn" data-th="light">Light</button></div><div class="row"><b>Accent</b>${[['#2563eb','Blue'],['#0f766e','Teal'],['#334155','Slate'],['#4f46e5','Indigo']].map(c=>`<button class="btn" data-ac="${c[0]}" style="border-color:${c[0]}">${c[1]}</button>`).join('')}</div><div class="row"><label><input type="checkbox" id="rm" style="width:auto" ${store.get('rm',false)?'checked':''}> Reduce motion</label><label><input type="checkbox" id="h12" style="width:auto" ${store.get('h12',false)?'checked':''}> 12-hour clock</label></div><div class="row"><button class="btn" id="cl">Clear saved data</button><button class="btn" id="rst">Reset settings</button></div></div>`;
$('#rm').onchange=e=>{store.set('rm',e.target.checked);applyPrefs()};$('#h12').onchange=e=>store.set('h12',e.target.checked);
$('#cl').onclick=()=>{if(confirm('Delete all SOULVERSE saved data on this device?')){store.clear();applyPrefs();toast('Data cleared');settings()}};$('#rst').onclick=()=>{['theme','ac','rm','h12'].forEach(k=>localStorage.removeItem('sv_'+k));applyPrefs();toast('Settings reset');settings()};anim()}
function about(){cleanup();V.innerHTML=`<h1>About SOUL</h1><div class="ws"><p><b>SOULVERSE</b> — One Universe. 100 Possibilities. Unlimited Exploration.</p><p>Created by <b>Soumadip Biswas</b> — Young Developer | Web Creator | Future Tech Innovator.</p><p class="mu">SOUL = Soumadip Orbit Universal Labs. Personal-space details are intentionally left for you to fill in; nothing is invented.</p></div>`;anim()}
function favs(){cleanup();const f=fav().map(byId).filter(Boolean);V.innerHTML=`<h1>Favorites</h1>${f.length?`<div class="grid">${f.map(cardHTML).join('')}</div>`:'<p class="mu">No favorites yet.</p>'}`;anim()}

/* ===== 7. ROUTER, NAV, SEARCH, PREFS ===== */
let cur=['home'];
function route(){const[a,b]=cur;V.classList.remove('pt');void V.offsetWidth;V.classList.add('pt');({home:dashboard,dept:()=>dept(b),tool:()=>openTool(b),settings,about,favs}[a]||dashboard)()}
const go=(...c)=>{cur=c;route();$('#side').classList.remove('open');scrollTo(0,0)};
$('#nav').innerHTML=`<button data-go="home">${I('🏠')} Dashboard</button><button data-go="favs">${I('★')} Favorites</button>`+DEPTS.map(d=>`<button data-dept="${esc(d[0])}">${I(d[1])} ${d[0]}</button>`).join('')+`<button data-go="settings">${I('⚙')} Settings</button><button data-go="about">${I('ℹ')} About SOUL</button>`;
document.addEventListener('click',e=>{const t=e.target;const f=t.closest('[data-fav]');if(f){e.stopPropagation();return toggleFav(f.dataset.fav)}const o=t.closest('[data-open]');if(o)return go('tool',o.dataset.open);const d=t.closest('[data-dept]');if(d)return go('dept',d.dataset.dept);const g=t.closest('[data-go]');if(g)return go(g.dataset.go);if(t.closest('[data-back]'))return history.length&&go('home');const th=t.closest('[data-th]');if(th){store.set('theme',th.dataset.th);applyPrefs()}const ac=t.closest('[data-ac]');if(ac){store.set('ac',ac.dataset.ac);applyPrefs()}if(!t.closest('.search'))$('#res').style.display='none'});
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();$('#q').focus()}if(e.key==='Enter'&&e.target.classList?.contains('card'))e.target.click();if(e.key==='Escape')$('#res').style.display='none'});
$('#menu').onclick=()=>$('#side').classList.toggle('open');
$('#themeBtn').onclick=()=>{store.set('theme',store.get('theme','light')==='light'?'dark':'light');applyPrefs()};
const q=$('#q'),res=$('#res');
function showRes(){const v=q.value.trim().toLowerCase();let L=v?TOOLS.filter(t=>(t.n+' '+t.d).toLowerCase().includes(v)):arr('rec').map(byId).filter(Boolean);res.innerHTML=L.length?(v?'':'<div class="mu">Recent</div>')+L.slice(0,10).map(t=>`<div role="option" data-open="${esc(t.id)}"><span class="ico xs">${I(t.ic)}</span>${esc(t.n)} <small>· ${esc(t.d)}</small></div>`).join(''):'<div class="mu">No tools match. Try a category such as “Gaming”.</div>';res.style.display='block'}
q.oninput=showRes;q.onfocus=showRes;res.onclick=()=>{res.style.display='none';q.value=''};
function applyPrefs(){const r=document.documentElement;r.dataset.theme=store.get('theme','light')==='dark'?'dark':'light';const ac=store.get('ac','#2563eb');r.style.setProperty('--ac',/^#[0-9a-f]{6}$/i.test(ac)?ac:'#2563eb');document.body.classList.toggle('rm',!!store.get('rm',false))}
applyPrefs();route();
if(!RM()&&window.gsap)gsap.from('aside',{x:-40,opacity:0,duration:.6,ease:'power3.out'});
