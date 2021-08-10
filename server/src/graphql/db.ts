import { GraphQLScalarType, Kind } from "graphql";
import { User } from "../entity/User";

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

export const register = async (
  email: string,
  fullName: string,
  imageUrl: string
) =>
  User.create({
    email: email,
    full_name: fullName,
    image_url: imageUrl,
  }).save();
