<template>
  <div id="detail">
    <div >{{$store.state.cartList}}</div>
    <detail-nav-bar class="detail-nav"
                    ref="nav"
                    @titleClick="titleClick"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :top-images="topImages">
      </detail-swiper>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detail-info="goodsInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref='params' :param-info="paramsInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommends" :goods="recommends"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isTopShow"/>
    <detail-bottom-bar @addCart="addToCart"/>
  </div>
</template>

<script>
import Scroll from "../../components/common/scroll/Scroll";
import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";
import BackTop from "../../components/content/backTop/BackTop";
import DetailNavBar from "./childComps/DetailNavBar";
import DetailBottomBar from "./childComps/DetailBottomBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "../../components/content/goods/GoodsList";
export default {
  name: "Detail",
  data() {
    return {
      isTopShow: true,
      isFIxed: false,
      pullUpLoad: false,
      iid: null,
      topImages: [],
      goods: {
        type: Array,
        default() {
          return {}
        }
      },
      shopInfo: {},
      goodsInfo: {},
      paramsInfo: {},
      commentInfo:{},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0
    }
  },
  created() {
    this.iid = this.$route.params.iid;

    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      // console.log(this.goods);
      this.shopInfo = new Shop(data.shopInfo)
      // console.log(this.shopInfo);
      this.goodsInfo = data.detailInfo
      this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      //展示评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
      // this.$nextTick(() => {
      //   // 注意el是跟div，没有渲染自然也不会有，放mounted里面是不对的，methods里面也不对，都会有undefined，放这里是为了数据都有了再获取
      //   // 但是这里拿到的数据是不对的，offsetTop值不对是来自图片加载的问题
      //   this.themeTopYs = []
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
      //   console.log(this.themeTopYs);
      // })
    });
    getRecommend().then(res => {
      // this.recommends = res
      // console.log(res.data);
      this.recommends = res.data.list
    })
    //这里用防抖的知识解决回调多次的问题，但是我好像没写debouce函数？
    // this.getThemeTopY = debounce(() => {
    //
    // })
  },
  components: {
    GoodsList,
    DetailSwiper,
    DetailNavBar,
    DetailBottomBar,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    BackTop,
    Scroll
  },
  methods: {
    imageLoad() {
      // this.$refs.scrool.scroll.refresh()
      this.$nextTick(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 35)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 35)
        this.themeTopYs.push(this.$refs.recommends.$el.offsetTop - 35)
        // console.log(this.themeTopYs);
      })
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -(this.themeTopYs[index]), 400)
    },
    contentScroll(position) {
      /**
       * 判断的方案:
       *  方案一:
       *    条件: (i < (length-1) && currentPos >= iPos && currentPos < this.themeTops[i+1]) || (i === (length-1) && currentPos >= iPos),
       *    优点: 不需要引入其他的内容, 通过逻辑解决
       *    缺点: 判断条件过长, 并且不容易理解
       *  方案二:
       *    条件: 给themeTops最后添加一个很大的值, 用于和最后一个主题的top进行比较.
       *    优点: 简洁明了, 便于理解
       *    缺点: 需要引入一个较大的int数字
       * 疑惑: 在第一个判断中, 为什么不能直接判断(currentPos >= iPos)即可?
       * 解答: 比如在某一个currentPos大于第0个时, 就会break, 不会判断后面的i了.
       */
      const positionY = -position.y
      let length = this.themeTopYs.length
      for(let i = 0; i < length; i++) {
        if(this.currentIndex !== i && (i < length - 1 && positionY >= this.themeTopYs[i]
            && positionY < this.themeTopYs[i + 1])
            || (i === length - 1 && positionY >= this.themeTopYs[i])){
          this.currentIndex = i
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }
    },
    backTop() {
      // console.log(this.$refs.scroll.message);
      // console.log(this.$refs.scroll.scrollTo());
      this.$refs.scroll.scrollTo(0, 0, 200)
    },
    backTopShow(position) {
      //监听是否显示返回顶部
      this.isTopShow = (-this.themeTopYs) > 1000
      //监听是否吸顶
      this.isFIxed = (-this.themeTopYs) > this.tabOffsetSop
    },
    addToCart() {
      // console.log("---");
      //商品展示
      const product = {}
      product.image = this.topImages[0];
      product.title = this.goodsInfo.title;
      product.desc = this.goodsInfo.desc;
      product.price = this.goodsInfo.nowPrice;
      product.iid = this.iid
      //获取商品
      // this.$store.commit('addCart',product)
      this.$store.dispatch('addCart',product)
    }
  }
}
</script>

<style scoped>
#detail {
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 90;
  background-color: #ffffff;
  opacity: 1
}
.content {
  height: calc(100% - 44px);
}
/*#detail {*/
/*  position: fixed;*/
/*  z-index: 9;*/
/*  background-color: #fff;*/
/*}*/
</style>