import { gql } from "apollo-boost";
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";

declare global {
  interface Window {
    gapi: any;
  }
}

@Component({})
export default class LoginComponent extends Vue {
  mounted() {
    window.gapi.signin2.render("my-signin2", {
      scope: "profile email",
      width: 240,
      height: 50,
      longtitle: true,
      theme: "dark",
      onsuccess: this.onSuccess,
      onfailure: this.onFailure,
    });
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
        email: userEmail,
      },
    });
    return response.data.get_user_by_email;
  }

  async register(userData: { email: string; name: string; imageUrl: string }) {
    await this.$apollo.mutate({
      mutation: gql`
        mutation($email: String!, $name: String!, $imageUrl: String!) {
          add_user(email: $email, full_name: $name, image_url: $imageUrl) {
            email
            full_name
            image_url
          }
        }
      `,
      variables: {
        email: userData.email,
        name: userData.name,
        imageUrl: userData.imageUrl,
      },
    });
  }

  async onSuccess(googleUser: any): Promise<void> {
    const profile = googleUser.getBasicProfile();
    const userData = {
      email: profile.getEmail(),
      name: profile.getName(),
      imageUrl: profile.getImageUrl(),
    };

    const isMember = (await this.memberCheck(userData.email)) ? true : false;

    if (!isMember) {
      await this.register(userData);
    }
    this.$store.commit("SET_USER", userData);
    this.$router.push("/");
  }

  onFailure(err: string): void {
    console.log(err);
  }
}
