import { gql } from 'apollo-boost';
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class MemberComponent extends Vue {
    // changeNickname1(e: any): void {
    //     alert('test');
    //     e.preventDefault();
    //     console.log(this.$emit('input', e.target.value));

    //     // this.$store.commit('SET_NICKNAME_TOKEN', userJWToken);
    //     //  디비에 저장된 nickname을 불러와 인풋에 입력한 값으로 교체
    //     // location.reload();
    // }
    async getFullName(userEmail: string) {
        const response = await this.$apollo.query({
            query: gql`
                query($full_name: String!) {
                    get_user_by_fullName(full_name: $full_name) {
                        full_name
                    }
                }
            `,
            variables: {
                full_name: userEmail
            }
        });
        return response.data.get_user_by_fullName;
    }

    async addFullName(
        e: any,
        userData: {
            email: string;
            full_name: string;
        }
    ) {
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
                email: userData.email,
                full_name: userData.full_name
            }
        });

        alert('test');
        e.preventDefault();
    }
}
