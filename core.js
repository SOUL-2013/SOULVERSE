/* ===== 2. UTILITIES & STORAGE (safe against corrupt data) ===== */
const $=(s,r=document)=>r.querySelector(s);
const store={get(k,d){try{const v=localStorage.getItem('sv_'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('sv_'+k,JSON.stringify(v))}catch(e){}},clear(){try{Object.keys(localStorage).filter(k=>k.startsWith('sv_')).forEach(k=>localStorage.removeItem(k))}catch(e){}}};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const RM=()=>store.get('rm',false)||matchMedia('(prefers-reduced-motion:reduce)').matches;
function toast(m){const d=document.createElement('div');d.textContent=m;$('#toast').append(d);setTimeout(()=>d.remove(),2400)}
let timers=[],kd=null;
function cleanup(){timers.forEach(t=>{clearInterval(t);clearTimeout(t)});timers=[];if(kd){removeEventListener('keydown',kd);kd=null}}
const pad=n=>String(n).padStart(2,'0');
const fmtTime=d=>store.get('h12',false)?d.toLocaleTimeString([], {hour:'numeric',minute:'2-digit',second:'2-digit',hour12:true}):d.toLocaleTimeString([], {hour12:false});

