import { URL_POLL, URL_LOGOUT } from "../constants/apiHosts";
import baseService from "./BaseService";

function getDataService(offset) {
  return baseService.get(
    `${URL_POLL}?offset=${offset}&limit=10&direction=desc&search=`
  );
}

function deletePollService(id) {
  return baseService.delete(`${URL_POLL}/${id}`);
}

function logoutService() {
  return baseService.post(URL_LOGOUT);
}

export {
  getDataService,
  logoutService,
  deletePollService
};
