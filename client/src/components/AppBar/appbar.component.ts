import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class AppBarComponent extends Vue {
  mounted() {
    window.gapi.load("auth2", function() {
      window.gapi.auth2.init();
    });
  }

  onSignOut(): void {
    window.gapi.auth2.getAuthInstance().disconnect();
    localStorage.removeItem("userEmail");
    location.reload();
  }
}
