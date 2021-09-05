import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import InfoWindowContent from '../infowindow/info-window-content';
import WriteReivewComponent from '../selectbar/writereview/writereview.component.vue';
import ReviewListComponent from '../selectbar/reviewlist/review.component.vue';
import SearchPlaceComponent from '../selectbar/searchplace/searchplace.component.vue';
import VoteComponent from '../selectbar/vote/vote.component.vue';
import AlertComponent from '../../Alert/alert.component.vue';
import WriteReviewComponent from '../selectbar/writereview/writereview.component.vue';
import {
  IKakaoMap,
  KakaoMap,
  KakaoMapCustomOverlay,
  KakaoMapLatLng,
  KakaoMapMarker,
  KakaoMapPagination,
  KakaoMapServicesPlaces,
  KakaoMapServicesStatusEnum,
  KakaoMapStore,
} from '@/types/kakaomap';

declare global {
  interface Window {
    kakao: {
      maps: IKakaoMap;
    };
  }
}

@Component({
  components: {
    SearchPlaceComponent,
    ReviewListComponent,
    VoteComponent,
    WriteReviewComponent,
    AlertComponent,
  },
})
export default class MapComponent extends Vue {
  @Watch('keyword')
  updateKeyword(): void {
    const options = {
      location: new window.kakao.maps.LatLng(37.5102134, 127.0539186),
      radius: 1500,
    };
    this.ps && this.ps.keywordSearch(this.keyword, this.placesSearchCB, options);
  }

  markers: KakaoMapMarker[] = [];
  marker?: KakaoMapMarker;
  map?: KakaoMap;
  keyword = '';
  storeName = '';

  fragment?: DocumentFragment;
  infowindow?: KakaoMapCustomOverlay;
  ps?: KakaoMapServicesPlaces;
  el?: HTMLAnchorElement;
  selectedMarker: KakaoMapMarker | null = null;

  isSearchPlace = true;
  isReview = false;
  isWriteReview = false;
  isVote = false;
  isMenu = true;
  clickBtns: NodeListOf<HTMLParagraphElement> | null = null;

  mapMarker = '/img/map/default-marker.png';
  clickMapMarker = '/img/mainPage/click-marker.png';

  searchResultData = '';
  alertMessage = '';
  mounted(): void {
    this.openMap();
  }

  showReview(): void {
    this.isSearchPlace = false;
    this.isReview = true;
    this.isVote = false;
    this.isWriteReview = false;
  }

  public showWriteReview(name: string): void {
    this.isSearchPlace = false;
    this.isReview = false;
    this.isVote = false;

    this.isWriteReview = true;
    this.storeName = name;
  }

  public eventFromSearchplace(keyword: string): void {
    this.keyword = keyword;
  }

  public sideMenuState(): void {
    this.isMenu = !this.isMenu;
  }
  public clickSelectbar(event: MouseEvent): void {
    // 클릭 표시 삭제
    this.clickBtns = document.querySelectorAll('.on');
    this.clickBtns.forEach((btn) => {
      btn.classList.remove('on');
    });
    this.isSearchPlace = false;
    this.isReview = false;
    this.isVote = false;

    const target = event.target as HTMLParagraphElement | null;
    if (target) {
      target.classList.add('on');

      if (target.id == 'search-btn') {
        this.isSearchPlace = true;
        this.ps && this.ps.keywordSearch('삼성역 맛집', this.placesSearchCB);
      } else if (target.id == 'review-btn') this.isReview = true;
      else if (target.id == 'vote-btn') this.isVote = true;
    }
  }

