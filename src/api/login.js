import {post} from '@/request/http.js'

//登录接口
export const login = p => post('/contract/login/userLogin',p)