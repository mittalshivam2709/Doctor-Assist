const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv/config');
const cors = require('cors');
const express = require('express');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const userTypedef = require('./graphql/userTypeDefs');
const userResolvers = require('./graphql/userResolvers');
const messageTypeDefs = require('./graphql/messageTypeDefs');
const messageResolvers = require('./graphql/messageResolvers');

const app = express();

const apollo_server = new ApolloServer({
  typeDefs: [typeDefs, userTypedef, messageTypeDefs],
  resolvers: [resolvers, userResolvers, messageResolvers],
});

async function startServer() {
  await apollo_server.start(); // connect to apollo server

  apollo_server.applyMiddleware({ app }); // connects the app to the apollo server

  app.use(cors());

  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      const server = app.listen({ port: process.env.PORT || 5000 }, () => {
        console.log(`server listening at http://localhost:${process.env.PORT || 5000}${apollo_server.graphqlPath}`);
      });
      const io = require('socket.io')(server, {
        pingTimeout:60000,
        cors: {
          origin: "http://localhost:3000",
        },
      });
      io.on("connection", (socket) => {
        console.log("socket connection ", /* socket* */);
        
        socket.on("initialize", (user) => {
          console.log("Connected with ", user);
        })

        socket.on("setChat", (chat) => {
          socket.join(chat);
          console.log(chat);
        })

        socket.on("send message", (selectedChat, message) => {
          console.log(selectedChat, message);
        })
      })
    })
    .catch(err => {
      console.error('Error:', err.message);
    });
}

startServer(); 
