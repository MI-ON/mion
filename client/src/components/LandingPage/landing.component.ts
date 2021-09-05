import { Component, Vue } from 'vue-property-decorator';
import router from '@/router';

@Component({})
export default class LandingComponent extends Vue {
  onClickStartedBtn(): void {
    this.$store.state.userToken ? router.push('/map') : router.push('/login');
  }
  onClickAboutBtn(): void {
    router.push('/about');
  }
}
