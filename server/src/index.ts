import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { GraphQLServer } from 'graphql-yoga';
import resolvers from './graphql/resolvers';
import connectionOptions from '../ormconfig';
import { Post } from './entity/Post';

const options = {
    port: 3000,
    endpoint: '/graphql',
    playground: '/playground'
};

createConnection(connectionOptions)
    .then(async (connection) => {
        const server = new GraphQLServer({
            typeDefs: 'src/graphql/schema.graphql',
            resolvers
        });
        server.start(options, () => {
            console.log('Graphql Server listening on port %d 🚀', options.port);
        });
        server.express.get('/graphql', (req, res) => {
            res.send('Graphql Server listening!!');
        });
    })
    .catch((error) => console.log(error));
