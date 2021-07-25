<template>
<div id="home">
  <navbar class="home-nav"><div slot="center">购物街</div></navbar>
  <home-swiper :banners="banners"></home-swiper>
  <recommend-view :recommends="recommends"></recommend-view>
  <feature-view/>
  <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
      @btnClick="btnClick"/>
  <!--      这里tmd给一个加上括号反而出错了，真烦，一个参数就不要括号-->
  <goods-list :goods="showGoods"/>
<!--  如果引号里面的东西特别长就搞一个computed，然后一个函数搞里头，引号里面直接引用就行-->
</div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "../../components/content/tabControl/TabControl";
import Navbar from "../../components/common/navbar/Navbar";
import GoodsList from "../../components/content/goods/GoodsList";
import {getHomeMultidata,getHomeGoods} from "../../network/home";
export default {
  name: "Home",
  components: {
    TabControl,
    FeatureView,
    RecommendView,
    HomeSwiper,
    Navbar,
    GoodsList
  },
  data() {
    return {
      banners:[],
      recommends:[],
      currentType: 'pop',
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      }
    }
  },
  created() {
    this.getHomeMultidata()

    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
      //return不能无脑加括号，要看需不需要
    }
  },
  methods: {
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
      })
    }
  }
}
</script>
<style scoped>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px
}
</style>