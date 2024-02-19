const User = require('../models/UserModel')

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
      const res = await newUser.save();
      return {
        id: res.id,
        ...res._doc
      };
    }
  }
};
