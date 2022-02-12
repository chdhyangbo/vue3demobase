import axios from 'axios';
import qs from 'qs';
import { useRouter } from 'vue-router';
let instance = axios.create({
    baseURL: import.meta.env.DEV ? 'http://localhost:3000' : '/',
    headers: {
        'Content-Type':'application/x-www-form-urlencoded',// 配置成这种格式就不会因为axiosm默认的json格式导致提交变成option请求了
    }
})

// 请求拦截器
instance.interceptors.request.use(
    config => {
      console.log(config);
      config.headers['token'] = localStorage.getItem('token');
      if (config.headers['Content-Type'] != "multipart/form-data") {
        config.data = qs.stringify(config.data) // 转为formdata数据格式
      }
      return config
    },
    error => Promise.error(error)
  )

// 响应拦截器
instance.interceptors.response.use(
  config => {
    if (config.data && config.data.cc == '9999') {
      location.href = '/#/login';
    }
    return config;
  }
)

export default instance;