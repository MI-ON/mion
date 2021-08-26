import { LoginComponent } from "@/components/LoginPage";
import { LandingComponent } from "@/components/LandingPage";
import { MapComponent } from "@/components/mainPage/map";
import { MemberComponent } from "@/components/memberPage";
import { AboutComponent } from "@/components/AboutPage";
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingComponent,
  },
  {
    path: "/map",
    name: "MapPage",
    component: MapComponent,
  },
  {
    path: "/login",
    name: "LoginPage",
    component: LoginComponent,
  },
  {
    path: "/member",
    name: "MemberPage",
    component: MemberComponent,
  },
  {
    path: "/about",
    name: "AboutPage",
    component: AboutComponent,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
