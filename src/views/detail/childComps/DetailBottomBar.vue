<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
<!--    <dialog @closeDialog="close" v-if="showDialog"></dialog>-->
  </div>
</template>

<script>
import Dialog from "./Dialog";
export default {
  name: "NavButtonBar",
  // data() {
  //   return {
  //     showDialog: false
  //   }
  // },
  methods: {
    addToCart() {
      alert('添加成功，请前往购物车查看')
      this.$emit('addCart')
    },
    // show() {
    //   this.showDialog = true
    // },
    // close() {
    //   this.showDialog = false
    // }
  },
  // components: {
  //   Dialog
  // }
}
</script>

<style scoped>
.bottom-bar {
  height: 49px;
  position: fixed;
  z-index: 999;
  background-color: #ffffff;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  text-align: center;
}

.bar-item {
  flex: 1;
  display: flex;
}

.bar-item>div {
  flex: 1;
}

.bar-left .text {
  font-size: 13px;
}

.bar-left .icon {
  display: block;
  width: 22px;
  height: 22px;
  margin: 10px auto 3px;
  background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
}

.bar-left .service {
  background-position:0 -54px;
}

.bar-left .shop {
  background-position:0 -98px;
}

.bar-right {
  font-size: 15px;
  color: #fff;
  line-height: 58px;
}

.bar-right .cart {
  background-color: #ffe817;
  color: #333;
}

.bar-right .buy {
  background-color: #f69;
}
</style>