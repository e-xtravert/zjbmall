<template>
  <div ref="wrapper">
    <div >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      scroll: null,
      message: 121321
    }
  },
  mounted() {
    setTimeout(()=>{
      //监听滚动事件
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        tap: true,
        pullUpLoad: this.pullUpLoad,
        mouseWheel: true,//开启鼠标滚轮
        disableMouse: false,//启用鼠标拖动
        disableTouch: false//启用手指触摸
      });
      //监听返回顶部显示
      this.scroll.on("scroll", (position) => {
        this.$emit('scroll', position)
      });
      //监听上拉加载更多
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
        this.scroll.finishPullUp()
        //老师这个方法放到了getGoods里面，但是我那儿报错，放这儿了
       this.$nextTick(() => {
          this.scroll && this.scroll.refresh();
        });
      })
    },1000);
  },
  methods: {
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time)
      //这个里面参数必须填，而且home里面使用的时候time参数和这里面的不能设置相同
      }
    },
  }
</script>

<style scoped>

</style>