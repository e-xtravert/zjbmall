import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Home";
import Category from "../views/category/Category";
import Cart from "../views/cart/Cart";
import Profile from "../views/profile/Profile";
import Detail from "../views/detail/Detail";

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    component:Home,
    meta: {
      showTab: true
    }
  },
  {
    path:'/home',
    component: Home,
    meta: {
      showTab: true
    }
  },
  {
    path:'/category',
    component: Category,
    meta: {
      showTab: true
    }
  },
  {
    path:'/cart',
    component: Cart,
    meta: {
      showTab: true
    }
  },
  {
    path:'/profile',
    component: Profile,
    meta: {
      showTab: true
    }
  },
  {
    path:'/detail/:iid',
    component: Detail,
    meta: {
      showTab: false
    }
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router