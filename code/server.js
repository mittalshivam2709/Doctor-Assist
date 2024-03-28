const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv/config');
const cors = require('cors');
const express = require('express');
const nodemailer = require('nodemailer');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const userTypedef = require('./graphql/userTypeDefs');
const userResolvers = require('./graphql/userResolvers');
const messageTypeDefs = require('./graphql/messageTypeDefs');
const messageResolvers = require('./graphql/messageResolvers');
const listDefs = require('./graphql/listDefs');
const listResolver = require('./graphql/listResolver');
const ambulanceDefs = require('./graphql/ambulanceDefs');
const ambulanceResolvers = require('./graphql/ambulanceResolvers');
const corsList = {
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://10.1.132.176:3001"],
};
const app = express();
// const transporter = nodemailer.createTransport({
//   host: 'smtp.example.com', // Replace with your SMTP host
//   port: 587, // Replace with your SMTP port (e.g., 587 for TLS)
//   secure: false, // Set to true for TLS, false for non-secure connections (e.g., STARTTLS)
//   auth: {
//     user: 'your-smtp-username', // Replace with your SMTP username or email address
//     pass: process.env.SMTP_PASSWORD, // Use environment variable to securely store and access password
//   },
// });
const apollo_server = new ApolloServer({
  typeDefs: [typeDefs, userTypedef, messageTypeDefs, listDefs, ambulanceDefs],
  resolvers: [resolvers, userResolvers, messageResolvers, listResolver, ambulanceResolvers],
  cors: corsList
});
async function startServer() {
  app.use(cors());
  await apollo_server.start();
  apollo_server.applyMiddleware({ app });
  mongoose.connect('mongodb+srv://dass39:dass39@emri.vubkrrz.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
      console.log("Connected to MongoDB");
      const server = app.listen({ port: process.env.PORT || 5001 }, () => {
        console.log(`server listening at http://localhost:${process.env.PORT || 5001}${apollo_server.graphqlPath}`);
      });
      const io = require('socket.io')(server, {
        pingTimeout:60000,
        cors: {
          origin: ["http://localhost:3000", "http://localhost:3001" , "http://localhost:3002", "http://10.1.132.176:3001", '*'],
        },
      });
      io.on("connection", (socket) => {
        console.log("socket connection ",);
        socket.on("initialize", (user) => {
          socket.join(user);
        })
        socket.on("setChat", (chat) => {
          socket.join(chat);
        })
        socket.on("send message", (message) => { 
          socket.in(message.receiver).emit("message recieved", message);
        })
      })
    })
    .catch(err => {
      console.error('Error:', err.message);
    });
    // async function sendResetPasswordEmail(email, resetLink) {
    //   try {
    //     await transporter.sendMail({
    //       from: 'mittalmayank2904@gmail.com',
    //       to: email,
    //       subject: 'Password Reset Request',
    //       html: `<p>You've requested to reset your password. Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    //     });
    //     console.log('Password reset email sent successfully.');
    //   } catch (error) {
    //     console.error('Error sending password reset email:', error);
    //   }
    // }
    // const resolvers = {
    //   Mutation: {
    //     forgotPassword: async (_, { email }) => {
    //       const resetToken = generateResetToken();
    //       const resetLink = `http://localhost:3000/forgotresetpassword?token=${resetToken}`;
    //       console.log(resetLink);
    //       await sendResetPasswordEmail(email, resetLink);
    //       return { success: true, message: 'Password reset email sent successfully.' };
    //     },
    //   }
    // }
}
startServer(); 
