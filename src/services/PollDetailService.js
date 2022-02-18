import {URL_POLL} from '../constants/apiHosts';
import baseService from './BaseService';

function getDetailService(id){
    return baseService.get(`${URL_POLL}/${id}`)
}

function alterDataService(data){
    return baseService.put(`${URL_POLL}/${id}`,data)
}

export{
    getDetailService,
    alterDataService
}