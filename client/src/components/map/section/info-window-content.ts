export default class InfoWindowContent {
  public static makeInfoWindowContent(data: string | any): string {
    const infoContent = this.drawInfoContent(data);
    return infoContent;
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

    return (
      `<div class="infoWindowContainer">` +
      infoContent +
      voteButtonContent +
      `</div>`
    );
  }
}
