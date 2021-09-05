/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
interface Constructable<T> {
  new (...args: any): T;
}
export interface IKakaoMap {
  event: {
    addListener: (target: KakaoMap | KakaoMapMarker, type: string, handler: () => any) => void;
  };
  services: KakaoMapServices;
  CustomOverlay: Constructable<KakaoMapCustomOverlay>;
  LatLng: Constructable<KakaoMapLatLng>;
  LatLngBounds: Constructable<KakaoMapLatLngBounds>;
  Map: Constructable<KakaoMap>;
  Marker: Constructable<KakaoMapMarker>;
  MarkerImage: Constructable<KakaoMapMarkerImage>;
  Point: Constructable<KakaoMapPoint>;
  Size: Constructable<KakaoMapSize>;
}

export declare class KakaoMapLatLng {
  constructor(latitude: number, longitude: number);
  getLat(): number;
  getLng(): number;
  equals(): boolean;
  toString(): string;
  toCoords(): any;
}

export declare class KakaoMapLatLngBounds {
  constructor(latitude: number, longitude: number);
  equals(): any;
  toString(): any;
  getSouthWest(): any;
  getNorthEast(): any;
  isEmpty(): any;
  extend(latlng: KakaoMapLatLng): any;
  contain(): any;
}

export interface KakaoMap {}

interface KakaoMapCustomOverlayOptions {
  map: KakaoMap;
  clickable: true;
  content: string;
  position: KakaoMapLatLng;
  xAnchor: number;
  yAnchor: number;
  zIndex: number;
}

export declare class KakaoMapCustomOverlay {
  constructor(options: KakaoMapCustomOverlayOptions);
  setMap(map?: KakaoMap | null): any;
  getMap(): any;
  setPosition(pos: KakaoMapLatLng): any;
  getPosition(): KakaoMapLatLng;
  setContent(content: string | HTMLDivElement): any;
  getContent(): any;
  setVisible(): any;
  getVisible(): any;
  setZIndex(): any;
  getZIndex(): any;
  setAltitude(): any;
  getAltitude(): any;
  setRange(): any;
  getRange(): any;
}

export enum KakaoMapServicesStatusEnum {
  OK = 'OK',
  ZERO_RESULT = 'ZERO_RESULT',
  ERROR = 'ERROR',
}
export enum KakaoMapServicesSortByEnum {
  ACCURACY = 'ACCURACY',
  DISTANCE = 'DISTANCE',
}

interface KakaoMapServices {
  Status: typeof KakaoMapServicesStatusEnum;
  Places: Constructable<KakaoMapServicesPlaces>;
  SortBy: typeof KakaoMapServicesSortByEnum;
}

interface KakaoMapServicesPlacesKeywordSearchOption {
  category_group_code?: string;
  location?: KakaoMapLatLng;
  x?: number;
  y?: number;
  radius?: number;
  bounds?: KakaoMapLatLngBounds;
  rect?: string;
  size?: number;
  page?: number;
  sort?: KakaoMapServicesSortByEnum;
  useMapCenter?: boolean;
  useMapBounds?: boolean;
}

export declare class KakaoMapServicesPlaces {
  constructor(map?: KakaoMap[]);
  setMap(map: KakaoMap): any;
  keywordSearch(
    keyword: string,
    callback: (data: KakaoMapStore[], status: KakaoMapServicesStatusEnum, pagination: KakaoMapPagination) => any,
    options?: KakaoMapServicesPlacesKeywordSearchOption,
  ): any;
  categorySearch(): any;
}

interface KakaoMapMarkerOptions {
  map: KakaoMap;
  position: KakaoMapLatLng;
  image: KakaoMapMarkerImage;
  title: string;
  draggable: boolean;
  clickable: boolean;
  zIndex: number;
  opacity: number;
  altitude: number;
  range: number;
}

export declare class KakaoMapMarker {
  constructor(options?: KakaoMapMarkerOptions);
  setMap(map?: KakaoMap | null): any;
  getMap(): any;
  setImage: any;
  getImage: any;
  setPosition: any;
  getPosition: any;
  setZIndex: any;
  getZIndex: any;
  setVisible: any;
  getVisible: any;
  setTitle: any;
  getTitle: any;
  setDraggable: any;
  getDraggable: any;
  setClickable: any;
  getClickable: any;
  setAltitude: any;
  getAltitude: any;
  setRange: any;
  getRange: any;
  setOpacity: any;
  getOpacity: any;
}

export declare class KakaoMapMarkerImage {
  constructor(src: string, size: KakaoMapSize, options?: any);
}

export declare class KakaoMapSize {
  constructor(width: number, height: number);
  equals(): any;
  toString(): any;
}

export declare class KakaoMapPoint {
  constructor(x: number, y: number);
  equals(): any;
  toString(): any;
}

export interface KakaoMapStore {
  id: string;
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export declare class KakaoMapPagination {
  current: number;
  first: number;
  last: number;
  totalCount: number;
  perPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;

  nextPage(): void;
  prevPage(): void;
  gotoPage(page: number): void;
  gotoFirst(): void;
  gotoLast(): void;
}
