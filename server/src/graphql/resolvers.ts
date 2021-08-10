import { getUserByEmail, register } from "./db";
import { dateScalar } from "./db";

const resolvers = {
  Date: dateScalar,
  Query: {
    get_user_by_email: (_: any, { email }: any) => getUserByEmail(email),
  },
  Mutation: {
    add_user: (_: any, { email, full_name, image_url }: any) =>
      register(email, full_name, image_url),
  },
};

export default resolvers;
