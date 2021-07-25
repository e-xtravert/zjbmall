import axios from "axios";

export function request(config) {
  //这里其实没必要写promise，因为本身返回的就是promise类的，没必要再封装
    //创建axios实例
    const instance = axios.create({
      baseURL: 'http://152.136.185.210:7878/api/m5',
      timeout: 5000
    })
//axios拦截器，请求拦截的作用
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err);
  })
//2、响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })
    //发送真正的网络请求,直接return，没必要包装
    return instance (config);

}