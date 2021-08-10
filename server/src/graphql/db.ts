import { GraphQLScalarType, Kind } from "graphql";
import { User } from "../entity/User";
import axios from "axios";

export const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date custom scalar type",
  serialize(value) {
    console.log(value + "serialize입니다");
    return value; // date->json
  },
  parseValue(value) {
    console.log(value + "parseValue입니다");
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});

export const getUserByEmail = async (email: string) => 
  await User.findOne({ email: email });


export const getStores = async(keyword:string)=>{
  
  const API_URL = `https://dapi.kakao.com/v2/local/search/keyword.json?query=${keyword}&x=127.0539186&y=37.5102134&radius=1500&page=1&size=15`;
  const encode_url = encodeURI(API_URL);
  const config = {
    headers: { Authorization: "KakaoAK 09ac1344a889f2bc246f8f42f147b6e1"}
  };
  
  const stores = await axios.get(encode_url, config);
  //console.log(stores.data.documents);
  return stores.data.documents;

}

//* This is test code 
// getStores("떡볶이").then((result)=>{
//   console.log(result);
// });



