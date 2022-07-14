import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"
//使用vuex插件
Vue.use(Vuex)
export default new Vuex.Store({
  //全局状态
  state: {
    //用户身份令牌
    token: '',
    //当前登录用户名
    loginUserName: '',
    //当前登录用户账号
    loginUserId: '',
    //激活的菜单
    menuIndex: '',
    //一级菜单
    breadcrumbTitle: '',
    //二级菜单
    breadcrumbIndex: '',
    //头像地址
    headImgUrl: '',
    //权限列表
    authUrlsList: '',
<<<<<<< HEAD
    
    carNumCountList: [],
    
    simpleOrderList: []
=======
    //Order页面-包含订单列表的对象
    order: {},
    //Order页面-预定车型列表
    carOptions: [],
>>>>>>> 95c8c802e0fe8e59be89a13ccdd48c71b2bc9469
  },
  //同步数据提交
  mutations: {
    token(state, param) {
      state.token = param
    },
    loginUserName(state, param) {
      state.loginUserName = param
    },
    loginUserId(state, param) {
      state.loginUserId = param
    },
    menuIndex(state, param) {
      state.menuIndex = param
    },
    breadcrumbTitle(state, param) {
      state.breadcrumbTitle = param
    },
    breadcrumbIndex(state, param) {
      state.breadcrumbIndex = param
    },
    headImgUrl(state, param) {
      state.headImgUrl = param
    },
    authUrlsList(state, param) {
      state.authUrlsList = param
    },
<<<<<<< HEAD
    carNumCountList(state,param){
      state.carNumCountList = param
    },
    simpleOrderList(state,param){
      state.simpleOrderList = param
=======
    order(state, param) {
      state.order = param
    },
    carOptions(state, param) {
      state.carOptions = param
>>>>>>> 95c8c802e0fe8e59be89a13ccdd48c71b2bc9469
    }
    
  },
  //引入持久化组件
  plugins: [createPersistedState()]
})
