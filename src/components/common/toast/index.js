import Toast from "./Toast";

const obj = {}

  obj.install = function (Vue) {
//这第一种方法是不行的
//   document.body.appendChild(Toast.$el);
//     vue.prototype.$toast = Toast
    //1.创建组件构造器
    const toastConstructor = Vue.extend(Toast)

    //2.new的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastConstructor()

    //3.将组件对象手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))

    //4.toast.$el对应的就是div
    document.body.appendChild(toast.$el)

    Vue.prototype.$toast = Toast
  }



export default obj