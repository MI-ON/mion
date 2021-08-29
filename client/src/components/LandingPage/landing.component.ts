import { Component, Vue } from "vue-property-decorator";
import router from "@/router";

@Component({})
export default class LandingComponent extends Vue {
  onClickStartedBtn = () => {
    this.$store.state.userToken ? router.push("/map") : router.push("/login");
  };
  onClickAboutBtn = () => {
    router.push('/about')
  }
}
