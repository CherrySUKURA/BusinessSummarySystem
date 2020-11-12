import {post,Delete} from '@/request/http.js'

export const updateIncomeSource = p => post('/contract/api/updateIncomeSource',p)
export const deleteIncomeById = p => Delete('/contract/api/deleteIncomeById',p)