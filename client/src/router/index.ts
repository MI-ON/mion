import { LoginComponent } from "@/components/LoginPage";
import { MapComponent } from "@/components/mainPage/map";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "LandingPage",
    component: MapComponent,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginComponent,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
