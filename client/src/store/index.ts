import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

import persistedstate from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store(<StoreOptions<any>>{
  state: {
    user: {},
  },
  getters: {
    getUserEmail: (state) => {
      return state.user.email;
    },
    getUserImageUrl: (state) => {
      return state.user.imageUrl;
    },
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    LOGOUT(state) {
      state.user = {};
    },
  },
  actions: {},
  plugins: [
    persistedstate({
      paths: ["user"],
    }),
  ],
});
