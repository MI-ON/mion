import { getUserByEmail } from "./db";
import { dateScalar } from "./db";

const resolvers = {
  Date: dateScalar,
  Query: {
    get_user_by_email: (_: any, { email }: any) => getUserByEmail(email),
  },
};

export default resolvers;
