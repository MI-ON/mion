import router from "@/router";
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class AppBarComponent extends Vue {
  onSignOut(): void {
    this.$store.commit("LOGOUT");
    location.reload();
  }

  onClickRedirect(): void {
    router.push({ path: "/" });
  }
}
