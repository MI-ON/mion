import {
  getUserByEmail,
  getStores,
  register,
  addCheckIn,
  getVotedUsersByStoreName,
  addFullName,
  getStore,
  getPosts,
  getVotedStores,
  addPost,
  deletePost,
  updatePost,
  getSubInfo,
} from "./db";

const resolvers = {
  Query: {
    get_user_by_email: (_: any, { email }: any) => getUserByEmail(email),
    get_stores: (_: any, { keyword }: any) => getStores(keyword),
    get_voted_users_by_store_name: (_: any, { store_name }: any) =>
      getVotedUsersByStoreName(store_name),
    get_store: (_: any, { store_names }: any) => getStore(store_names),
    get_posts: (_: any, { keyword }: any) => getPosts(keyword),
    get_voted_stores: (_: any) => getVotedStores(),
    get_subinfo: (_: any, { name }: any) => getSubInfo(name),
  },
  Mutation: {
    add_user: (_: any, { email, full_name, image_url }: any) =>
      register(email, full_name, image_url),
    add_check_in: (_: any, { store_name, email }: any) =>
      addCheckIn(store_name, email),
    add_full_name: (_: any, { email, full_name }: any) =>
      addFullName(email, full_name),
    add_post: (
      _: any,
      { store_name, category_name, email, content, rating }: any
    ) => addPost(store_name, category_name, email, content, rating),
    delete_post: (_: any, { id }: any) => deletePost(id),
    update_post: (_: any, { id, content, rating }) => {
      updatePost(id, content, rating);
    },
  },
};

export default resolvers;
