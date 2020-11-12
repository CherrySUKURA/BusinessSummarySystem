import {get,post,Delete} from '@/request/http.js'

export const queryAllReturnMoney = p => get('/contract/api/queryAllReturnMoney',p)
export const updateReturnMoney = p => post('/contract/api/updateReturnMoney',p)
export const deleteReturnMoneyById = p => Delete('/contract/api/deleteReturnMoneyById',p)