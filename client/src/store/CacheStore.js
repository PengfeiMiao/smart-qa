import moment from "moment";

const getJson = (key) => {
  return JSON.parse(localStorage.getItem(key) ?? "{}");
};

export const getHash = (key, field) => {
  let json = getJson(key);
  let expiresAt = json[field]?.expiresAt;
  if (!expiresAt || expiresAt < moment().valueOf()) {
    removeHash(key, field);
    return null;
  }
  return json[field]?.value;
};

export const setHash = (key, field, value, expires=1) => {
  let json = getJson(key);
  json[field] = {value, expiresAt: moment().add(expires, 'hours').valueOf()};
  localStorage.setItem(key, JSON.stringify(json));
};

export const removeHash = (key, field) => {
  let json = getJson(key);
  delete json[field];
  localStorage.setItem(key, JSON.stringify(json));
};

export const refreshHash = (key, field) => {
  let json = getJson(key);
  for (let _field in json) {
    let expiresAt = json[_field]?.expiresAt;
    if (_field !== field && (!expiresAt || expiresAt < moment().valueOf())) {
      removeHash(key, _field)
    }
  }
  let value = getHash(key, field);
  if(value) {
    setHash(key, field, value);
  }
};
