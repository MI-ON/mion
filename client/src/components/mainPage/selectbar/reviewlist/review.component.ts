import { gql } from 'apollo-boost';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { IPostObjectType, IStoreObjectType, ISubInfoObjectType, ISubInfo } from '@/types';

@Component({})
export default class ReviewComponent extends Vue {
  id: number | null = null;
  place_name: string | null = null;
  address_name: string | null = null;
  road_address_name: string | null = null;
  phone: string | null = null;
  r_count: number | null = null;
  rating: number | null = null;
  reviewKeyword: string | null = null;
  lists: ISubInfo[] = [];

  isSearch = false;

  /**
   * 키워드에 연관된 post 가져오기(db에서)
   * post 음식점 이름만 배열에 담기
   * post.storeName으로 정보 찾기 getStore로
   * 찾은 정보로 마커 만들기
   */

  //graphql에서 post에 storeName 가져오기
  async getPosts(keyword: string | null): Promise<string[]> {
    const respose = await this.$apollo.query<{ getPosts: IPostObjectType[] }>({
      query: gql`
        query ($keyword: String!) {
          getPosts(keyword: $keyword) {
            storeName
          }
        }
      `,
      variables: { keyword },
    });

    return respose.data.getPosts.map((data: IPostObjectType) => data.storeName);
  }

  async getStores(storeNames: string[]): Promise<IStoreObjectType[]> {
    try {
      const respose = await this.$apollo.query<{ getStore: IStoreObjectType[] }>({
        query: gql`
          query ($storeNames: [String]!) {
            getStores(storeNames: $storeNames) {
              addressName
              categoryGroupCode
              categoryGroupName
              categoryName
              id
              phone
              placeName
              placeUrl
              roadAddressName
              x
              y
            }
          }
        `,
        variables: { storeNames },
      });

      this.isSearch = true;
      return respose.data.getStore;
    } catch {
      alert('관련 리뷰가 존재하지 않습니다.');
      throw new Error('관련 리뷰가 존재하지 않습니다.');
    }
  }

  async getPostInfos(name: string): Promise<ISubInfoObjectType> {
    const respose = await this.$apollo.query<{ getSubinfo: ISubInfoObjectType }>({
      query: gql`
        query ($storeNames: String!) {
          getSubinfo(name: $storeNames) {
            count
            sum
          }
        }
      `,
      variables: {
        storeNames: name,
      },
    });
    return respose.data.getSubinfo;
  }

  createStar(rating: number): string {
    let result = '★'.repeat(Math.floor(rating));
    if (rating % 1 == 0.5) {
      result += '☆';
    }
    return result;
  }

  addLists(data: IStoreObjectType[]): void {
    data.forEach(async (d) => {
      const subinfo: ISubInfoObjectType = await this.getPostInfos(d.placeName);
      const item: ISubInfo = {
        ...subinfo,
        rCount: subinfo.count,
        rating: this.createStar(subinfo.sum / subinfo.count),
      };
      this.lists.push(item);
    });
  }

  async rkewordClick(): Promise<void> {
    const lists = document.querySelectorAll('.list');
    for (let i = 0; i < lists.length; i++) {
      lists[i].remove();
    }

    const storeNames: string[] = await this.getPosts(this.reviewKeyword);
    const sNames: string[] = [...new Set(storeNames)];
    const data: IStoreObjectType[] = await this.getStores(sNames);

    this.addLists(data);
    this.$emit('displayPlaces', data);
  }

  clickReview(event: MouseEvent, key: string): void {
    this.$emit('showWriteReview', key);
  }
}
