<template>
  <div class="nav-bar">
    <navbar>
      <div slot="left" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" class="img"></div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles"
             class="title-item"
             @click="itemClick(index)"
             :class="{active: index === currentIndex}">
          <!--             这里itemClick又要加入参数才能显示了，
          而且这里面标签操作的变量必须来自data（）return-->
          {{item}}
        </div>
      </div>
    </navbar>
  </div>
</template>

<script>
import Navbar from "../../../components/common/navbar/Navbar";
export default {
  name: "DetailNavBar",
  components: {
    Navbar
  },
  data() {
    return {
      currentIndex: 0,
      titles: ['商品', '参数', '评论', '推荐'],
    }
  },
  methods: {
    backClick() {
      this.$router.back()
    },
    itemClick(index) {
      this.currentIndex = index
      this.$emit('titleClick',index)
    }
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: #fff;
}
.title {
  display: flex;
}
.img {
  margin-top: 10px;
}
.title-item {
  flex: 1;
  font-size: 13px;
}
.active {
  color: var(--color-high-text);
}
</style>