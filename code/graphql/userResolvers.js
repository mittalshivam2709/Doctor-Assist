const { ApolloError } = require('apollo-server')
const User = require('../models/auth')
const Document = require('../models/Document')
const jwt = require('jsonwebtoken')
// todo -> encryption
module.exports = {
  Query: {
    async getUser(_, { ID }) {
      // const user = await User.findById(ID);
      // console.log(user);
      // return user;
      return await User.findById(ID)
    },
  },
  Mutation: {
    async addUser(
      _,
      {
        userInput: {
          email,
          password,
          doctor_name,
          doctor_degree,
          doctor_mobile,
          doctor_visit,
          privilege
        },
      }
    ) {
      const newUser = new User({
        email,
        password,
        doctor_name,
        doctor_degree,
        doctor_mobile,
        doctor_visit,
        privilege
      })
      const oldUser = await User.findOne({ email })
      if (oldUser) {
        throw new ApolloError('User with Email already exists')
      }
      const token = jwt.sign(
        {
          user_id: newUser._id,
          email,
        },
        'SECRET_KEY',
        {
          expiresIn: '5h',
        }
      )
      newUser.token = token

      const res = await newUser.save()
      return {
        id: res.id,
        ...res._doc,
      }
    },
    async loginUser(_, { userInput: { email, password } }) {
      const user = await User.findOne({ email })
      if (!user) {
        throw new ApolloError('User with Email does not exist')
      }
      if (user.password != password) {
        throw new ApolloError('Incorrect password', 'PASSWORD_ERROR')
      }
      const token = jwt.sign(
        {
          user_id: user._id,
          email,
        },
        'SECRET_KEY',
        {
          expiresIn: '5h',
        }
      )
      user.token = token
      return {
        id: user._id,
        ...user._doc,
      }
    },
    async resetPassword(_, { userInput: { email, password, doctor_name } }) {
      const user = await User.findOne({ email })
      if (!user) {
        throw new ApolloError('User with Email does not exist')
      }
      if (user.password != doctor_name) {
        throw new ApolloError('Old password is incoorect')
      }
      console.log('New password', password)
      user.password = password
      const res = await user.save()
      return {
        id: res.id,
        ...res._doc,
      }
    },
    async changestatus(_, { inp: { document_url,active_to_train } }) {
      const doc = await Document.findOne({ document_url })
      if (!doc) {
        throw new ApolloError('Document does not exist')
      }
      doc.active_to_train = active_to_train
      const res = await doc.save()
      return {
        id: res.id,
        ...res._doc,
      }
    },
    async deletedocument(_, { inp: { document_url } }) {
      try {
        // Delete all documents with the provided URL
        const result = await Document.deleteMany({ document_url });
        return 1;      
        } catch (error) {
        throw new ApolloError('Failed to delete documents', 'DELETE_DOCUMENTS_ERROR', {
          error: error.message,
        });
      }
    }
    
  },
}
