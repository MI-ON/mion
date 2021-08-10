import { getUserByEmail,getStores } from "./db";
import { dateScalar } from "./db";

const resolvers = {
  Date: dateScalar,
  Query: {
    get_user_by_email: (_: any, { email }: any) => getUserByEmail(email),
    get_stores:(_:any,{ keyword }: any) => getStores(keyword)
  },
};

export default resolvers;
