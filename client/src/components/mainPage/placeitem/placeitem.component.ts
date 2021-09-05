import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import jwt_decode from 'jwt-decode';
import { gql } from 'apollo-boost';

@Component
export default class PlaceItemComponent extends Vue {
  @Prop(Object) protected searchResult!: { place_name: string };

  @Watch('searchResult')
  async onClickVoteBtn(): Promise<void> {
    console.log('searchResult changed');
    const userJWToken = this.$store.state.userToken;
    const userTokenDecoded: { email: string } = jwt_decode(userJWToken);

    await this.$apollo.mutate({
      mutation: gql`
        mutation ($storeName: String!, $email: String!) {
          addCheckIn(storeName: $storeName, email: $email) {
            id
          }
        }
      `,
      variables: {
        storeName: this.searchResult.place_name,
        email: userTokenDecoded.email,
      },
    });
    // alert(`${this.searchResult.place_name}에 투표되었습니다!`);
    console.log(`${this.searchResult.place_name}에 투표되었습니다!`);
  }
}
