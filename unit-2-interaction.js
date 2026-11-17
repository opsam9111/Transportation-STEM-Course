/* Continuous, pointer-friendly Unit 2 energy-demand controls. */
(() => {
  "use strict";
  function init() {
    const names = ["mass", "terrain", "speed"];
    const controls = names.map(name => document.getElementById(name + "-slider"));
    if (controls.some(control => !control)) return;
    const descriptors = {
      mass: ["light", "medium", "heavy"],
      terrain: ["mostly level", "mixed", "steep or demanding"],
      speed: ["steady", "frequent changes", "rapid or stop-and-go"]
    };
    const update = () => {
      // Map continuous 0..100 travel onto the original 1..3 model scale.
      const [m,t,s] = controls.map(control => 1 + Number(control.value) / 50);
      const raw = 18 + m * 12 + t * 15 + s * 11;
      const score = Math.max(0, Math.min(100, Math.round(30 + (raw - 56) * 70 / 76)));
      controls.forEach((control, i) => {
        const name = names[i];
        const position = Number(control.value);
        const descriptor = descriptors[name][position < 34 ? 0 : position < 67 ? 1 : 2];
        document.getElementById(name + "-label").textContent = descriptor;
        control.setAttribute("aria-valuetext", descriptor + ", " + position + " percent of the adjustment range");
        control.style.setProperty("--slider-progress", position + "%");
      });
      const meter = document.getElementById("energy-meter");
      if (meter) meter.style.width = score + "%";
      const output = document.getElementById("energy-output");
      if (output) output.textContent = "Relative energy-demand index: " + score + " out of 100";
      const note = document.getElementById("energy-note");
      if (note) note.textContent = score < 65
        ? "This combination represents lower relative demand within this simplified comparison."
        : "This combination represents higher relative demand. Which condition can change without ignoring the journey's purpose or users?";
    };
    controls.forEach(control => {
      control.addEventListener("input", update);
      control.addEventListener("change", update);
    });
    document.querySelectorAll(".energy-lab .slider-step").forEach(button => {
      button.addEventListener("click", () => {
        const control = document.getElementById(button.dataset.slider + "-slider");
        if (!control) return;
        control.value = Math.max(0, Math.min(100, Number(control.value) + Number(button.dataset.direction) * 10));
        control.dispatchEvent(new Event("input", { bubbles: true }));
        control.focus();
      });
    });
    update();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, {once: true});
  } else init();
})();
