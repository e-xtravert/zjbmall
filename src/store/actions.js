export default {
  addCart(context, payload) {
    //payload新添加的商品
    // let oldProduct = null;
    // for(let item of state.cartList){
    //   if(item.iid === payload.iid) {
    //     oldProduct = item
    //   }
    // }
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      //判断oldProduct
      if(oldProduct) {
        oldProduct.count += 1
        context.commit('addToCounter', oldProduct)
        resolve('添加商品数量+1')
      }else {
        payload.count = 1;
        // context.state.cartList.push(payload)
        context.commit('addToCart', payload)
        resolve('添加商品成功')
      }
    })
  }
}