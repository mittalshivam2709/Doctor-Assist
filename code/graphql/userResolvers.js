const { ApolloError } = require('apollo-server');
const User = require('../models/UserModel')
const jwt = require('jsonwebtoken');
// todo -> encryption
module.exports = {
  Query: {
    async getUser(_, { ID }) {
      return await User.findById(ID);
    }
  },
  Mutation: {
    async addUser(_, { userInput: { username, password } }) {
      const newUser = new User({
        username,
        password
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
        id: user.id,
        ...user._doc
      };
    }
  }
};
