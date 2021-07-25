import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../../../vuecli/tabbar/src/views/home/Home";
import Category from "../../../vuecli/tabbar/src/views/category/Category";
import Cart from "../../../vuecli/tabbar/src/views/cart/Cart";
import Profile from "../../../vuecli/tabbar/src/views/profile/Profile";

Vue.use(VueRouter)

const routes = [
  {
    path:'',
    component:Home
  },
  {
    path:'/home',
    component: Home
  },
  {
    path:'/category',
    component: Category
  },
  {
    path:'/cart',
    component: Cart
  },
  {
    path:'/profile',
    component: Profile
  }

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router