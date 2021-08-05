import { GraphQLScalarType, Kind } from "graphql";

export let stores = [
    {
        id: 1,
        address_name: "서울 용산구 이태원동 127-28",
        category_group_code: "FD6",
        category_group_name: "음식점",
        category_name: "음식점 > 한식 > 육류,고기" ,
        distance: "???",
        phone: "02-793-2268",
        place_name: "로우앤슬로우",
        place_url: "http://place.map.kakao.com/1376253571",
        road_address_name: "서울 용산구 보광로 126",
        x: "126.99421849699539",
        y: "37.53401162895581" 
    },
    {
        id: 2,
        address_name: "서울 용산구 이태원동 127-28",
        category_group_code: "FD6",
        category_group_name: "음식점",
        category_name: "음식점 > 한식 > 육류,고기" ,
        distance: "???",
        phone: "02-793-2268",
        place_name: "로우앤슬로우",
        place_url: "http://place.map.kakao.com/1376253571",
        road_address_name: "서울 용산구 보광로 126",
        x: "126.99421849699539",
        y: "37.53401162895581" 
    }
]

export let users = [
    {
        id:1,
        full_name:"Belle",
        image_url:"https/abc.test",
        email:"nayoon030303@gamil.com",
        toke:"abcde.test",
        token_exp:"edcba.test"
    }
]

export let posts = [
    {
        id:1,
        userToken:"abcde.test",
        text:"Good"
    }
]

export let food_lists = [
    {
        id:1,
        date:"2017-01-26",
        store_name: stores,
        members: users,
        reviews: posts
    }
]

export const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    console.log(value+"serialize입니다");
    return value; // date->json
  },
  parseValue(value) {
    console.log(value+"parseValue입니다");
    return new Date(value); // Convert incoming integer to Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10)); // Convert hard-coded AST string to integer and then to Date
    }
    return null; // Invalid hard-coded value (not an integer)
  },
});


export const getStores = () =>stores;
export const getUsers = () =>users;
export const getPosts = () =>posts;
export const getFoodList = () =>food_lists;