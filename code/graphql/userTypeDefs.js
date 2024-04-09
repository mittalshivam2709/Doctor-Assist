const { gql } = require('apollo-server')
// token added to user for rgaphql access
module.exports = gql`
  type User {
    email: String!
    password: String!
    token: String
    id: String
    doctor_name: String
    doctor_degree: String
    doctor_mobile: String
    doctor_visit: String
    privilege : String
  }

  input UserInput {
    email: String!
    password: String!
    doctor_name: String
    doctor_degree: String
    doctor_mobile: String
    doctor_visit: String
    privilege :String
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
