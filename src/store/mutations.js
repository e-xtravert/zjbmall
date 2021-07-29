export default {
  addToCounter(state, payload) {
    payload.count ++

  },
  addToCart(state, payload) {
    //物品的属性checked，这里定义后面才可以用
    payload.checked = true
    state.cartList.push(payload)
    //找了半天总算找到为啥没有价格和标题了，原来是构造函数错了
    // console.log(payload.price)
    // console.log(payload.title)
  }
}