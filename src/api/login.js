import {get,post} from '@/request/http.js'

export const aiAddress = p => get('/questionnaire/getTitleInfo',p)
export const login = p => post('/contract/login/userLogin',p)