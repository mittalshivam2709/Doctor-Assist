const {gql} = require('apollo-server')
// token added to user for rgaphql access
module.exports = gql`
type Message{
    sender: ID!
    content: String!
    receiver: ID!
}

input MessageInput{
    content: String!
    receiver: ID!
    sender: ID!
}
extend type Query{
    fetchMessage(sender: ID!, receiver: ID!): [Message!]!
}

extend type Mutation{
    sendMessage(messageInput: MessageInput!): Message!

}

`