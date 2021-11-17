/**
 * Slóð
 */
const DATA = './data.json';
/**
 * Hlutur sem heldur utan um in-memory „cache“ af gögnum í minni á client (í vafra).
 * Nýtir það að þegar forrit er keyrt mun `fetchJson` fallið *alltaf* keyra þar sem `cache` er í
 * scope, og það verður alltaf sami hluturinn. Við getum því bætt við niðurstöðum í hlutinn með
 * vel þekktum „lykli“ (cache key), við næstu köll getum við athugað hvort hlutur innihaldi þennan
 * lykil og skilað þá þeirri niðurstöðu í stað þess að gera sama kall aftur.
 */
const cache = {}; // localStorage hér en öðruvísi

/**
 * Sækir gögn frá data.json. Geymir í in-memory cache gögn eftir `id`.
 * @param {string} [id=''] ID á gögn til að sækja, sjálgefið tómi (grunn) flokkurinn
 * @returns {Promise<Array<object> | null>} Promise sem verður uppfyllt með fylki af gögnum.
 *           Skilar `null` ef villa kom upp við að sækja gögn.
 */
export async function fetchData(id = '') {
  const cacheKey = id || 'index';
  if (cacheKey in cache) {
    console.info(`${cacheKey} is in cache`);
    return cache[cacheKey];
  }
  let json;
  try {
    const result = await fetch(DATA);
    if (!result.ok) {
      throw new Error('result not ok');
    }
    json = await result.json();
  } catch (e) {
    console.warn('unable to fetch news', id, e);
    return null;
  }
  cache[cacheKey] = json;
  return json;
}

async function getData() {
  if (window.localStorage.length === 0){
    const data = await fetchData();
    saveData(data);
    return data;
  }
  return JSON.parse(window.localStorage.getItem('ToDoList'));
}

function saveData(data) {
  window.localStorage.setItem('ToDoList', JSON.stringify(data));
}
