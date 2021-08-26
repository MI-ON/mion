import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
import VotedPlaceItemComponent from "../votedplaceitem/votedplaceitem.component.vue";

@Component({ components: { VotedPlaceItemComponent } })
export default class VoteComponent extends Vue {
  mounted() {
    let votedPlaceData: any = async (store_name: string): Promise<string> => {
      const response = await axios.post("/graphql", {
        query: `query {
                get_stores(store_name: "${store_name}") {
                    id
                    place_name
                    address_name
                    road_address_name
                    phone
                    place_url
                }
            }`,
      });
      votedPlaceData = Object.assign({}, await response.data.data.get_stores);
      return votedPlaceData;
    };
  }

  static async votedUserProfileContent(store_name: string): Promise<string> {
    const response = await axios.post("/graphql", {
      query: `query {
                get_voted_users_by_store_name(store_name: "${store_name}") {
                    image_url
                }
            }`,
    });

    const votedUserImageList = await response.data.data
      .get_voted_users_by_store_name;

    const votedUserProfileContent = `
            ${await votedUserImageList
              .map((user: { image_url: string }, i: number) => {
                return i > 8
                  ? ""
                  : `<img src='${user.image_url}' key='${i}' />`;
              })
              .join("\n")}
            ${
              votedUserImageList.length > 8
                ? `<span>+${votedUserImageList.length - 8}</span>`
                : ""
            }`;

    return votedUserProfileContent;
  }
}
