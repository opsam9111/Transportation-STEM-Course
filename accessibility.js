(() => {
"use strict";
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const key="tstem-accessibility-v2";
let prefs={language:"en",contrast:"normal",large:false};
try {prefs={...prefs,...JSON.parse(localStorage.getItem(key)||"{}")};}catch{}
const labels={
en:{accessibility:"Accessibility",language:"Interface language",contrast:"Contrast",large:"Larger text",small:"Standard text",read:"Read aloud",pause:"Pause",resume:"Resume",stop:"Stop",home:"Home",start:"Start Here",modules:"Course Modules",resources:"Resources",tools:"Course Tools",discussion:"Discussion",note:"Interface language only; course lessons remain in English."},
es:{accessibility:"Accesibilidad",language:"Idioma de la interfaz",contrast:"Contraste",large:"Texto más grande",small:"Texto normal",read:"Leer en voz alta",pause:"Pausar",resume:"Reanudar",stop:"Detener",home:"Inicio",start:"Comenzar",modules:"Módulos del curso",resources:"Recursos",tools:"Herramientas del curso",discussion:"Debate",note:"Solo cambia la interfaz; las lecciones siguen en inglés."},
fr:{accessibility:"Accessibilité",language:"Langue de l’interface",contrast:"Contraste",large:"Agrandir le texte",small:"Texte normal",read:"Lire à voix haute",pause:"Pause",resume:"Reprendre",stop:"Arrêter",home:"Accueil",start:"Commencer",modules:"Modules du cours",resources:"Ressources",tools:"Outils du cours",discussion:"Discussion",note:"Seule l’interface change ; les leçons restent en anglais."}
};
let utterance=null, state="stopped";
function announce(msg){const live=$("#site-live");if(live)live.textContent=msg;}
function save(){try{localStorage.setItem(key,JSON.stringify(prefs));}catch{}}
function apply(){
  document.body.classList.toggle("large-text",prefs.large);
  document.body.classList.toggle("high-contrast",prefs.contrast==="high");
  document.body.classList.toggle("low-contrast",prefs.contrast==="soft");
  const t=labels[prefs.language]||labels.en;
  document.documentElement.lang="en"; // The substantive instructional content is English.
  $("#language-select").value=prefs.language;
  $("#contrast-select").value=prefs.contrast;
  const map={".accessibility-title":t.accessibility,'label[for="language-select"]':t.language,'label[for="contrast-select"]':t.contrast};
  Object.entries(map).forEach(([selector,value])=>{const node=$(selector);if(node)node.textContent=value;});
  const toggle=$("#text-toggle");if(toggle){toggle.textContent=prefs.large?t.small:t.large;toggle.setAttribute("aria-pressed",String(prefs.large));}
  const read=$("#read-toggle");if(read)read.textContent=t.read;
  const pause=$("#pause-read");if(pause)pause.textContent=state==="paused"?t.resume:t.pause;
  const stop=$("#stop-read");if(stop)stop.textContent=t.stop;
  const nav=$(".main-nav");
  if(nav){
    const paths={"index.html":"home","orientation.html":"start","modules.html":"modules","resources.html":"resources","discussion.html":"discussion"};
    $$("a[href]",nav).forEach(a=>{const name=paths[a.getAttribute("href")];if(name)a.textContent=t[name];});
    const summary=$("details.nav-more > summary");if(summary)summary.textContent=t.tools;
  }
  const note=$(".translation-note");if(note)note.textContent=t.note;
}
function stop(){if("speechSynthesis" in window)window.speechSynthesis.cancel();utterance=null;state="stopped";apply();}
$("#language-select")?.addEventListener("change",e=>{prefs.language=e.target.value;save();stop();apply();announce(labels[prefs.language].note);});
$("#contrast-select")?.addEventListener("change",e=>{prefs.contrast=e.target.value;save();apply();announce("Contrast updated");});
$("#text-toggle")?.addEventListener("click",()=>{prefs.large=!prefs.large;save();apply();});
$("#read-toggle")?.addEventListener("click",()=>{
 if(!("speechSynthesis" in window)){announce("Speech synthesis is unavailable in this browser");return;}
 stop();
 const main=$("main");if(!main)return;
 utterance=new SpeechSynthesisUtterance(main.innerText);
 utterance.lang="en-US";utterance.rate=.95;
 utterance.onend=()=>{state="stopped";utterance=null;apply();};
 utterance.onerror=()=>{state="stopped";utterance=null;apply();};
 state="reading";window.speechSynthesis.speak(utterance);apply();
});
$("#pause-read")?.addEventListener("click",()=>{
 if(!("speechSynthesis" in window)||state==="stopped")return;
 if(state==="reading"){window.speechSynthesis.pause();state="paused";}
 else{window.speechSynthesis.resume();state="reading";}
 apply();
});
$("#stop-read")?.addEventListener("click",stop);
window.addEventListener("pagehide",stop);
$("#download-peer-feedback")?.addEventListener("click",()=>{
 const fields=[["Unit or topic","peer-unit"],["One strength","peer-strength"],["One question","peer-question"],["One actionable suggestion","peer-suggestion"],["My next design step","peer-reflection"]];
 const content="Transportation STEM | Peer feedback\n\n"+fields.map(([label,id])=>label+":\n"+($("#"+id)?.value.trim()||"[Not completed]")).join("\n\n")+"\n";
 const blob=new Blob([content],{type:"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");
 a.href=url;a.download="transportation-stem-peer-feedback.txt";a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
 const status=$("#peer-feedback-status");if(status)status.textContent="Feedback downloaded to your device. It has not been sent to the instructor.";
});
apply();
})();
