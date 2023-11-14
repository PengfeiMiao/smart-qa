import Cookies from 'js-cookie';
import moment from "moment";

export const getHash = (key, field) => {
  return Cookies.get(`${key}_${field}`);
};

export const setHash = (key, field, value, expired=0) => {
  if(!expired) {
    expired = moment().add(1, 'hours').toDate()
  }
  Cookies.set(`${key}_${field}`, value, { expires: expired });
};
