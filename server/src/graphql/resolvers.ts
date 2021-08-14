import {
  getUserByEmail,
  getStores,
  register,
  getVotedUsersByStoreId,
} from "./db";

const resolvers = {
  Query: {
    get_user_by_email: (_: any, { email }: any) => getUserByEmail(email),
    get_stores: (_: any, { keyword }: any) => getStores(keyword),
    get_voted_users_by_store_id: (_: any, { store_id }: any) =>
      getVotedUsersByStoreId(store_id),
  },
  Mutation: {
    add_user: (_: any, { email, full_name, image_url }: any) =>
      register(email, full_name, image_url),
  },
};

export default resolvers;
