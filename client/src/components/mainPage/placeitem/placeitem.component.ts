import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import jwt_decode from "jwt-decode";
import { gql } from "apollo-boost";

@Component
export default class PlaceItemComponent extends Vue {
  @Prop(Object) protected searchResult!: { place_name: String };
  @Watch("searchResult")
  updateMessage() {
    console.log("placeitem에서 변경 감지");
    console.log(this.searchResult);
  }

  async onClickVoteBtn() {
    const userJWToken = this.$store.state.userToken;
    const userTokenDecoded: { email: string } = jwt_decode(userJWToken);

    await this.$apollo.mutate({
      mutation: gql`
        mutation($store_name: String!, $email: String!) {
          add_check_in(store_name: $store_name, email: $email) {
            id
          }
        }
      `,
      variables: {
        store_name: this.searchResult.place_name,
        email: userTokenDecoded.email,
      },
    });
  }
}
