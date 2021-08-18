import { gql } from 'apollo-boost';
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class MemberComponent extends Vue {
    userEmail: string = this.$store.getters.getUserByEmail;
    fullName: string = '';
    inputName: string = '';

    mounted() {
        this.getUserFullName();
    }
    async getUserFullName() {
        this.fullName = await this.getUserByEmail(this.userEmail);
    }
    async getUserByEmail(userEmail: String) {
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
        return response.data.get_user_by_email.full_name;
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
