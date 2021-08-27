import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ApolloClient from "apollo-boost";
import VueApollo from "vue-apollo";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


const apolloClient = new ApolloClient({
  uri: process.env.VUE_APP_GRAPHQL_API_ENDPOINT,
});
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
});
Vue.config.productionTip = false;
Vue.use(VueApollo);
Vue.use(Vuetify);
Vue.use(BootstrapVue);

new Vue({
  apolloProvider,
  router,
  store,

  created() {
    const userToken: string | null = this.$store.state.userToken;
    if (location.pathname !== "/" && !userToken) {
      this.$router.push("/login");
    }
  },
  render: (h) => h(App),
}).$mount("#app");
