import Vue from "vue";
import Vuex from "vuex"
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
//这里要加上getters，不然找不到

Vue.use(Vuex)

const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store

//这里和router导出一样都要去main.js里面去导入再挂载