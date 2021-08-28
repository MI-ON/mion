import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
import VotedPlaceItemComponent from "../votedplaceitem/votedplaceitem.component.vue";

@Component({ components: { VotedPlaceItemComponent } })
export default class VoteComponent extends Vue {
  votedPlaceData: Object[] = [];

  async mounted() {
    await this.getVotedStores();
  }

  async getVotedStores() {
    const response = await axios.post("/graphql", {
      query: `query {
        get_voted_stores {
          id
          place_name
          address_name
          road_address_name
          phone
          place_url
        }
      }`,
    });
    this.votedPlaceData = await response.data.data.get_voted_stores;
  }
}
