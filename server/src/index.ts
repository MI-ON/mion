import App from "./App";
import "reflect-metadata";


import {createConnection} from "typeorm";
import {User} from "./entity/User";

import { GraphQLServer } from "graphql-yoga";
import resolvers from "./graphql/resolvers";

import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const server = new GraphQLServer({
    typeDefs: "src/graphql/schema.graphql",
    resolvers
  });
server.start(()=>console.log("Graphql Server Running"));


createConnection().then(async connection  => {
    const app = new App().application;

    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });

    console.log("connect 🚀");
  })
  .catch((error) => console.log(error));