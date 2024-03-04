// const { ApolloServer } = require('apollo-server-express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv/config');
// const cors = require('cors');
// const express = require('express');

// const typeDefs = require('./graphql/typeDefs');
// const resolvers = require('./graphql/resolvers');
// const userTypedef = require('./graphql/userTypeDefs');
// const userResolvers = require('./graphql/userResolvers');
// const messageTypeDefs = require('./graphql/messageTypeDefs');
// const messageResolvers = require('./graphql/messageResolvers');

// const app = express();
/* DEPRICATED */
// const server = new ApolloServer({
//   typeDefs: [typeDefs, userTypedef, messageTypeDefs],
//   resolvers: [resolvers, userResolvers, messageResolvers],
// });

// async function startServer() {
//   await server.start(); // connect to apollo server
/* DEPRICATED */
//   server.applyMiddleware({ app });
/* DEPRICATED */
//   app.use(cors());
/* DEPRICATED */
//   mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//       console.log("Connected to MongoDB");
//       app.listen({ port: process.env.PORT || 5000 }, () => {
//         console.log(`server listening at http://localhost:${process.env.PORT || 5000}${server.graphqlPath}`);
//       });
//     })
//     .catch(err => {
//       console.error('Error:', err.message);
//     });
// }

// startServer(); 
/* DEPRICATED */