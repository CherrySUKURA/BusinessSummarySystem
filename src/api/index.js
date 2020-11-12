import {get} from '@/request/http.js'

//获取是否为管理员
export const getCheckButton = p => get('/contract/api/getCheckButton',p)
