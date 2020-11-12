import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter,store)
//静态路由
const routes = [

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  // mode: "history",
  routes
})
//跳转拦截器
router.beforeEach( (to,from,next) => {
    //如果已经登录，已经存入sessionstroage
    if(getToken()){
      //如果跳转的是登录页面就是直接放行
      if(to.path === '/login'){
        next()
      }else{
        //否则如果登录状态为否并且不是跳转到登录页面就将缓存中的登录状态存入vuex并从vuex中将动态路由注入到路由中
        if(store.state.isLogin === false && to.path !== '/login'){
          store.dispatch("setUser",sessionStorage.getItem('userName'))
          store.dispatch('setToken',sessionStorage.getItem('userToken'))
          store.dispatch('setUuid',sessionStorage.getItem('userUid'))
          //需同步执行，如果是异步执行的就会发生没有存储完毕就从vuex中拿数据的情况，这样虽然在存储完毕的时候仍然可以拿到数据，但是第一次跳转不会显示页面
          //因为第一次没有注入路由
          store.dispatch('setRouter',JSON.parse(sessionStorage.getItem('userRouter'))).then( () => {
            addrouter(filtration(store.state.dynamicRouter))
          })
        }
        next()
      }

    }else{
      //机制问题：如果想要跳转到login页面必须这样写，否则到login页面还会进入拦截器再次执行，就会变成死循环
      if(to.path === '/login'){
        next()
      }else{
        next('/login')
      }
    }
})

export default router


//路由过滤方法
function filtration (dynamicRouter) {
  let addroute = []
  for( let item of dynamicRouter){
    if(item.children != 'false'){
      for( let itemchild of item.children){
        if( itemchild.children != 'false'){
            // let a = []
            for( let itemson of itemchild.children){
              addroute.push(
                {
                  name: itemson.name,
                  path: itemson.path,
                  component: () => import(`@/${itemson.component}`)
                }
              )
            }
        }else{
          addroute.push(
            {
              name: itemchild.name,
              path: itemchild.path,
              component: () => import(`@/${itemchild.component}`)
            }
          )
        }
      }
    }else{
      addroute.push(
        {
          name: item.name,
          path: item.path,
          component: () => import(`@/${item.component}`)
        }
      )
    }
  }
  return addroute
}
//动态增加路由方法
function addrouter(addroute){
  router.addRoutes([
    {
      path: '/',
      name: 'Index',
      component: () => import('@/views/index'),
      redirect: '/contractmanagement',
      children: addroute
    }
  ])
}
//返回登录态方法
function getToken(){
  return sessionStorage.getItem('userToken')
}