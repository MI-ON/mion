export default class InfoWindowContent {
  public static makeInfoWindowContent(data: string | any): string {
    const infoWindowContainer = this.drawInfoContent(data);
    return infoWindowContainer;
  }

  static drawInfoContent(data: string | any): string {
    const {
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

    const voteButtonContent = `
        <section class="voteButtonContainer">
            <button type="button" ><img src='${require("../../../assets/vote-icon.png")}' /></button>
        </section>`;

    const bottomContentContainer = this.votedUserProfileContent();

    return (
      `<div class="infoWindowContainer">
        <div class="topContentContainer">
      ` +
      infoContent +
      voteButtonContent +
      ` </div>` +
      bottomContentContainer +
      `</div>`
    );
  }

  static votedUserProfileContent(): string | any {
    const votedSampleProfiles = [
      require("../../../assets/sample-profile01.jpeg"),
      require("../../../assets/sample-profile02.jpeg"),
      require("../../../assets/sample-profile03.jpeg"),
      require("../../../assets/sample-profile03.jpeg"),
      require("../../../assets/sample-profile03.jpeg"),
    ];
    const votedUserProfileContent = `
    <div class="bottomContentContainer">
        ${votedSampleProfiles
          .map((profile, i) => {
            return i > 2 ? "" : `<img src='${profile}' key='${i}' />`;
          })
          .join("\n")}
        <span>${
          votedSampleProfiles.length > 2
            ? `+${votedSampleProfiles.length - 3}`
            : ""
        }</span>
      </div>`;

    return votedUserProfileContent;
  }
}
