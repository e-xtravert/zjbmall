<template>
  <div class="goods-list">
    <goods-list-item v-for="item in goods" :goods-item="item"/>
<!--    要显示就要加上冒号在前面，从别的组件来的数据最好加上冒号，相信我没戳的-->
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";

export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
    props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
    }
}
</script>

<style scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  padding: 2px;
}
</style>