  public openMap(): void {
    // 마커를 클릭하면 장소명을 표출할 인포윈도우
    this.infowindow = new window.kakao.maps.CustomOverlay({ zIndex: 1 });

    // 지도를 표시할 div
    const mapContainer = document.getElementById('map') as HTMLDivElement;
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.5102134, 127.0539186), // 지도의 중심좌표
      level: 4, // 지도의 확대 레벨
    };

    // 지도 생성
    this.map = new window.kakao.maps.Map(mapContainer, mapOption);
    this.ps = new window.kakao.maps.services.Places();
    this.ps.keywordSearch('삼성역 맛집', this.placesSearchCB);
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수
  public placesSearchCB(
    data: KakaoMapStore[],
    status: KakaoMapServicesStatusEnum,
    pagination: KakaoMapPagination,
  ): void {
    data = data.filter((d) => d.category_group_code === 'FD6');
    if (data.length === 0) {
      // 검색어가 음식점이 아닌 다른 장소를 입력할 경우
      this.alertMessage = '음식점이 아닌 장소를 입력하셨습니다.';
      setTimeout(() => {
        location.reload();
      }, 4000);
    } else if (status === window.kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커 표출
      this.displayPlaces(data);
      // 페이지 번호 표출
      this.displayPagination(pagination);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert('검색 결과가 존재하지 않습니다.');
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert('검색 결과 중 오류가 발생했습니다.');
    }
  }

  // 검색 결과 목록과 마커를 표출하는 함수
  public displayPlaces(places: KakaoMapStore[]): void {
    this.searchResultData = Object.assign({}, this.searchResultData, places);

    this.fragment = document.createDocumentFragment();
    const bounds = new window.kakao.maps.LatLngBounds();

    // 검색 결과 목록에 추가된 항목들 제거

    // 지도에 표시되고 있는 마커 제거
    this.removeMarker();

    for (let i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시
      const placePosition = new window.kakao.maps.LatLng(places[i].y, places[i].x),
        marker = this.addMarker(placePosition);

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위해
      // LatLngBounds 객체에 좌표 추가
      bounds.extend(placePosition);

      // 마커와 검색 결과 항목에 mouseover 했을 때
      // 해당 장소에 인포윈도우에 장소명 표시
      // mouseout 했을 때는 인포윈도우를 닫습니다
      ((marker, place): void => {
        window.kakao.maps.event.addListener(marker, 'click', async () => {
          const imageSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기
            imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션 - 마커의 좌표와 일치시킬 이미지 안에서의 좌표 설정

          // 마커의 이미지정보를 가지고 있는 마커이미지를 생성
          const markerImage = new window.kakao.maps.MarkerImage(this.mapMarker, imageSize, imageOption);

          const clickMarkerImage = new window.kakao.maps.MarkerImage(this.clickMapMarker, imageSize, imageOption);

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

          this.infowindow && this.infowindow.setMap(null);
          await this.displayInfowindow(marker, place);
        });

        if (this.map) {
          window.kakao.maps.event.addListener(this.map, 'click', () => {
            this.infowindow && this.infowindow.setMap(null);
          });
        }
      })(marker, places[i]);
    }

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정
    //this.map.setBounds(bounds);
  }

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수
  public addMarker(position: KakaoMapLatLng): KakaoMapMarker {
    const mapMarker = this.mapMarker, // default 마커 이미지
      imageSize = new window.kakao.maps.Size(64, 69), // 마커이미지의 크기
      imageOption = { offset: new window.kakao.maps.Point(27, 69) }; // 마커이미지의 옵션 - 마커의 좌표와 일치시킬 이미지 안에서의 좌표 설정

    const markerImage = new window.kakao.maps.MarkerImage(mapMarker, imageSize, imageOption);
    const marker = new window.kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage,
    });

    this.map && marker.setMap(this.map); // 지도 위에 마커 표출
    this.markers.push(marker); // 배열에 생성된 마커 추가

    return marker;
  }

  // 지도 위에 표시되고 있는 마커 모두 제거
  public removeMarker(): void {
    for (let i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  }

  // 검색결과 목록 하단에 페이지번호를 표시하는 함수
  public displayPagination(pagination: KakaoMapPagination): void {
    const paginationEl = document.getElementById('pagination') as HTMLDivElement | null;
    if (!paginationEl) {
      return;
    }
    this.fragment = document.createDocumentFragment();
    let i;

    // 기존에 추가된 페이지번호 삭제
    while (paginationEl.hasChildNodes()) {
      paginationEl.lastChild && paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
      this.el = document.createElement('a');
      this.el.href = '#';
      this.el.innerHTML = `${i}`;

      if (i === pagination.current) {
        this.el.className = 'on';
      } else {
        this.el.onclick = ((i) => (): void => {
          pagination.gotoPage(i);
        })(i);
      }

      this.fragment.appendChild(this.el);
    }
    paginationEl.appendChild(this.fragment);
  }

  // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수
  // 인포윈도우에 장소명 표시
  public async displayInfowindow(marker: KakaoMapMarker, place: KakaoMapStore): Promise<void> {
    // 인포윈도우 생성 (커스텀 오버레이)
    this.infowindow = new window.kakao.maps.CustomOverlay({
      clickable: true,
      zIndex: 999,
      yAnchor: 1.5,
    });

    const content = await InfoWindowContent.makeInfoWindowContent(place);

    this.infowindow.setContent(content);
    this.infowindow.setPosition(marker.getPosition());
    this.infowindow.setMap(this.map);
  }
}
