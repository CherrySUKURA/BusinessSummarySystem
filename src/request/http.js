import vue from '../main'
let axios = vue.$axios
let Message = vue.$message
let store = vue.$store

// 环境的切换
if (process.env.NODE_ENV == 'development') { 
    axios.defaults.baseURL = 'http://192.168.1.169:7879/';}
else if (process.env.NODE_ENV == 'debug') { 
    axios.defaults.baseURL = 'https://www.hotmine.cn/sys/';
} 
else if (process.env.NODE_ENV == 'production') { 
    axios.defaults.baseURL = 'https://www.hotmine.cn/sys/';
}
//请求时效
axios.defaults.timeout = 10000;
//公共请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
//请求前拦截器
axios.interceptors.request.use(
    config => {
        //判断是否是登录接口
        if(config.url.split('/').pop() === 'userLogin'){
            return config
        }else{
            //如果不是登录接口，判断是否有token如果有就在请求头中加入token，如果没有就跳转到登录页面重新请求
            if(sessionStorage.getItem('userToken')){
                config.headers.Authorization = sessionStorage.getItem('userToken')
            }else{
                vue.$router.push('/login')
            }
        }
        return config
    },
    error => {
        return Promise.reject(error);
    }
)
//接收头拦截器
axios.interceptors.response.use(
    response => {
        if(response.status === 200){
            //判断如果是登陆就将token存入到缓存中
            if(response.config.url.split('/').pop() === 'userLogin'){
                if(response.headers.authorization){
                    sessionStorage.setItem("userToken",response.headers.authorization)
                }
            }
            return Promise.resolve(response)
        }else {
            Promise.reject(response)
        }
    },
    error => {
        if(error.response.status){
            switch (error.response.status){
                case 401:
                Message.error("登录已失效，请重新登录")
                store.commit('delete_tabs_all')
                store.dispatch('setUser')
                vue.$router.push('/login')
            }
        }
        return Promise.reject(error.response)
    }
)

//封装get请求
export function get(url,param){
    return new Promise( (resolve,reject) => {
        axios.get(url,{
            params: param
        }).then(res => {
            resolve(res.data)
        }).catch( err => {
            reject(err.data)
        })
    })
}
//封装post请求
export function post(url,param){
    return new Promise( (resolve,reject) => {
        axios.post(url,param).then(res => {
            resolve(res.data)
        }).catch( err => {
            reject(err.data)
        })
    })
}