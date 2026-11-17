/* Stage 14 — self-contained Unit 2 energy-demand interaction. */
(()=>{
  "use strict";
  const ready=()=>{
    const names=["mass","terrain","speed"];
    const controls=names.map(n=>document.getElementById(n+"-slider"));
    if(controls.some(el=>!el))return;
    const byId=id=>document.getElementById(id);
    const choices={mass:["","light","medium","heavy"],terrain:["","mostly level","mixed","steep or demanding"],speed:["","steady","frequent changes","rapid or stop-and-go"]};
    const update=()=>{
      const [m,t,s]=controls.map(el=>Number(el.value));
      const raw=18+m*12+t*15+s*11;
      const score=Math.max(0,Math.min(100,Math.round(30+(raw-56)*70/76)));
      names.forEach((name,i)=>{const label=byId(name+"-label");if(label)label.textContent=choices[name][controls[i].value]});
      const meter=byId("energy-meter");if(meter)meter.style.width=score+"%";
      const out=byId("energy-output");if(out)out.textContent=`Relative energy-demand index: ${score} out of 100`;
      const note=byId("energy-note");if(note)note.textContent=score<65?"This combination represents lower relative demand within this simplified comparison.":"This combination represents higher relative demand. Which condition can change without ignoring the journey's purpose or users?";
    };
    controls.forEach(el=>{el.addEventListener("input",update);el.addEventListener("change",update)});
    document.querySelectorAll(".energy-lab .slider-step").forEach(btn=>btn.addEventListener("click",()=>{
      const slider=byId(btn.dataset.slider+"-slider");if(!slider)return;
      const next=Math.max(Number(slider.min),Math.min(Number(slider.max),Number(slider.value)+Number(btn.dataset.direction)));
      slider.value=String(next);slider.dispatchEvent(new Event("input",{bubbles:true}));slider.focus();
    }));
    update();
  };
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",ready,{once:true});else ready();
})();
