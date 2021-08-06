export default class InfoWindowContent {
  public static makeInfoWindowContent(data: string | any): string {
    const infoContent = this.placeInfoContent(data);
    return infoContent;
  }

  static placeInfoContent(data: string | any): string {
    const {
      place_name,
      address_name,
      road_address_name,
      phone,
      place_url,
    } = data;

    const infoContent = `
        <div>
            <div>${place_name}</div>
            <div>
                <div>${address_name}</div>
                <div>${road_address_name}</div>
            </div>
            <div>
                <span>${phone}</span><a href='${place_url}'>상세보기</a>
            </div>
        </div>`;

    return infoContent;
  }
}
