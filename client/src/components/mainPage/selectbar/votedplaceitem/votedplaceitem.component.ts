import axios from "axios";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class VotedPlaceItemComponent extends Vue {
  @Prop(Object) protected votedPlaceData!: { place_name: string };
  @Watch("votedPlaceData")
  userImageList = [];

  mounted() {
    this.votedUserProfileContent();
  }

  async votedUserProfileContent(): Promise<void> {
    const response = await axios.post("/graphql", {
      query: `query {
      get_voted_users_by_store_name(store_name: "${this.votedPlaceData.place_name}") {
        image_url
        }
      } `,
    });

    this.userImageList = await response.data.data.get_voted_users_by_store_name;
  }
}
