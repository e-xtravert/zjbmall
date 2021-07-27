import Vue from "vue";
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addToCounter(state, payload) {
      payload.count ++
    },
    addToCart(state, payload) {
      state.cartList.push(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      //payload新添加的商品
      // let oldProduct = null;
      // for(let item of state.cartList){
      //   if(item.iid === payload.iid) {
      //     oldProduct = item
      //   }
      // }
      let oldProduct = context.state.cartList.find(item => item.iid ===payload.iid)
      //判断oldProduct
      if(oldProduct) {
        // oldProduct.count += 1
        context.commit('addToCounter', oldProduct)
      }else {
        payload.count += 1;
        // context.state.cartList.push(payload)
        context.commit('addToCart', payload)
      }
    }
  }
})

export default store

//这里和router导出一样都要去main.js里面去导入再挂载