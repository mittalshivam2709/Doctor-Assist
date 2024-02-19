const {ApolloServer, gql} = require('apollo-server');
const mongoose  = require('mongoose');
const dotenv = require('dotenv/config')

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const userTypedef = require('./graphql/userTypeDefs');
const userResolvers = require('./graphql/userResolvers')


const allDefs = gql`
    ${typeDefs}
    ${userTypedef}
`
const allResolvers = {
    ...resolvers,
    ...userResolvers
}

const server = new ApolloServer({
    typeDefs: [typeDefs, userTypedef],
    resolvers: [resolvers, userResolvers]
  });

mongoose.connect(process.env.MONGO_URI) 
    .then(() => {
        console.log("Connected to MongoDB");
        return server.listen({ port: process.env.PORT || 3000 }); // Use environment variable for port, with a default of 3000
    })
    .then(({ url }) => {
        console.log(`Server ready at ${url}`);
    })
    .catch(err => {
        console.error('Error :', err.message);
    });