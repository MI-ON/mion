import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';
import VotedPlaceItemComponent from '../votedplaceitem/votedplaceitem.component.vue';

@Component({ components: { VotedPlaceItemComponent } })
export default class VoteComponent extends Vue {
  votedPlaceData: Record<string, unknown>[] = [];

  async mounted(): Promise<void> {
    await this.getVotedStores();
  }

  async getVotedStores(): Promise<void> {
    const response = await axios.post('/graphql', {
      query: `query {
        getVotedStores {
          id
          placeName
          addressName
          roadAddressName
          phone
          placeUrl
        }
      }`,
    });
    this.votedPlaceData = await response.data.data.getVotedStores;
  }
}
