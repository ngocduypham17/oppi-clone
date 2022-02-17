import { URL_SIGNIN } from "../constants/apiHosts";
import baseService from "./BaseService";

function login(data) {
  return baseService.post(URL_SIGNIN, data);
}

export default {
  login,
};
