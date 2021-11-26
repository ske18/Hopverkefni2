import { fetchData, getData } from "./fetchData.js";

// vantar function til að filtera lista
// vantar function til þess að fá takkana til að virka
// kannski setja það í annað skjal

let myStorage = window.localStorage;
let jsonData = [];
let categories = [];
let items = [];

async function insertToLocalStorage() {
  let data = await fetchData(myStorage);
  categories = data.categories;
  items = data.items;
  myStorage.setItem("categories", JSON.stringify(categories));
  myStorage.setItem("items", JSON.stringify(items));
}

async function newFunction() {
  const itemData = await JSON.parse(myStorage.getItem("items"));
  let test = [];
  itemData.map((json) => {
    if (json.isCompleted)
      test.push({
        id: json["id"],
        descript: json["description"],
      });
  });

  console.log(test);
}

insertToLocalStorage();
newFunction();
