import { gql } from 'apollo-boost';
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import jwt_decode from 'jwt-decode';

declare global {
    interface Window {
        google: any;
    }
}

@Component({})
export default class LoginComponent extends Vue {
    mounted() {
        window.onload = () => {
            const loginBtn = document.querySelector('.loginBtn');

            window.google.accounts.id.initialize({
                client_id:
                    '607676472574-toht3fposdjn2ab2tbhaoh5i67vnlmet.apps.googleusercontent.com',
                callback: this.handleCredentialResponse,
                ux_mode: 'popup',
                auto_select: true
            });
            window.google.accounts.id.prompt();
            window.google.accounts.id.renderButton(loginBtn, {
                theme: 'outline',
                size: 'large',
                width: '400'
            });
        };
    }

    async handleCredentialResponse(response: any) {
        interface UserProfile {
            email: string;
            name: string;
            picture: string;
        }

        const userJWToken = response.credential;
        const userTokenDecoded: UserProfile = jwt_decode(userJWToken);

        const userData = {
            email: userTokenDecoded.email,
            name: userTokenDecoded.name,
            imageUrl: userTokenDecoded.picture
        };

        const isMember = (await this.memberCheck(userData.email))
            ? true
            : false;

        if (!isMember) {
            await this.register(userData);
        }
        this.$store.commit('SET_USER_TOKEN', userJWToken);
        this.$router.push('/');
    }

    async memberCheck(userEmail: string) {
        const response = await this.$apollo.query({
            query: gql`
                query($email: String!) {
                    get_user_by_email(email: $email) {
                        full_name
                    }
                }
            `,
            variables: {
                email: userEmail
            }
        });
        return response.data.get_user_by_email;
    }
    async register(userData: {
        email: string;
        name: string;
        imageUrl: string;
    }) {
        await this.$apollo.mutate({
            mutation: gql`
                mutation($email: String!, $name: String!, $imageUrl: String!) {
                    add_user(
                        email: $email
                        full_name: $name
                        image_url: $imageUrl
                    ) {
                        email
                        full_name
                        image_url
                    }
                }
            `,
            variables: {
                email: userData.email,
                name: userData.name,
                imageUrl: userData.imageUrl
            }
        });
    }
}
