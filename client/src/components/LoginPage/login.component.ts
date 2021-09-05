import { gql } from 'apollo-boost';
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import jwt_decode from 'jwt-decode';
import { IUserObjectType, IUserProfile, CredentialResponse, GoogleAccounts } from '@/types';
declare global {
  interface Window {
    google: {
      accounts: GoogleAccounts;
    };
  }
}

@Component({})
export default class LoginComponent extends Vue {
  mounted(): void {
    window.onload = (): void => {
      const loginBtn = document.querySelector('.loginBtn') as HTMLElement;
      console.log(process.env);
      window.google.accounts.id.initialize({
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID || '',
        callback: this.handleCredentialResponse,
        ux_mode: 'popup',
        auto_select: true,
      });
      window.google.accounts.id.prompt();
      window.google.accounts.id.renderButton(loginBtn, {
        theme: 'outline',
        size: 'large',
        width: '400',
      });
    };
  }

  async handleCredentialResponse(response: CredentialResponse): Promise<void> {
    const userJWToken = response.credential || '';
    const userTokenDecoded: IUserProfile = jwt_decode(userJWToken);

    const userData = {
      email: userTokenDecoded.email,
      name: userTokenDecoded.name,
      avatarUrl: userTokenDecoded.picture,
    };

    const isMember = (await this.memberCheck(userData.email)) ? true : false;

    if (!isMember) {
      await this.register(userData);
    }
    this.$store.commit('SET_USER_TOKEN', userJWToken);
    this.$router.push('/map');
  }

  async memberCheck(userEmail: string): Promise<IUserObjectType> {
    const response = await this.$apollo.query<{ getUserByEmail: IUserObjectType }>({
      query: gql`
        query ($email: String!) {
          getUserByEmail(email: $email) {
            fullName
          }
        }
      `,
      variables: {
        email: userEmail,
      },
    });
    return response.data.getUserByEmail;
  }
  async register(userData: { email: string; name: string; avatarUrl: string }): Promise<void> {
    await this.$apollo.mutate({
      mutation: gql`
        mutation ($email: String!, $name: String!, $avatarUrl: String!) {
          addUser(email: $email, fullName: $name, avatarUrl: $avatarUrl) {
            email
            fullName
            avatarUrl
          }
        }
      `,
      variables: {
        email: userData.email,
        name: userData.name,
        avatarUrl: userData.avatarUrl,
      },
    });
  }
}
