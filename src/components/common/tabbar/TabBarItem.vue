<template>

    <div class="tab-bar-item" @click="itemClick">
      <div v-if="!isActive"><slot name="item-icon"></slot></div>
      <div v-else><slot name="item-icon-active"></slot></div>
      <div v-bind:style="activeStyle"><slot name="item-text"></slot></div>
<!--      插入活跃状态图片-->
    </div>

</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    //传入一个字符串类型
    activeColor:{
      type:String,
      default:'red'
    }
  },
  data() {
    return {
    //   isActive:true
    }
  },
  computed:{
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1//不能找到这个路径就是不等于-1
    },
    activeStyle() {
      return this.isActive? {color:this.activeColor} : {}//动态绑定颜色
    }
  },
  methods:{
    itemClick() {
      if (this.$route.path === this.path) return;
      this.$router.push(this.path)//上面props拿地址，这里用地址懂没？
    }
  }
}
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  vertical-align: middle;
/*//把图片下面那个默认的3像素去掉*/
  margin-bottom:2px
}

</style>