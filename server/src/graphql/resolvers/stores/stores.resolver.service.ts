import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { CheckInRepository } from '@repositories';
import { CheckInEntity } from '@/entities';
import { StoreObjectType } from './stores.object.type';

export interface IKakaoStore {
  id: number;
  x: string;
  y: string;
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
}

@Injectable()
export class StoreResolverService {
  private lunchTime = 13;

  constructor(private readonly checkInRepository: CheckInRepository) {}

  public getDate(isToday: boolean): string {
    let date = new Date();
    if (!isToday) {
      date = new Date(date.setDate(date.getDate() + 1));
    }
    const year = date.getFullYear();
    const yyyy = ('000' + year).slice(-4);
    const mm = ('0' + (date.getMonth() + 1)).slice(-2);
    const dd = ('0' + date.getDate()).slice(-2);
    return [yyyy, mm, dd].join('-');
  }

  public getCheckedInAt(): string {
    let checkedInAt = this.getDate(true);
    if (new Date().getHours() >= this.lunchTime) checkedInAt = this.getDate(false);

    return checkedInAt;
  }

  public async getVotedStoreUserEmailList(storeName: string): Promise<string[]> {
    const checkedInAt = this.getCheckedInAt();

    const votedStoreList = await this.checkInRepository.find({
      storeName,
      checkedInAt,
    });

    return votedStoreList.map((store) => store.email);
  }

  public async getStores(query: string | string[], size = 1): Promise<StoreObjectType[] | []> {
    const baseUrl = 'https://dapi.kakao.com/v2/local/search/keyword.json';
    const baseLocation = { x: 127.0539186, y: 37.5102134, radius: 1500 };
    const options = {
      headers: { Authorization: `KakaoAK ${process.env.KAKAO_KEY}` },
      params: {
        query,
        ...baseLocation,
        page: 1,
        size,
      },
    };
    const { data } = await axios.get<{ documents: IKakaoStore[] }>(baseUrl, options);
    const storeObjects: StoreObjectType[] = [];
    for (const store of data.documents.filter((v) => v.category_group_code == 'FD6')) {
      storeObjects.push(
        Object.assign(
          new StoreObjectType(),
          Object.entries(store).reduce((p, [k, v]) => {
            return {
              ...p,
              [k.replace(/(_\w)+/g, (m) => m.replace('_', '').toUpperCase())]: v,
            };
          }, {}),
        ),
      );
    }
    return storeObjects;
  }

  public async getVotedStores(): Promise<StoreObjectType[]> {
    const checkedInAt = this.getCheckedInAt();
    const votedStores = await this.checkInRepository.find({ checkedInAt });
    const votedStoresNameList: string[] = votedStores.map((store) => store.storeName);
    return votedStoresNameList.length > 0 ? this.getStores(votedStoresNameList, 15) : [];
  }

  public async addCheckIn(storeName: string, email: string): Promise<CheckInEntity> {
    const checkedInAt = this.getCheckedInAt();
    const isVoted = await this.checkInRepository.findOne({ email, checkedInAt });

    if (!isVoted) {
      return this.checkInRepository.save({
        storeName,
        email,
        checkedInAt,
      });
    } else {
      await this.checkInRepository.update(isVoted, { storeName });
      return this.checkInRepository.findOneOrFail({ id: isVoted.id, email: isVoted.email, checkedInAt });
    }
  }
}
