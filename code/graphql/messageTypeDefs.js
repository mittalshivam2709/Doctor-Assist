const {gql} = require('apollo-server')
// token added to user for rgaphql access
module.exports = gql`
  type Message {
    sender: ID!
    content: String!
    receiver: ID!
    type: String
  }
  input MessageInput {
    content: String!
    receiver: ID!
    sender: ID!
    type: String
  }
  type MessageDoc {
    admin_email: String!
    document_url: String!
    document_name: String!
    document_no: String!
    active_to_train: String!
    admit_time: String!
    last_update_time: String!
  }
  input MessageInputDoc {
    admin_email: String!
    document_url: String!
    document_name: String!
    document_no: String!
    active_to_train: String!
    admit_time: String!
    last_update_time: String!
  }
  extend type Query {
    fetchMessage(sender: ID!, receiver: ID!): [Message!]!
  }

  extend type Mutation {
    sendMessage(messageInput: MessageInput!): Message!
    sendDocument(messageInputDoc: MessageInputDoc!): MessageDoc!
  }
`
