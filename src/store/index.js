import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openTab:[],//所有打开的路由
    activeIndex:'/contractmanagement',//当前所显示的tab索引
    dynamicRouter: null,//路由列表
    currentUser:null,//用户名
    isLogin:false,//是否为登录状态
    token: null,//token
    uuid: null,//用户唯一标识
    checkButton: null//是否是管理员
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
    userStatus (state,user = null){
      if(user){
        state.currentUser = user
        state.isLogin = true
      }else if( user == null){
        //登出的时候清空sessionStorage里的状态
        sessionStorage.removeItem("userName");
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("userRouter");
        state.curentUser = null;
        state.token = null;
        state.dynamicRouter = null;
        state.isLogin = false;
        state.checkButton = null
      }
    },
    //token
    tokenStatus (state,token){
      state.token = token
    },
    //路由列表
    routerList (state,list){
      state.dynamicRouter = list
    },
    //用户唯一标识
    uuidStatus (state,uuid){
      state.uuid = uuid
    },
    //管理员标识
    userCheckButton (state,button){
      state.checkButton = button
    }
  },
  actions: {
    //设置用户
    setUser( {commit},user){
      commit("userStatus",user)
    },
    //设置token
    setToken( {commit},token){
      commit('tokenStatus',token)
    },
    //设置路由
    setRouter( {commit},list){
      commit('routerList',list)
    },
    //设置用户唯一标识
    setUuid( {commit},uuid){
      commit('uuidStatus',uuid)
    },
    //设置是否为管理员
    setCheckButton( {commit},button){
      commit('userCheckButton',button)
    }
  },
  modules: {
  }
})
