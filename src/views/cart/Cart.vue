<template>
<div class="cart">
<!--  导航栏显示-->
  <navbar class="nav-bar">
    <div slot="center">购物车({{Length}})</div>
  </navbar>
<!--  列表显示-->
<cart-list/>
<!--底部汇总-->
  <bottom-bar/>
</div>
</template>

<script>
import Navbar from "../../components/common/navbar/Navbar";
import CartList from "./childComps/CartList";
import BottomBar from "./childComps/BottomBar";
import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  components: {
    Navbar,
    CartList,
    BottomBar
  },
  computed: {
    // ...mapGetters(['cartList','cartLength'])
    ...mapGetters({
      Length: 'cartLength'
    })
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-weight: 700;
}
</style>