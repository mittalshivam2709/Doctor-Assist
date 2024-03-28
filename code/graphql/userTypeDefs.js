const { gql } = require('apollo-server')
// token added to user for rgaphql access
module.exports = gql`
  type User {
    username: String!
    password: String!
    token: String
    id: String
    doctor_name: String
    doctor_degree: String
    doctor_mobile: String
    doctor_visit: String
  }

  input UserInput {
    username: String!
    password: String!
    doctor_name: String
    doctor_degree: String
    doctor_mobile: String
    doctor_visit: String
  }
  extend type Query {
    getUser(ID: ID!): User!
  }

  extend type Mutation {
    addUser(userInput: UserInput!): User!
    loginUser(userInput: UserInput!): User!
    resetPassword(userInput: UserInput!): User!
  }
`
