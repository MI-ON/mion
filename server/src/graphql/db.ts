import { User } from "../entity/User";
import { CheckIN } from "../entity/CheckIN";
import axios from "axios";

const getDate = (isToday: boolean) => {
  let date = new Date();
  if (!isToday) {
    date = new Date(date.setDate(date.getDate() + 1));
  }
  const formatDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  return formatDate;
};

const getCreatedAt = () => {
  let createdAt = getDate(true);
  if (new Date().getHours() >= 12) createdAt = getDate(false);

  return createdAt;
};

const getVotedStoreUserEmailList = async (storeId: string) => {
  const createdAt = getCreatedAt();

  const votedStoreList = await CheckIN.find({
    store_id: storeId,
    created_at: createdAt,
  });

  return votedStoreList.map((store) => store.email);
};

const isUserVoted = async (email: string): Promise<CheckIN | undefined> => {
  const createdAt = getCreatedAt();

  return await CheckIN.findOne({
    email: email,
    created_at: createdAt,
  });
};

export const getUserByEmail = async (email: string) =>
  await User.findOne({ email: email });

export const register = async (
  email: string,
  fullName: string,
  imageUrl: string
) =>
  User.create({
    email: email,
    full_name: fullName,
    image_url: imageUrl,
  }).save();

export const getStores = async (keyword: string) => {
  const API_URL = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&category_group_code=FD6&x=127.0539186&y=37.5102134&radius=1500&page=1&size=15`;
  const encode_url = encodeURI(API_URL);
  const config = {
    headers: { Authorization: "KakaoAK 09ac1344a889f2bc246f8f42f147b6e1" },
  };

  const stores = await axios.get(encode_url, config);
  return stores.data.documents;
};

export const addCheckIn = async (storeId: string, email: string) => {
  const createdAt = getCreatedAt();
  const isVoted = await isUserVoted(email);

  if (!isVoted) {
    return CheckIN.create({
      store_id: storeId,
      email: email,
      created_at: createdAt,
    }).save();
  } else {
    await CheckIN.update(isVoted, { store_id: storeId });
    return CheckIN.findOne({ email: email, created_at: createdAt });
  }
};

export const getVotedUsersByStoreId = async (storeId: string) => {
  const emailList: Array<string> = await getVotedStoreUserEmailList(storeId);

  const userList = emailList.map(async (email) => {
    return await User.findOne({ email: email });
  });

  return userList;
};
