import { gql } from '@apollo/client'

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

export const SIGNUP_USER = gql`
  mutation addUser($userInput: UserInput!) {
    addUser(userInput: $userInput) {
      username
      password
      doctor_name
      doctor_degree
      doctor_mobile
      doctor_visit
      id
    }
  }
`

export const RESET_PASSWORD = gql`
  mutation resetPassword($userInput: UserInput!) {
    resetPassword(userInput: $userInput) {
      username
      password
      doctor_name
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
