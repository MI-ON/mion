import {
    getUserByEmail,
    getStores,
    register,
    addCheckIn,
    getVotedUsersByStoreId,
    addFullName,
    getStore,
    getPosts,
    getSubInfo
} from './db';

const resolvers = {
    Query: {
        get_user_by_email: (_: any, { email }: any) => getUserByEmail(email),
        get_stores: (_: any, { keyword }: any) => getStores(keyword),
        get_voted_users_by_store_id: (_: any, { store_id }: any) =>
            getVotedUsersByStoreId(store_id),
        get_store:(_:any,{store_names}:any)=>getStore(store_names),
        get_posts:(_:any,{keyword}:any)=>getPosts(keyword),
        get_subinfo:(_:any,{name}:any) =>getSubInfo(name)
    },
    Mutation: {
        add_user: (_: any, { email, full_name, image_url }: any) =>
            register(email, full_name, image_url),
        add_check_in: (_: any, { store_id, email }: any) =>
            addCheckIn(store_id, email),
        add_full_name: (_: any, { email, full_name }: any) =>
            addFullName(email, full_name)
    }
};

export default resolvers;
