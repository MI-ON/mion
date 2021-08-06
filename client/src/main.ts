import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    const userEmail: string | null = localStorage.getItem("userEmail");
    if (userEmail) {
      this.$store.commit("SET_USER_EMAIL", userEmail);
    } else {
      this.$router.push("/login");
    }
  },
  render: (h) => h(App),
}).$mount("#app");
