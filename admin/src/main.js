import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import "@/assets/css/global.scss";
import store from "./store";
import axios from "axios";

import TreeTable from 'vue-table-with-tree-grid'

import VueQuillEditor from "vue-quill-editor";

import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import "nprogress/nprogress.css";
import NProgress from "nprogress";
axios.defaults.baseURL = "http://localhost:8888/api/private/v1/";

axios.interceptors.request.use((config) => {
  NProgress.start();
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
});

axios.interceptors.response.use((config) => {
  NProgress.done();
  return config;
});

Vue.component('tree-table', TreeTable)
Vue.use(VueQuillEditor);

Vue.filter("dateFormat", function (originVal) {
  const dt = new Date(originVal);

  const y = dt.getFullYear();
  const m = (dt.getMonth() + 1 + "").padStart(2, "0");
  const d = (dt.getDate() + "").padStart(2, "0");

  const hh = (dt.getHours() + "").padStart(2, "0");
  const mm = (dt.getMinutes() + "").padStart(2, "0");
  const ss = (dt.getSeconds() + "").padStart(2, "0");

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
});
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
