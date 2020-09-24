import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter,store)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/index'),
    redirect:'/contractmanagement', 
    children: [
      {
        name: "合同管理",
        path: "/contractmanagement",
        component: () => import('@/pages/contractmanagement'),
        children: false
      },
      {
        name: "数据展示",
        path: "/datapresentation",
        component: () => import('@/pages/datapresentation'),
        children: false
      },
    ]
  },
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


// router.beforeEach( (to,from,next) => {
//   console.log(to,from)
//   next()
// })

export default router
