const {gql} = require('apollo-server')
// token added to user for rgaphql access
module.exports = gql`
type Message{
    sender: ID!
    content: String!
    receiver: ID!
    type: String
}

input MessageInput{
    content: String!
    receiver: ID!
    sender: ID!
    type: String
}
type MessageDoc{
    admin_email: String!
    document_url: String!
    document_no: Int!
    active_to_train: Int! 
}
input MessageInputDoc{
    admin_email: String!
    document_url: String!
    document_no: Int!
    active_to_train: Int!
}
extend type Query{
    fetchMessage(sender: ID!, receiver: ID!): [Message!]!
}

extend type Mutation{
    sendMessage(messageInput: MessageInput!): Message!
    sendDocument(messageInputDoc: MessageInputDoc!): MessageDoc!
}

`
