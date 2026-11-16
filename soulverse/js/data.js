/* ===== 3. TOOL REGISTRY (all 59 named tools; status shown honestly) ===== */
const DEPTS=[
['Gaming Zone','🎮',['Snake Game','Tic-Tac-Toe','Chess','Memory Match','Sudoku','2048','Minesweeper','Rock Paper Scissors','Reaction Speed Test','Number Guessing Game']],
['Time Center','⏱',['Live Digital Clock','World Clock','Stopwatch','Countdown Timer','Alarm Clock','Calendar']],
['Calculator Lab','🧮',['Scientific Calculator','Age Calculator','Percentage Calculator','Unit Converter','Currency Converter','BMI Calculator']],
['Productivity Hub','✅',['To-do List','Notes','Daily Planner','Pomodoro Timer','Habit Tracker','Goal Tracker']],
['Developer Zone','💻',['HTML Playground','CSS Playground','JavaScript Playground','JSON Formatter','Code Snippet Manager','Color Palette Generator']],
['AI & Smart Tools','✨',['AI Assistant','Text Summarizer','Grammar Helper','Idea Generator','AI Prompt Library']],
['Knowledge Universe','🔭',['Science Explorer','Space Explorer','Programming Learning','Technology News','Random Knowledge']],
['Entertainment Zone','🎧',['Music Visualizer','Random Quote','Joke Generator','Virtual Dice','Random Decision Maker']],
['Daily Life Tools','🌤',['Weather Dashboard','QR Code Generator','Password Generator','Text Counter','World Map Explorer']],
['Personal Space','🪐',['About Soumadip','SOUL Projects','My Skills','Achievements','Contact & Social Links']]
];
const TOOLS=[];DEPTS.forEach(([d,ic,list])=>list.forEach(n=>TOOLS.push({n,d,ic,id:n})));
/* ===== ICON SET (inline SVG logos, keyed by department/nav) ===== */
const IC={'🎮':'<rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 10v5M4.5 12.5h5"/><circle cx="15.5" cy="11.5" r=".8"/><circle cx="18" cy="14" r=".8"/>','⏱':'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/>','🧮':'<rect x="5" y="2" width="14" height="20" rx="3"/><path d="M8 6h8M8 11h2M14 11h2M8 15h2M14 15h2M8 19h2M14 19h2"/>','✅':'<rect x="3" y="3" width="18" height="18" rx="4"/><path d="m8 12 3 3 5-6"/>','💻':'<path d="m8 8-5 4 5 4M16 8l5 4-5 4M14 5l-4 14"/>','✨':'<path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>','🔭':'<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>','🎧':'<path d="M4 15v-3a8 8 0 0 1 16 0v3"/><rect x="3" y="14" width="4" height="7" rx="2"/><rect x="17" y="14" width="4" height="7" rx="2"/>','🌤':'<circle cx="9" cy="8" r="3.2"/><path d="M9 2v1.4M2.5 8h1.4M4.4 3.4l1 1M13.6 3.4l-1 1"/><path d="M8 20h9a4 4 0 0 0 .6-7.9A5.5 5.5 0 0 0 7.2 13 3.5 3.5 0 0 0 8 20z"/>','🪐':'<circle cx="12" cy="12" r="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-25 12 12)"/>','🏠':'<path d="M3 11l9-8 9 8M5 10v10h14V10"/>','★':'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>','⚙':'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/>','ℹ':'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>'};
const I=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[k]||'<circle cx="12" cy="12" r="3"/>'}</svg>`;
const NEEDS={'Currency Converter':'external exchange-rate API','Weather Dashboard':'external weather API','AI Assistant':'secure backend (Gemini key must stay server-side)','Text Summarizer':'secure backend','Grammar Helper':'secure backend','Idea Generator':'secure backend','Technology News':'external news API','QR Code Generator':'a QR library (CDN)','Chess':'a chess library (CDN)','World Map Explorer':'a map library (CDN)'};

