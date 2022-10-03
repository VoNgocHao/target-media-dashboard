import { postUrlParam, getUrl } from "./helper";
const API = {
  createOrUpdateUser: (url, param) => {
    return postUrlParam(url, param);
  },
  getUserDetail: (url) => {
    return getUrl(url);
  },
  resetPassword: (url, param) => {
    return postUrlParam(url, param);
  },
  //
  getAPIData: (url) => {
    return getUrl(url);
  },
  postParam: (url, param) => {
    return postUrlParam(url, param);
  },
  postParamArray: (url, param) => {
    const data = JSON.stringify(param);
    return postUrlParam(url, { data: data.toString() });
  },
};

export default API;
