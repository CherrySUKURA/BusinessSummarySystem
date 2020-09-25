import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter,store)

const routes = [

  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login')
  }
]

const router = new VueRouter({
  mode: "history",
  routes
})

router.beforeEach( (to,from,next) => {
  // let addroute = []
  if(userInfo()){
    if( to.path !== '/login'){
      // filtration(addroute,JSON.parse(sessionStorage.getItem('userRouter')))
      // addrouter(addroute)
      next()
    }else{
      next()
    }
  }else{
    if(to.path === '/login'){
      next()
    }else{
      next('/login')
    }
  }
})

export default router



// function filtration (addroute,dynamicRouter) {
//   console.log(1)
//   for( let item of dynamicRouter){
//     addroute.push(
//       {
//         name: item.name,
//         path: item.path,
//         component: () => import(`@/${item.component}`)
//       }
//     )
//   }
// }
// function addrouter(addroute){
//   console.log(2)
//   router.addRoutes([
//     {
//       path: '/',
//       name: 'Index',
//       component: () => import('@/views/index'),
//       redirect:'/contractmanagement', 
//       children: addroute
//     }
//   ])
// }

function userInfo(){
  let userName = sessionStorage.getItem("userName")
  let userToken = sessionStorage.getItem("userToken")
  let userRouter = JSON.parse(sessionStorage.getItem("userRouter"))
  if(userName != null && userToken != "" && userRouter.length != 0){
    store.dispatch("setUser",userName)
    store.dispatch('setToken',userToken)
    store.dispatch('setRouter',userRouter)
  }else{
    store.dispatch("setUser",null)
  }
  return store.state.isLogin
}
