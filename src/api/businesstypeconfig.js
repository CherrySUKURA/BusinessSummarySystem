import { Delete,put } from '@/request/http.js'

export const deleteIncomeById = p => Delete('/contract/api/deleteIncomeById',p)
export const updateBusinessById = p => put('/contract/api/updateBusinessById',p)