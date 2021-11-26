import { el } from './helpers.js';
import { fetchData } from './fetchData.js';

const myStorage = window.localStorage;
// const jsonData = [];
let categories = [];
let items = [];

async function insertToLocalStorage() {
  const data = await fetchData(myStorage);
  categories = data.categories;
  items = data.items;
  myStorage.setItem('categories', JSON.stringify(categories));
  myStorage.setItem('items', JSON.stringify(items));
}

async function newFunction() {
  const itemData = await JSON.parse(myStorage.getItem('items'));
  const test = [];
  itemData.map((json) => {
    if (json.isCompleted)
      test.push({
        id: json.id,
        descript: json.description,
      });
  });

  console.log(test);
}

insertToLocalStorage();
newFunction();

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
row4b.addEventListener('click')

row3b.addEventListener('click')