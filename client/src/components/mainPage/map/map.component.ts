import { Component, Vue } from "vue-property-decorator";
import InfoWindowContent from "../infowindow/info-window-content";
import List from '@/components/mainPage/list/list.component.vue'


declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}



@Component({
  components:{
    List,
  }
})
export default class MapComponent extends Vue {
  
  markers: any = [];
  marker: any = "";
  map: any = "";

  fragment: any = "";
  infowindow: any = "";
  ps: any = "";
  el: any = "";
  selectedMarker: any = null;


  mapMarker = require("../../../assets/mainPage/default-marker.png");
  clickMapMarker = require("../../../assets/mainPage/click-marker.png");

  mounted() {
    this.openMap();

  }

  public openMap() {
    console.log("openMap()");

    // 마커를 클릭하면 장소명을 표출할 인포윈도우
    this.infowindow = new window.kakao.maps.CustomOverlay({ zIndex: 1 });

    // 지도를 표시할 div
    const mapContainer = document.getElementById("map") as HTMLDivElement;
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.5102134, 127.0539186), // 지도의 중심좌표
      level: 5, // 지도의 확대 레벨
    };

    // 지도 생성
    this.map = new window.kakao.maps.Map(mapContainer, mapOption);

    // 장소 검색 객체 생성
    this.ps = new window.kakao.maps.services.Places();

    // 키워드로 장소 검색
    this.searchPlaces();
  }

  // 키워드 검색을 요청하는 함수
  public searchPlaces() {
    const options = {
      location: new window.kakao.maps.LatLng(37.5102134, 127.0539186),
      radius: 1500,
    };

    const keyword = (<HTMLInputElement>document.getElementById("keyword")).value;

    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색 요청
    console.log(keyword);
    this.ps.keywordSearch(keyword, this.placesSearchCB, options);
  }
  
  // 장소검색이 완료됐을 때 호출되는 콜백함수
  public placesSearchCB(
    data: string,
    status: number,
    pagination: number
  ) {
    if (status === window.kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커 표출
      this.displayPlaces(data);
      console.log(data);
      // 페이지 번호 표출
      this.displayPagination(pagination);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  }

  // 검색 결과 목록과 마커를 표출하는 함수
  public displayPlaces(places: any) {
    const listEl = document.getElementById("placesList") as HTMLDivElement;
    const menuEl = document.getElementById("menu_wrap") as HTMLDivElement;
    this.fragment = document.createDocumentFragment();
    const bounds = new window.kakao.maps.LatLngBounds();

    // 검색 결과 목록에 추가된 항목들 제거
    this.removeAllChildNods(listEl);

    // 지도에 표시되고 있는 마커 제거
    this.removeMarker();

    for (let i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시
      const placePosition = new window.kakao.maps.LatLng(
          places[i].y,
          places[i].x
        ),
        marker = this.addMarker(placePosition),
        itemEl = this.getListItem(i, places[i]); // 검색 결과 항목 Element를 생성

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해
      // LatLngBounds 객체에 좌표 추가
      bounds.extend(placePosition);

      // 마커와 검색 결과 항목에 mouseover 했을 때
      // 해당 장소에 인포윈도우에 장소명 표시
      // mouseout 했을 때는 인포윈도우를 닫습니다
      ((marker, places) => {
        window.kakao.maps.event.addListener(marker, "click", () => {
          const imageSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기
            imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션 - 마커의 좌표와 일치시킬 이미지 안에서의 좌표 설정

          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
          const markerImage = new window.kakao.maps.MarkerImage(
            this.mapMarker,
            imageSize,
            imageOption
          );

          const clickMarkerImage = new window.kakao.maps.MarkerImage(
            this.clickMapMarker,
            imageSize,
            imageOption
          );

          // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면
          // 마커의 이미지를 클릭 이미지로 변경
          if (!this.selectedMarker || this.selectedMarker !== marker) {
            // 클릭된 마커 객체가 null이 아니면
            // 클릭된 마커의 이미지를 기본 이미지로 변경하고
            !!this.selectedMarker && this.selectedMarker.setImage(markerImage);

            // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경
            marker.setImage(clickMarkerImage);
          }

          // 클릭된 마커를 현재 클릭된 마커 객체로 설정
          this.selectedMarker = marker;
          
          this.infowindow.setMap(null);
          this.displayInfowindow(marker, places);
        });

        itemEl.onclick = () => {
          this.infowindow.setMap(null);
          this.displayInfowindow(marker, places);
        };

        window.kakao.maps.event.addListener(this.map, "click", () => {
          this.infowindow.setMap(null);
        });
      })(marker, places[i]);

      this.fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가
    listEl.appendChild(this.fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정
    this.map.setBounds(bounds);
  }

  // 검색결과 항목을 Element로 반환하는 함수
  public getListItem(index: number, places: any) {
    this.el = document.createElement("li");
    let itemStr =
      `<span class="markerbg marker_${index + 1}"></span>` +
      '<div class="item">' +
      '<div class="info">' +
      `<spen class="title">${places.place_name}</spen>`;

    itemStr+='<div class="sub-info">'
    if (places.road_address_name) {
      itemStr +=
        `<span class="road">${places.road_address_name}</span>` +
        `<span class="gray">${places.address_name}</span>`;
    } else {
      itemStr += `<span>${places.address_name}</span>`;
    }

    itemStr += `<span class="tel">${places.phone}</span>` + "</div></div></div>";

    this.el.innerHTML = itemStr;
    
    return this.el;
  }

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수
  public addMarker(position: string) {
    const mapMarker = require("../../../assets/mainPage/default-marker.png"), // default 마커 이미지
      imageSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기
      imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션 - 마커의 좌표와 일치시킬 이미지 안에서의 좌표 설정

    const markerImage = new window.kakao.maps.MarkerImage(
        mapMarker,
        imageSize,
        imageOption
      ),
      marker = new window.kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
      });

    marker.setMap(this.map); // 지도 위에 마커 표출
    this.markers.push(marker); // 배열에 생성된 마커 추가

    return marker;
  }

  // 지도 위에 표시되고 있는 마커 모두 제거
  public removeMarker() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  // 검색결과 목록 하단에 페이지번호를 표시하는 함수
  public displayPagination(pagination: any) {
    const paginationEl = document.getElementById("pagination") as HTMLDivElement | any;
    this.fragment = document.createDocumentFragment();
    let i;

    // 기존에 추가된 페이지번호 삭제
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
      this.el = document.createElement("a");
      this.el.href = "#";
      this.el.innerHTML = i;

      if (i === pagination.current) {
        this.el.className = "on";
      } else {
        this.el.onclick = (function(i) {
          return function() {
            pagination.gotoPage(i);
          };
        })(i);
      }

      this.fragment.appendChild(this.el);
    }
    paginationEl.appendChild(this.fragment);
  }

  // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
  // 인포윈도우에 장소명 표시
  public displayInfowindow(marker: any, places: any) {
    // 인포윈도우 생성 (커스텀 오버레이)
    this.infowindow = new window.kakao.maps.CustomOverlay({
      yAnchor: 1.5,
    });

    const content = InfoWindowContent.makeInfoWindowContent(places);

    this.infowindow.setContent(content);
    this.infowindow.setPosition(marker.getPosition());
    this.infowindow.setMap(this.map);
  }

  // 검색결과 목록의 자식 Element를 제거하는 함수
  public removeAllChildNods(el: any) {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  }

}


