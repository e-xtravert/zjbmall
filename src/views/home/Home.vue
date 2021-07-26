<template>
  <div id="home">
    <navbar class="home-nav"><div slot="center">购物街</div></navbar>
    <tab-control class="tab-control-view"
                 :titles="['流行', '新款', '精选']"
                 ref="tabControl1"
                 v-show="isFIxed"
                 @btnClick="btnClick"/>
    <!--      这里tmd给一个加上括号反而出错了，真烦，一个参数就不要括号-->
  <scroll ref="scroll" class="content"
          :probe-type="3"
          @scroll="backTopShow"
          :pull-up-load="true"
          @pullingUp="loadMore"
  >
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view/>
    <tab-control class="tab-control"
                 :titles="['流行', '新款', '精选']"
                 ref="tabControl2"
                 :class="{fixed:isFIxed}"
                 @btnClick="btnClick"/>
    <!--      这里tmd给一个加上括号反而出错了，真烦，一个参数就不要括号-->
      <goods-list :goods="showGoods"/>
      <!--  如果引号里面的东西特别长就搞一个computed，然后一个函数搞里头，引号里面直接引用就行-->
  </scroll>
    <back-top @click.native="backTop" v-show="isTopShow"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "../../components/content/tabControl/TabControl";
import Navbar from "../../components/common/navbar/Navbar";
import GoodsList from "../../components/content/goods/GoodsList";
import Scroll from "../../components/common/scroll/Scroll";
import BackTop from "../../components/content/backTop/BackTop";

import {getHomeMultidata,getHomeGoods} from "../../network/home";
import BScroll from "better-scroll";
export default {
  name: "Home",
  components: {
    BackTop,
    TabControl,
    FeatureView,
    RecommendView,
    HomeSwiper,
    Navbar,
    GoodsList,
    Scroll
  },
  data() {
    return {
      isTopShow: true,
      banners:[],
      recommends:[],
      currentType: 'pop',
      tabOffsetSop: 549,
      isFIxed: false,
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
    }
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

  },
  mounted() {
    //事件监听,不再需要卡顿了，就是图片加载完fresh一下，
    // 我前面已经设置了一个200ms的延迟了，不过还是跟老师一样，万一后面需要
    this.$bus.$on('imgItemLoad', () => {
      this.$refs.scroll.scroll.refresh()
    })
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
      //return不能无脑加括号，要看需不需要
    }
  },
  methods: {
    //防抖函数
    debounce(func, delay) {
      let timer = null
      return function (...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this, args)
        }, delay)
      }
    },

    /**
     * 事件监听
     */
    btnClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backTop() {
      // console.log(this.$refs.scroll.message);
      // console.log(this.$refs.scroll.scrollTo());
      this.$refs.scroll.scrollTo(0, 0, 200)
    },
    backTopShow(position) {
      //监听是否显示返回顶部
      this.isTopShow = (-position.y) > 1000
      //监听是否吸顶
      this.isFIxed = (-position.y) > this.tabOffsetSop
    },
    loadMore() {
       console.log('上拉加载更多')
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      this.tabOffsetSop = this.$refs.tabControl2.$el.offsetTop
    },

    /**
     * 网络请求相关函数
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // this.result = res;
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type] + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        //父拿子别忘了加refs
      })
    }
  }
}
</script>
<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  /*z-index: 9;*/
  /*还用浏览器导航原生滚动时，为了不跟随一起滚动而设置*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
}
.tab-control-view {
  position: relative;
  z-index: 9;
  /*只对定位起效果*/
}
.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}
.content {
  overflow: hidden;
  /*没有设置上面这个返回顶部控制的时候会出错*/
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}


</style>