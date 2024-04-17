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
    privilege: String
  }

  input UserInput {
    email: String!
    password: String!
    doctor_name: String
    doctor_degree: String
    doctor_mobile: String
    doctor_visit: String
    privilege: String
  }
  extend type Query {
    getUser(ID: ID!): User!
  }
  input changestatusinput {
    document_url: String!
    active_to_train: String!
  }
  input deletedocument {
    document_url: String!
  }
  type Doc{
    admin_email: String!
    document_url: String!
    document_no: String!
    document_name: String!
    active_to_train: String!
    admit_time: String!
    last_update_time: String!
  }
  extend type Mutation {
    addUser(userInput: UserInput!): User!
    loginUser(userInput: UserInput!): User!
    resetPassword(userInput: UserInput!): User!
    changestatus(inp: changestatusinput!): Doc!
    deletedocument(inp: deletedocument!): Boolean!
  }
`
