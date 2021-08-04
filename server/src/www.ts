import 'source-map-support/register'; // source-map을 사용하기 위해 추가함.
import App from './App';
import * as express from "express";
import { GraphQLServer } from "graphql-yoga";
import {resolvers} from "../graphql/resolvers";

const port: number = Number(process.env.PORT) || 3000;
const app: express.Application = new App().app;

app.listen(port, () => console.log(`Express server listening at ${port}`))
.on('error', err => console.error(err));

const server = new GraphQLServer({
    typeDefs: "graphql/schema.graphql",
    resolvers
})
//ts 코드로 변경해야함.

server.start(()=> console.log("Graphql Server Running"));