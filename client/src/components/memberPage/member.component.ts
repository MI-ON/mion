import { gql } from 'apollo-boost';
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class MemberComponent extends Vue {
    fullName: string = '';
    userEmail: string = this.$store.getters.getUserByEmail;
    inputName: string = '';

    async getUserByEmail(userEmail: String) {
        this.fullName = await this.getUserByEmail(this.userEmail);
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

    async addFullName() {
        await this.$apollo.mutate({
            mutation: gql`
                mutation($email: String!, $full_name: String!) {
                    add_full_name(email: $email, full_name: $full_name) {
                        email
                        full_name
                    }
                }
            `,
            variables: {
                email: this.userEmail,
                full_name: this.inputName
            }
        });

        this.fullName = this.inputName;
    }
}
