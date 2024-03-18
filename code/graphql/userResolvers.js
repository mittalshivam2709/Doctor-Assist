const { ApolloError } = require('apollo-server');
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken');
// todo -> encryption
module.exports = {
  Query: {
    async getUser(_, { ID }) {
      // const user = await User.findById(ID);
      // console.log(user);
      // return user;
      return await User.findById(ID);
    },
    async getUserByUsername(_, { username }) {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          throw new ApolloError('User not found', 'USER_NOT_FOUND');
        }
        // Extracting required fields
        const { name, doctor_mobile, doctor_visit, doctor_degree } = user;
        return {
          name,
          doctor_mobile,
          doctor_visit,
          doctor_degree
        };
      } catch (error) {
        console.error(error);
        throw new ApolloError('Internal server error', 'INTERNAL_SERVER_ERROR');
      }
    }
  },
  Mutation: {
    async addUser(_, { userInput: { username, password,doctor_name,doctor_degree,doctor_mobile,doctor_visit } }) {
      const newUser = new User({
        username,
        password,
        doctor_name,
        doctor_degree,
        doctor_mobile,
        doctor_visit
      });
      const oldUser = await User.findOne({username});
      if(oldUser){
        throw new ApolloError('User with username already exists')
      }
      const token = jwt.sign(
        {
          user_id: newUser._id, username
        },
        "SECRET_KEY",
        {
          expiresIn: "5h"
        }
      );
      newUser.token = token;

      const res = await newUser.save();
      return {
        id: res.id,
        ...res._doc
      };
    },
    async loginUser(_, { userInput: { username, password } }){
      const user = await User.findOne({username});
      if(!user){
        throw new ApolloError('User with username does not exist')
      }
      if(user.password != password){
        throw new ApolloError('Incorrect password', 'PASSWORD_ERROR')
      }
      const token = jwt.sign(
        {
          user_id: user._id, username
        },
        "SECRET_KEY",
        {
          expiresIn: "5h"
        }
      );
      user.token = token;
      return {
        id: user._id,
        ...user._doc
      };
    }
  }
};
