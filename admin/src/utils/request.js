import axios from "axios";
import Vue from 'vue'
import router from 'vue-router'

const service = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/',
  timeout: 10 * 60 * 1000,
});

service.interceptors.request.use(function (config) {
  if(localStorage.token){ 
      config.headers.Authorization = 'Bearer ' + (localStorage.token || '')
  }
  return config
}, function err(error) {
  return Promise.reject(error)
})

service.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
      Vue.prototype.$message({
          type: 'error',
          message: err.response.data.message
      })

      if(err.response.status !== 200){
         router.push('/login')
      }
  }
  return Promise.reject(err)
})

export default service