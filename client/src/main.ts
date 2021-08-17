import Vue from "vue";
import Vuetify from "vuetify";
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
Vue.use(Vuetify);

new Vue({
  apolloProvider,
  router,
  store,
  created() {
    const userToken: string | null = this.$store.state.userToken;
    if (!userToken) {
      this.$router.push("/");
    }
  },
  render: (h) => h(App),
}).$mount("#app");
