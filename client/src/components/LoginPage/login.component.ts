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

  onSuccess(googleUser: any): void {
    const profile = googleUser.getBasicProfile();
    const userEmail: string = profile.getEmail();

    axios.post("/api/login", { userEmail: userEmail }).then((res) => {
      if (res.data.loginSuccess) {
        localStorage.setItem("userEmail", userEmail);
        this.$router.push("/");
      }
    });
  }

  onFailure(err: string): void {
    console.log(err);
  }
}
