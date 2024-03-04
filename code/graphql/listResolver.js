const NumberList = require("../models/NumberModel");

module.exports = {
  Query: {
    async getNumberList() {
      try {
        const numberList = await NumberList.findOne();
        return numberList;
      } catch (error) {
        throw new Error('fail ??');
      }
    }
  },
  Mutation: {
    async addNumberToList(_, { number }) {
      try {
        const numberList = await NumberList.findOne();
        if (!numberList) {
          const newNumberList = new NumberList({
            numbers: [number]
          });
          await newNumberList.save();
          return newNumberList;
        }
        numberList.numbers.push(number);
        await numberList.save();
        return numberList;
      } catch (error) {
        throw new Error('fail ???');
      }
    }
  }
};

