import axios from 'axios';
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

@Component
export default class VotedPlaceItemComponent extends Vue {
  @Prop(Object) protected votedPlaceData!: { placeName: string };
  @Watch('votedPlaceData')
  userAvatarUrl = [];

  mounted(): void {
    this.votedUserProfileContent();
  }

  async votedUserProfileContent(): Promise<void> {
    const response = await axios.post('/graphql', {
      query: `query {
        getVotedUsersByStoreName(storeName: "${this.votedPlaceData.placeName}") {
          avatarUrl
        }
      } `,
    });

    this.userAvatarUrl = await response.data.data.getVotedUsersByStoreName;
  }
}
