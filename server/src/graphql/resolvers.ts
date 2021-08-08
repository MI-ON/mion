import { getStores,getFoodList,getPosts,getUsers } from "./db";
import { dateScalar } from "./db";

const resolvers = {
    Date: dateScalar,
    Query:{
        stores:()=>getStores(),
        users:()=>getUsers(),
        posts:()=>getPosts(),
        food_list:()=>getFoodList(),
    }
}

export default resolvers;