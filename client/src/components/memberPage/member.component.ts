import { gql } from 'apollo-boost';
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class MemberComponent extends Vue {
  public userEmail = this.$store.getters.getUserByEmail;
  public fullName = '';
  public inputName = '';

  mounted(): void {
    this.getUserFullName();
  }
  async getUserFullName(): Promise<void> {
    this.fullName = await this.getUserByEmail(this.userEmail);
  }
  async getUserByEmail(userEmail: string): Promise<string> {
    const response = await this.$apollo.query({
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
    return response.data.getUserByEmail.fullName;
  }

  async addFullName(): Promise<void> {
    await this.$apollo.mutate({
      mutation: gql`
        mutation ($email: String!, $fullName: String!) {
          add_fullName(email: $email, fullName: $fullName) {
            email
            fullName
          }
        }
      `,
      variables: {
        email: this.userEmail,
        fullName: this.inputName,
      },
    });

    this.fullName = this.inputName;
  }
}
