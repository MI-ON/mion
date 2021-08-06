import { Component, Vue } from "vue-property-decorator";
import InfoWindowContent from "./section/info-window-content";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

@Component({})
export default class MapComponent extends Vue {
  infowindow: string | any = "";
  infowindowContent: string | any = "";
  mapContainer: string | any = "";
  map: string | any = "";
  ps: string | any = "";
  mapOption: string | any = "";
  zoomControl: string | any = "";
  marker: string | any = "";
  place: string | any = "";
  bounds: string | any = "";
  search: string | any = "";
  imageSrc: string = "";
  selectedMarker: string | any = null;

  mounted() {
    this.openMap();
  }

  public openMap() {
    console.log("openMap()");

    // 마커를 클릭하면 장소명을 표출할 인포윈도우
    this.infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    // 지도를 표시할 div
    this.mapContainer = document.getElementById("map");
    this.mapOption = {
      center: new window.kakao.maps.LatLng(37.5102134, 127.0539186), // 지도의 중심좌표
      level: 5, // 지도의 확대 레벨
    };

    // 지도 생성
    this.map = new window.kakao.maps.Map(this.mapContainer, this.mapOption);

    // 지도에 확대 축소 컨트롤 생성
    this.zoomControl = new window.kakao.maps.ZoomControl();

    // 지도의 우측에 확대 축소 컨트롤 추가
    // this.map.addControl(this.zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    // 장소 검색 객체 생성
    this.ps = new window.kakao.maps.services.Places();

    // 키워드로 장소 검색
    this.ps.keywordSearch("삼성동 152-29 맛집", this.placesSearchCB);
  }

  public changeSearch() {
    console.log("changeSearch() START!! : " + this.search);

    this.ps.keywordSearch(this.search, this.placesSearchCB);
  }

  public placesSearchCB(data: string | any, status: number) {
    console.log("placesSearchCB() START!!");

    if (status === window.kakao.maps.services.Status.OK) {
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표 추가
      this.bounds = new window.kakao.maps.LatLngBounds();

      for (let i = 0; i < data.length; i++) {
        console.log("data[i] : ");
        console.log(data[i]);

        this.displayMarker(data[i]);
        this.bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
      }

      // 검색된 장소 위치를 기준으로 지도 범위 재설정
      this.map.setBounds(this.bounds);
    }
  }

  public displayMarker(data: string | any) {
    console.log("displayMarker() START!!");
    console.log(data);

    const mapMarker = require("../../assets/default-marker.png"), // default 마커 이미지
      imageSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기
      imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션 - 마커의 좌표와 일치시킬 이미지 안에서의 좌표 설정

    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
    const markerImage = new window.kakao.maps.MarkerImage(
      mapMarker,
      imageSize,
      imageOption
    );

    const clickMapMarker = require("../../assets/click-marker.png"); // default 마커 이미지
    const clickMarkerImage = new window.kakao.maps.MarkerImage(
      clickMapMarker,
      imageSize,
      imageOption
    );

    // 마커를 생성하고 지도 표시
    const marker1 = new window.kakao.maps.Marker({
      map: this.map,
      position: new window.kakao.maps.LatLng(data.y, data.x),
      image: markerImage,
    });

    // 인포윈도우를 생성합니다
    this.infowindow = new window.kakao.maps.CustomOverlay({
      yAnchor: 1.7,
    });

    // 마커에 클릭이벤트 등록
    window.kakao.maps.event.addListener(marker1, "click", () => {
      console.log("clickMarker() START!!");
      console.log(data);
      // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
      // 마커의 이미지를 클릭 이미지로 변경
      if (!this.selectedMarker || this.selectedMarker !== marker1) {
        // 클릭된 마커 객체가 null이 아니면
        // 클릭된 마커의 이미지를 기본 이미지로 변경하고
        !!this.selectedMarker && this.selectedMarker.setImage(markerImage);

        // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경
        marker1.setImage(clickMarkerImage);
      }

      // 클릭된 마커를 현재 클릭된 마커 객체로 설정
      this.selectedMarker = marker1;

      // 마커를 클릭시, 장소명이 인포윈도우 표출
      this.infowindowContent = InfoWindowContent.makeInfoWindowContent(data);
      this.infowindow.setContent(this.infowindowContent);
      this.infowindow.setPosition(marker1.getPosition());

      this.infowindow.setMap(this.map);
    });
  }
}
