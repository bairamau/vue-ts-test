import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/table",
    name: "table",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Table.vue")
  },
  {
    path: "/canvas",
    name: "canvas",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Canvas.vue")
  },
  {
    path: "/404",
    name: "404",
    component: NotFound
  },
  {
    path: "*",
    redirect: { name: "404" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
