import "reflect-metadata";
import {createConnection} from "typeorm";
import { GraphQLServer } from "graphql-yoga";
import App from "./App";
import resolvers from "./graphql/resolvers";
import connectionOptions from "../ormconfig";

createConnection(connectionOptions).then(async connection  => {
  const server = new GraphQLServer({
    typeDefs: "src/graphql/schema.graphql",
    resolvers,
  });
  server.start({ port: 3000 }, (options) => {
    console.log("Server listening on port %d 🚀", options.port)
    new App(server, connection); // TODO check this setting if nessecary
  });
})
.catch((error) => console.log(error));
