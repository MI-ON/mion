import { Component, Vue } from "vue-property-decorator";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

@Component({})
export default class MapComponent extends Vue {
  markers: any = [];
  listEl: string | any = "";
  menuEl: string | any = "";
  fragment: any = "";
  listStr: string = "";
  paginationEl: string | any = "";
  el: string | any = "";
  keyword: string = "";

  infowindow: string | any = "";
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

  mapMarker = require("../../../assets/mainPage/default-marker.png");
  clickMapMarker = require("../../../assets/mainPage/click-marker.png");

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

    // 장소 검색 객체 생성
    this.ps = new window.kakao.maps.services.Places();

    // 키워드로 장소 검색
    this.searchPlaces();
  }

  // 키워드 검색을 요청하는 함수입니다
  public searchPlaces() {
    this.keyword = (<HTMLInputElement>document.getElementById("keyword")).value;

    if (!this.keyword.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return false;
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    console.log(this.keyword);
    this.ps.keywordSearch(this.keyword, this.placesSearchCB);
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  public placesSearchCB(data: string, status: number, pagination: number) {
    if (status === window.kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커를 표출합니다
      this.displayPlaces(data);

      // 페이지 번호를 표출합니다
      this.displayPagination(pagination);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  }

  // 검색 결과 목록과 마커를 표출하는 함수입니다
  public displayPlaces(places: string | any) {
    this.listEl = document.getElementById("placesList");
    this.menuEl = document.getElementById("menu_wrap");
    this.fragment = document.createDocumentFragment();
    this.bounds = new window.kakao.maps.LatLngBounds();
    this.listStr;

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    this.removeAllChildNods(this.listEl);

    // 지도에 표시되고 있는 마커를 제거합니다
    this.removeMarker();

    for (let i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시합니다
      const placePosition = new window.kakao.maps.LatLng(
          places[i].y,
          places[i].x
        ),
        marker = this.addMarker(placePosition),
        itemEl = this.getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      this.bounds.extend(placePosition);

      // 마커와 검색결과 항목에 mouseover 했을때
      // 해당 장소에 인포윈도우에 장소명을 표시합니다
      // mouseout 했을 때는 인포윈도우를 닫습니다
      ((marker, title) => {
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
        });

        window.kakao.maps.event.addListener(marker, "mouseover", () => {
          this.displayInfowindow(marker, title);
        });

        window.kakao.maps.event.addListener(marker, "mouseout", () => {
          this.infowindow.close();
        });

        itemEl.onmouseover = () => {
          this.displayInfowindow(marker, title);
        };

        itemEl.onmouseout = () => {
          this.infowindow.close();
        };
      })(marker, places[i].place_name);

      this.fragment.appendChild(itemEl);
    }

    // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
    this.listEl.appendChild(this.fragment);
    this.menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    this.map.setBounds(this.bounds);
  }

  // 검색결과 항목을 Element로 반환하는 함수입니다
  public getListItem(index: number, places: string | any) {
    this.el = document.createElement("li");
    let itemStr =
      `<span class="markerbg marker_${index + 1}"></span>` +
      '<div class="info">' +
      `<spen class="title">${places.place_name}</spen>`;

    if (places.road_address_name) {
      itemStr +=
        `<span>${places.road_address_name}</span>` +
        `<span class="gray">${places.address_name}</span>`;
    } else {
      itemStr += `<span>${places.address_name}</span>`;
    }

    itemStr += `<span class="tel">${places.phone}</span>` + "</div>";

    this.el.innerHTML = itemStr;
    this.el.className = "item";

    return this.el;
  }

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
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

    marker.setMap(this.map); // 지도 위에 마커를 표출합니다
    this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
  }

  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  public removeMarker() {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
  public displayPagination(pagination: number | any) {
    this.paginationEl = document.getElementById("pagination");
    this.fragment = document.createDocumentFragment();
    let i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (this.paginationEl.hasChildNodes()) {
      this.paginationEl.removeChild(this.paginationEl.lastChild);
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
    this.paginationEl.appendChild(this.fragment);
  }

  // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
  // 인포윈도우에 장소명을 표시합니다
  public displayInfowindow(marker: string | any, title: string) {
    const iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 인포윈도우를 생성합니다
    this.infowindow = new window.kakao.maps.InfoWindow({
      removable: iwRemoveable,
    });

    const content = `<div style="padding:25px 10px 10px 10px;font-size:12px;z-index:1;">${title}</div>`;

    this.infowindow.setContent(content);
    this.infowindow.open(this.map, marker);
  }

  // 검색결과 목록의 자식 Element를 제거하는 함수입니다
  public removeAllChildNods(el: any) {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  }
}
