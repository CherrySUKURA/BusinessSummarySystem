import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openTab:[],//所有打开的路由
    activeIndex:'/contractmanagement',
    dynamicRouter: null,
    currentUser:null,
    isLogin:false,
    token: null
  },
  mutations: {
    //添加tabs
    add_tabs (state,data){
      this.state.openTab.push(data)
    },
    //删除tabs
    delete_tabs (state,route){
      let index = 0;
      for(let option of state.openTab){
        if(option.path === route){
          break
        }
        index++;
      }
      this.state.openTab.splice(index,1)
    },
    //删除全部tabs
    delete_tabs_all (state){
      state.openTab = []
    },
    //设置当前激活的tab
    set_active_index (state,index) {
      this.state.activeIndex = index;
    },
    //用户信息：登录状态和用户名
    userStatus (state,user){
      if(user){
        state.currentUser = user
        state.isLogin = true
      }else if( user == null){
        //登出的时候清空sessionStorage里的状态
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("userRouter")
        state.curentUser = null;
        state.token = null;
        state.dynamicRouter = null;
        state.isLogin = false;
      }
    },
    //token
    tokenStatus (state,token){
      state.token = token
    },
    //路由列表
    routerList (state,list){
      state.dynamicRouter = list
    }
  },
  actions: {
    setUser( {commit},user){
      commit("userStatus",user)
    },
    setToken( {commit},token){
      commit('tokenStatus',token)
    },
    setRouter( {commit},list){
      commit('routerList',list)
    },

  },
  modules: {
  }
})
