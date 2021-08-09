import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class AppBarComponent extends Vue {
  onSignOut(): void {
    window.gapi.auth2.getAuthInstance().disconnect();
    this.$store.commit("LOGOUT");
    location.reload();
  }
}
