import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import persistedstate from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store(<StoreOptions<any>>{
  state: {
    user: {},
  },
  getters: {},
  mutations: {},
  actions: {},
  plugins: [
    persistedstate({
      paths: ["user"],
    }),
  ],
});
