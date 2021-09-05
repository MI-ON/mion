import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { KakaoMapStore } from '@/types/kakaomap';

axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

export default class InfoWindowContent {
  public static async makeInfoWindowContent(data: KakaoMapStore): Promise<HTMLDivElement> {
    const infoWindowContainer = await this.drawInfoContent(data);
    return infoWindowContainer;
  }

  static async drawInfoContent(data: KakaoMapStore): Promise<HTMLDivElement> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { place_name, address_name, road_address_name, phone, place_url } = data;

    const infoContent = `
        <section class="infoContainer">
            <div class="titleContainer">${place_name}</div>
            <div class="bodyContainer">
                <div>${address_name}</div>
                <div>(지번) ${road_address_name}</div>
                <span>${phone}</span><a href='${place_url}'>상세보기</a>
            </div>
        </section>`;

    const voteBtn = document.createElement('button');
    voteBtn.type = 'button';
    voteBtn.classList.add('voteBtn');
    voteBtn.addEventListener('click', async () => {
      const vuex: string | null = localStorage.getItem('vuex');
      const userJWToken = vuex ? JSON.parse(vuex).userToken : '';

      const userTokenDecoded: { email: string } = jwt_decode(userJWToken);
      const userEmail = userTokenDecoded.email;

      await axios.post('/graphql', {
        query: `mutation {
          addCheckIn(storeName: "${place_name}", email: "${userEmail}") {
            id
          }
        }`,
      });
      alert(`${place_name}에 투표되었습니다!`);
    });
    voteBtn.innerHTML = '<img src="/img/vote-icon.png" />';

    const voteButtonContent = document.createElement('section');
    voteButtonContent.classList.add('voteButtonContainer');
    voteButtonContent.appendChild(voteBtn);

    const infoWindowContainer = document.createElement('div');
    infoWindowContainer.classList.add('infoWindowContainer');

    const topContentContainer = document.createElement('div');
    topContentContainer.classList.add('topContentContainer');

    topContentContainer.innerHTML = infoContent;
    topContentContainer.appendChild(voteButtonContent);

    const bottomContentContainer = document.createElement('div');
    bottomContentContainer.classList.add('bottomContentContainer');

    bottomContentContainer.innerHTML = await this.votedUserProfileContent(place_name);

    infoWindowContainer.appendChild(topContentContainer);
    infoWindowContainer.appendChild(bottomContentContainer);

    return infoWindowContainer;
  }

  static async votedUserProfileContent(storeName: string): Promise<string> {
    const response = await axios.post('/graphql', {
      query: `query {
        getVotedUsersByStoreName(storeName: "${storeName}") {
          avatarUrl
        }
      }`,
    });

    const votedUserImageList = await response.data.data.getVotedUsersByStoreName;
    const votedUserImageTags = votedUserImageList
      .map((user: { avatarUrl: string }, i: number) => {
        return i > 8 ? '' : `<img src='${user.avatarUrl}' key='${i}' />`;
      })
      .join('\n');
    const votedUserImageCount = votedUserImageList.length > 8 ? `<span>+${votedUserImageList.length - 8}</span>` : '';
    const votedUserProfileContent = `${votedUserImageTags}${votedUserImageCount}`;
    return votedUserProfileContent;
  }
}
