import App from "./App";
import "reflect-metadata";
import {createConnection} from "typeorm";

import { GraphQLServer } from "graphql-yoga";
import resolvers from "./graphql/resolvers";

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
    console.log("typeorm connect 🚀");
  })
  .catch((error) => console.log(error));