import {get,post} from '@/request/http.js'

export const getContractNo = p => get('/contract/api/getContractNo',p)
export const getCompany = p => get('/contract/api/getCompany',p)
export const teamInfo = p => get('/contract/api/teamInfo',p)
export const projectTeam = p => get('/contract/api/projectTeam',p)
export const getAllBusinessType = p => get('/contract/api/getAllBusinessType',p)
export const moneyProportion = p => post('/contract/api/moneyProportion',p)
export const selfMoney = p => post('/contract/api/selfMoney',p)
export const income_source = p => get('/contract/api/income_source',p)
export const addContract = p => post('/contract/api/addContract',p)
export const queryContract = p => get('/contract/api/queryContract',p)
export const queryChildContract = p => get('/contract/api/queryChildContract',p)