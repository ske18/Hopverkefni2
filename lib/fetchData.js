const DATA = "./data.json";

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
 