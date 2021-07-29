<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
          :is-checked="isSelectAll"
          @click.native="checkedAll"
          class="check-button"/>
      <span>全选</span>
    </div>

    <div class="total-price">{{totalPrice}}</div>

    <div class="to-check">去结算({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
  name: "BottomBar",
  components: {
    CheckButton
  },
  methods: {
    checkedAll() {
      if(this.isSelectAll){
        this.$store.state.cartList.forEach(item => item.checked = false)
      }else {
        this.$store.state.cartList.forEach(item => item.checked = true)
      }
    }
  },
  computed: {
    //这下面两个计算属性都没怎么看懂，得把箭头函数好好看看
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength(){
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.count
      }, 0)
    },
    isSelectAll() {
      if(this.$store.state.cartList.length == 0) return false
      return !(this.$store.state.cartList.filter(item => !item.checked).length)
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  position: relative;
  display: flex;
  background-color: #eeeeee;
  line-height: 40px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  width: 22px;
  height: 22px;
  line-height: 22px;
}
.total-price {
  margin-left: 20px;
}
.to-check {
  width: 90px;
  margin-left: auto;
  background-color: red;
  color: #ffffff;
  text-align: center;
}
</style>