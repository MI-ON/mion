import jwt_decode from "jwt-decode";
import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

export default class InfoWindowContent {
  public static async makeInfoWindowContent(
    data: string | any
  ): Promise<HTMLDivElement> {
    const infoWindowContainer = await this.drawInfoContent(data);
    return infoWindowContainer;
  }

  static async drawInfoContent(data: string | any): Promise<HTMLDivElement> {
    const {
      id,
      place_name,
      address_name,
      road_address_name,
      phone,
      place_url,
    } = data;

    const infoContent = `
        <section class="infoContainer">
            <div class="titleContainer">${place_name}</div>
            <div class="bodyContainer">
                <div>${address_name}</div>
                <div>(지번) ${road_address_name}</div>
                <span>${phone}</span><a href='${place_url}'>상세보기</a>
            </div>
        </section>`;

    const voteBtn = document.createElement("button");
    voteBtn.type = "button";
    voteBtn.classList.add("voteBtn");
    voteBtn.addEventListener("click", () => {
      // TODO: click event method
    });
    voteBtn.innerHTML = `<img src='${require("../../../assets/vote-icon.png")}' />`;

    const voteButtonContent = document.createElement("section");
    voteButtonContent.classList.add("voteButtonContainer");
    voteButtonContent.appendChild(voteBtn);

    const infoWindowContainer = document.createElement("div");
    infoWindowContainer.classList.add("infoWindowContainer");

    const topContentContainer = document.createElement("div");
    topContentContainer.classList.add("topContentContainer");

    topContentContainer.innerHTML = infoContent;
    topContentContainer.appendChild(voteButtonContent);

    const bottomContentContainer = document.createElement("div");
    bottomContentContainer.classList.add("bottomContentContainer");

    bottomContentContainer.innerHTML = await this.votedUserProfileContent(id);

    infoWindowContainer.appendChild(topContentContainer);
    infoWindowContainer.appendChild(bottomContentContainer);

    return infoWindowContainer;
  }

  static async votedUserProfileContent(place_id: string): Promise<string> {
    const response = await axios.post("/graphql", {
      query: `query {
        get_voted_users_by_store_id(store_id: "${place_id}") {
          image_url
        }
      }`,
    });

    const votedUserImageList = await response.data.data
      .get_voted_users_by_store_id;

    const votedUserProfileContent = `
        ${await votedUserImageList
          .map((user: { image_url: string }, i: number) => {
            return i > 8 ? "" : `<img src='${user.image_url}' key='${i}' />`;
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
