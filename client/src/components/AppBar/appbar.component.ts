import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class AppBarComponent extends Vue {
  public defaultProfile = '/img/default-profile.png';

  onSignOut(): void {
    this.$store.commit('LOGOUT');
    location.reload();
  }
  onClickRouteRoot(): void {
    this.$router.push({ path: '/' });
  }
  onSignOn(): void {
    this.$router.push({ path: '/login' });
    location.reload();
  }
  onClickRedirect(): void {
    this.$router.push({ path: '/' });
    location.reload();
  }
  onMemberPage(): void {
    this.$router.push({ path: '/member' });
  }
}
