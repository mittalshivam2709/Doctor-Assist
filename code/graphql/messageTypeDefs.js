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
extend type Query{
    fetchMessage(sender: ID!, receiver: ID!): [Message!]!
}

extend type Mutation{
    sendMessage(messageInput: MessageInput!): Message!

}

`