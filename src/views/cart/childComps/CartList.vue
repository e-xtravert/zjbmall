<template>
  <div class="cart-list">
<!--    div里面不能v-for，小li里面倒是可以-->
    <scroll class="content" ref="scroll">
      <!--    div里面不能v-for，小li里面倒是可以-->
      <cart-list-item v-for="(item, index) in List" :key="index" :itemInfo="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "../../../components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
import {mapGetters} from 'vuex'
export default {
  name: "CartList",
  computed: {
    ...mapGetters({
      List: 'cartList'
    })
  },
  activated() {
    //scroll加入购物车后，但是content还是原来的大小空的，所以等于content没有内容
    // 不能滚动，这里加一个刷新
    // this.$refs.scroll.scroll.refresh()
  },
  components: {
    Scroll,
    CartListItem
  }
}
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>