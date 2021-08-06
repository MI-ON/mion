import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";

Vue.use(Vuex);

export default new Vuex.Store(<StoreOptions<any>>{
  state: {
    userEmail: null,
  },
  getters: {},
  mutations: {
    SET_USER_EMAIL(state, userEmail) {
      state.userEmail = userEmail;
      localStorage.setItem("userEmail", userEmail);
    },
  },
  actions: {},
});
