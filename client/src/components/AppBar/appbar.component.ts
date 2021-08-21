import router from '@/router';
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class AppBarComponent extends Vue {
    data() {
        return {
            defaultProfile: require('../../assets/AppBar/default-profile.png')
        };
    }
    onSignOut(): void {
        this.$store.commit('LOGOUT');
        location.reload();
    }
    onClickRouteRoot(): void {
        router.push({ path: '/' });
    }
    onSignOn(): void {
        router.push({ path: '/login' });
        location.reload();
    }
    onMemberPage():void{
        router.push({ path: '/member' });
    }
}
