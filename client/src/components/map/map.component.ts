import { Component, Vue } from "vue-property-decorator";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

@Component({})
export default class MapComponent extends Vue {
  infowindow:string | any = "";
  mapContainer:string | any =  "";
  map:string | any = "";
  ps:string | any = "";
  mapOption:string | any = "";
  zoomControl:string | any = "";
  marker:string | any = "";
  place:string | any = "";
  bounds:string | any = "";
  search:string | any = "";

  mounted() {
    this.openKakakoMap()
  }
  
  public openKakakoMap() {
    console.log( "openKakakoMap()")

    // 마{커를 클릭하면 장소명을 표출할 인포윈도우
    this.infowindow = new window.kakao.maps.InfoWindow({zIndex: 1});

    // 지도를 표시할 div
    this.mapContainer = document.getElementById('map')
    this.mapOption = {
            center: new window.kakao.maps.LatLng(37.5102134, 127.0539186), // 지도의 중심좌표
            level: 5 // 지도의 확대 레벨
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
    this.ps.keywordSearch('삼성동 152-29 맛집', this.placesSearchCB);
  }

  public changeSearch() {
    console.log( 'changeSearch() START!! : ' + this.search )

    this.ps.keywordSearch(this.search, this.placesSearchCB);
  }

  public placesSearchCB(data: string | any, status: number) {
      console.log( 'placesSearchCB() START!!')

      if (status === window.kakao.maps.services.Status.OK) {

          // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
          // LatLngBounds 객체에 좌표 추가
          this.bounds = new window.kakao.maps.LatLngBounds();

          for (let i = 0; i < data.length; i++) {
              console.log( 'data[i] : ' )
              console.log( data[i] )

              this.displayMarker(data[i]);
              this.bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
          }

          // 검색된 장소 위치를 기준으로 지도 범위 재설정
          this.map.setBounds(this.bounds);
      }
  }

  public displayMarker(data: string | any) {
    console.log( 'displayMarker() START!!' )
    console.log(data)

    // 마커를 생성하고 지도 표시
    const marker1 = new window.kakao.maps.Marker({
        map: this.map,
        position: new window.kakao.maps.LatLng(data.y, data.x)
    });

    // 마커에 클릭이벤트 등록
    window.kakao.maps.event.addListener(marker1, 'click', () => {
        console.log( 'clickMarker() START!!')
        console.log( data )

        // 마커를 클릭하면 장소명이 인포윈도우 표출
        this.infowindow.setContent('<div style="padding:5px;font-size:12px;">' + data.place_name + '</div>');
        this.infowindow.open(this.map, marker1);
    });
  }
}
