import {gql} from '@apollo/client'

export const LOGIN_USER = gql`
mutation LoginUser($userInput: UserInput!) {
  loginUser(userInput: $userInput) {
    username
    password
    token
    id
  }
}
`

export const SEND_MESSAGE = gql`
mutation Mutation($messageInput: MessageInput!) {
  sendMessage(messageInput: $messageInput) {
    sender
    content
    receiver
  }
}
`