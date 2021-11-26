import { el } from "./helpers.js";

// þarf að búa til takka sem leyfir að edita tasks
// einnig hvernig við viljum búa til ný tasks
// takki tekinn úr verkefni 8, þarf að laga
export function createButtons(max, onClick) {
  const a = document.querySelector(".button");
  for (let i = 0; i < max; i += 2) {
    const b = el("button", `${i + 1}`);
    a.appendChild(b);
    b.addEventListener("click", onClick);
  }
}
