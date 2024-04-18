const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
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
// const AWS = require("aws-sdk");
// let multer = require("multer");

const corsList = {
  origin: ["http://localhost:3000", "http://localhost:3001", "http://localhost:3002", "http://10.1.132.176:3001", "http://10.2.8.18:5000/doctor_assistant"],
};
dotenv.config();
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
        socket.on("file clicked", () => { 
          console.log("file input try");
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
// const S3_BUCKET = 'tto-asset';
// const REGION = 'ap-south-1';
// const ACCESS_KEY = 'AKIA3BOLL3RQYEWKMV4B';
// const SECRET_ACCESS_KEY = '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';
// // const bucketName = process.env.bucketName;

// const awsConfig = {
//     accessKeyId: ACCESS_KEY,
//     secretAccessKey: SECRET_ACCESS_KEY,
//     region: REGION,
// };

// const S3 = new AWS.S3(awsConfig);

// //middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
//     let upload = multer({
//       // storage: multer.memoryStorage(),
//       limits: {
//           fileSize: 1024 * 1024 * 5,
//       },
//       fileFilter: function (req, file, done) {
//           if (
//               file.mimetype === "image/jpeg" ||
//               file.mimetype === "image/png" ||
//               file.mimetype === "image/jpg"
//           ) {
//               done(null, true);
//           } else {
//               //prevent the upload
//               var newError = new Error("File type is incorrect");
//               newError.name = "MulterError";
//               done(newError, false);
//           }
//       },
//   });

//     const uploadToS3 = (fileData) => {
//       return new Promise((resolve, reject) => {
//           const params = {
//               Bucket: S3_BUCKET,
//               Key: `${Date.now().toString()}.jpg`,
//               Body: fileData,
//           };
//           S3.upload(params, (err, data) => {
//               if (err) {
//                   console.log(err);
//                   return reject(err);
//               }
//               console.log(data);
//               return resolve(data);
//           });
//       });
//   };

  //   app.post("/upload-multiple", upload.array("images", 1), async (req, res) => {
  //     // console.log(req.files);
  
  //     if (req.files && req.files.length > 0) {
  //         for (var i = 0; i < req.files.length; i++) {
  //             // console.log(req.files[i]);
  //             await uploadToS3(req.files[i].buffer);
  //         }
  //     }
  
  //     res.send({
  //         msg: "Successfully uploaded " + req.files.length + " files!",
  //     });
  // });
//   app.post("/upload-single", upload.single("image"), async (req, res) => {
//     if (req.file) {
//         await uploadToS3(req.file.buffer);
//     }
//     res.send({
//         msg: "File uploaded successfully!",
//     });
// });
  
}
startServer(); 
