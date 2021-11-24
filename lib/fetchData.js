/**
 * Slóð
 */
const DATA = './data.json';

/**
 * Sækir gögn frá data.json. Geymir í in-memory cache gögn eftir `id`.
 * @param {string} [id=''] ID á gögn til að sækja, sjálgefið tómi (grunn) flokkurinn
 * @returns {Promise<Array<object> | null>} Promise sem verður uppfyllt með fylki af gögnum.
 *           Skilar `null` ef villa kom upp við að sækja gögn.
 */
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

function saveData(data) {
  window.localStorage.setItem('ToDoList', JSON.stringify(data));
}

async function getData() {    
  const data = await fetchData();
  if (window.localStorage.length === 0) {
    saveData(data);
    return data;
  }
  for (let i = 0; i < data.items.length; i += 1) {
    if (window.localStorage.getItem(data.items[i]) == null) {
      window.localStorage.setItem(data.items[i]);
    }
  }
  return JSON.parse(window.localStorage.getItem('ToDoList'));
}


