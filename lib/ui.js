import { el, empty } from "./helpers.js";
import { fetchData, getData } from "./fetchData.js";
import { getList } from "./toDoList.js";

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

row4b.addEventListener("click");

row3b.addEventListener("click");

export function fetchAndRender(type, id, parent) {
  const list = getData(type, id);
  clear(parent);
  for (const item in data) {
    el("p", item.title);
  }
  if (type) {
    list.appendChild(type);
  }
}

export function create(parent) {
  function category(e) {
    fetchAndRender(e.dataset.type, e.dataset.id, parent);
  }
  const unCompleted = document.querySelector(".verkefni");
  unCompleted.addEventListener("click", category);
  unCompleted.dataset.type = "all";
  const completed = document.querySelector(".klarad-verkefni");
  completed.addEventListener("click", async () =>
    console.log(await getList("finished"), completed)
  );
  empty(parent);
  const item = el("div");
  item.classList.add("catItem");
  parent.appendChild(item);
  for (let i = 0; i < item.length; i += 1) {
    const head = el("h2");
    head.classList.add("catItem__head");
    item.appendChild(head);
    const section = el("section");
    section.classList.add("catItem__section");
    item.appendChild(section);
    const hhh = el("h3");
    hhh.classList.add("catItem__h3");
    section.appendChild(hhh);
    const par = el("p");
    par.classList.add("catItem__par");
    section.appendChild(par);
  }
  console.log("catItem");
}
