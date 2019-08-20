const set = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const get = key => {
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key))
    : null;
};

const update = (key, data) => set(key, Object.assign({}, get(key), data));

const remove = key => localStorage.removeItem(key);

const saveToLog = key => {
  const oldLog = get('log') || [];
  set('log', [...oldLog, get(key)]);
};

export default { set, get, update, remove, saveToLog };
