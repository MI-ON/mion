import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created() {
    const userEmail: string | null = this.$store.getters.getUserEmail;
    if (!userEmail) {
      this.$router.push("/login");
    }
  },
  render: (h) => h(App),
}).$mount("#app");
