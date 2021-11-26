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
    case "category":
      return list.filter((item) => item.category === id);
    case "tags":
      return list.filter((item) => item.tags === id);
    case "unfinished":
      return list.filter((item) => !item.completed === id);
    case "finished":
      return list.filter((item) => item.finished === id);
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

export const cache = new Cache();

setInterval(() => {
if (cache.modified) {
  cache.save();
}
}, saveInterval);

export async function getAllCategories(){
  const catData = await fetchData();
  const cat = new Set()
  for(let i=0; i<catData.items.length; i += 1){
      if(catData.items[i].category==="string") {
      cat.add(catData.items[i].category)
      console.log("haltuáketti")
  }
}
  return Array.from (cat);
  
}
export async function getAllTags(){
  const tagData = await fetchData();
  const tag = new Set()
  for(let i=0; i<tagData.items.length; i += 1){
      for(let j=0; j<tagData.items[i].tags.length; j += 1){
          if(tagData.items[i].tags[j]==="") {
          tag.add(tagData.items[i].tags[j]);
      }
    }
  }
  return Array.from (tag);
}
 