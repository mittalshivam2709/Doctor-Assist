const { gql } = require('apollo-server');

module.exports = gql`
  type NumberList {
    numbers: [Int]!
  }

  type Query {
    getNumberList: NumberList!
  }

  type Mutation {
    addNumberToList(number: Int!): NumberList!
  }
`;
