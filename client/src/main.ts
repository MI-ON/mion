import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";

const apolloClient = new ApolloClient({
  uri: process.env.VUE_APP_GRAPHQL_API_ENDPOINT,
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});

Vue.config.productionTip = false;
Vue.use(VueApollo);

new Vue({
  apolloProvider,
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
