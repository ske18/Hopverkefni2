const DATA = "./data.json";
const saveInterval = 500;

class Cache {
	#todos = [];
	#modified = false;

	markAsModified() {
		this.#modified = true;
	}
 
newItem(item) {
  if (item === null) {
    item = {
      "id": (Number.parseInt(this.todos[this.todos.length - 1].id, 10) + 1).toString(),
      "title": "",
      "description": "",
      "category": "",
      "tags": [],
      "priority": false,
      "modified": Date.now(),
      "due": null,
      "deleted": false,
      "completed": false
    };
  }
  const todo = new TodoItem(item);
  this.#todos.push(todo);

  return todo;
}
export async function fetchData() {
  let json;
  try {
    const result = await fetch(DATA);
    if (!result.ok) {
      throw new Error("result not ok");
    }
    json = await result.json();
  } catch (e) {
    console.warn("unable to fetch data", e);
    return null;
  }
  return json;
}

function saveData(data) {
  window.localStorage.setItem("ToDoList", JSON.stringify(data));
}

export async function getData(type, id) {
  if (window.localStorage.length === 0) {
    const data = await fetchData();
    saveData(data);
  }
  const list = JSON.parse(window.localStorage.getItem("ToDoList"));
  switch (type) {
    case "all":
      return list.items;
      break;
    case "category":
      return list.filter((item) => item.category === id);
      break;
    case "tags":
      return list.filter((item) => item.tags === id);
      break;
    case "unfinished":
      return list.filter((item) => !item.completed === id);
      break;
    case "finished":
      return list.filter((item) => item.finished === id);
      break;
    default:
      return list;
  }
}
save() {
  localStorage.setItem("todos",JSON.stringify(this.todos.map(t => t.data)));
  this.#modified = false;
}
get modified() {
  return this.#modified;
}

get todos() {
  return this.#todos;
}
}

export const cache = new Cache();

setInterval(() => {
if (cache.modified) {
  cache.save();
}
}, saveInterval);
// const myStorage = window.localStorage;
// const jsonData = [];
// let categories = [];
// let items = [];

/* export async function insertToLocalStorage() {
  const data = await fetchData(myStorage);
  categories = data.categories;
  items = data.items;
  myStorage.setItem("categories", JSON.stringify(categories));
  myStorage.setItem("items", JSON.stringify(items));
}

export async function newFunction() {
  const itemData = await JSON.parse(myStorage.getItem("items"));
  const test = [];
  itemData.map((json) => {
    if (json.isCompleted)
      test.push({
        tags: json.tags,
        // descript: json.description,
      });
  });

  console.log(test);
}

insertToLocalStorage();
newFunction(); */
 