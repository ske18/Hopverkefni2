const DATA = './data.json';

export async function fetchData() {
  let json;
  try {
    const result = await fetch(DATA);
    if (!result.ok) {
      throw new Error('result not ok');
    }
    json = await result.json();
  } catch (e) {
    console.warn('unable to fetch data', e);
    return null;
  }
  return json;
}

function saveData(myStorage, data) {
  myStorage.setItem('ToDoList', JSON.stringify(data));
}

export async function getData(myStorage) {
  const data = await fetchData();
  if (window.localStorage.length === 0) {
    saveData(myStorage, data);
    return data;
  }
  for (let i = 0; i < data.items.length; i += 1) {
    if (window.localStorage.getItem(data.items[i]) == null) {
      window.localStorage.setItem(data.items[i]);
    }
  }
  return JSON.parse(window.localStorage.getItem('ToDoList'));
}

const myStorage = window.localStorage;
// const jsonData = [];
let categories = [];
let items = [];

export async function insertToLocalStorage() {
  const data = await fetchData(myStorage);
  categories = data.categories;
  items = data.items;
  myStorage.setItem('categories', JSON.stringify(categories));
  myStorage.setItem('items', JSON.stringify(items));
}

export async function newFunction() {
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
