const {ApolloServer} = require('apollo-server');
const mongoose  = require('mongoose');
const dotenv = require('dotenv/config')

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');


const server = new ApolloServer({
    typeDefs,
    resolvers
})
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