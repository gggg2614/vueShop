import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: () => import("@/views/login/login"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login"),
  },
  {
    path: "/home",
    component: Home,
    hidden: true,
    redirect: '/welcome',
    children: [
      {
        path: "/welcome",
        component: () => import("@/views/Welcome.vue"),
        hidden: true,
      },
      {
        path: "/users",
        component: () => import("@/views/user/Users"),
        hidden: true,
      },
      {
        path: "/roles",
        component: () => import("@/views/power/Roles"),
        hidden: true,
      },
      {
        path: "/rights",
        component: () => import("@/views/power/Rights"),
        hidden: true,
      },
      {
        path: "/goods",
        component: () => import("@/views/goods/List"),
        hidden: true,
      },
      {
        path: "/categories",
        component: () => import("@/views/goods/Cate"),
        hidden: true,
      },
      {
        path: "/goods/add",
        component: () => import("@/views/goods/Add"),
        hidden: true,
      },
      {
        path: "/params",
        component: () => import("@/views/goods/Params"),
        hidden: true,
      },
      {
        path: "/orders",
        component: () => import("@/views/order/Order"),
        hidden: true,
      },
      {
        path: "/reports",
        component: () => import("@/views/report/Report.vue"),
        hidden: true,
      },
    ],
  },
];


const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router;
