import "reflect-metadata";
import { createConnection } from "typeorm";
import { GraphQLServer } from "graphql-yoga";
import resolvers from "./graphql/resolvers";

const options = {
  port: 4000,
  endpoint: "/graphql",
  playground: "/playground",
};

createConnection()
  .then(async (connection) => {
    const server = new GraphQLServer({
      typeDefs: "src/graphql/schema.graphql",
      resolvers,
    });
    server.start(options, () => {
      console.log("Graphql Server listening on port %d 🚀", options.port);
    });
    server.express.listen(3000, () =>
      console.log("Express Server listening on port %d", 3000)
    );
  })
  .catch((error) => console.log(error));
