import { getStores } from "./db";

const resolvers = {
    Query:{
        stores:()=>getStores()
    }
}

export default resolvers;