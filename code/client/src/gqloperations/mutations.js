import { gql } from '@apollo/client'

export const LOGIN_USER = gql`
  mutation LoginUser($userInput: UserInput!) {
    loginUser(userInput: $userInput) {
      email
      password
      token
      id
    }
  }
`

export const SIGNUP_USER = gql`
  mutation addUser($userInput: UserInput!) {
    addUser(userInput: $userInput) {
      email
      password
      doctor_name
      doctor_degree
      doctor_mobile
      doctor_visit
      id
      privilege
    }
  }
`

export const RESET_PASSWORD = gql`
  mutation resetPassword($userInput: UserInput!) {
    resetPassword(userInput: $userInput) {
      email
      password
      doctor_name
      id
    }
  }
`
export const CHANGE_STATUS = gql`
  mutation changestatus($inp: changestatusinput!) {
    changestatus(inp: $inp) {
      admin_email
      document_url
      document_no
      document_name
      active_to_train
      admit_time
      last_update_time
    }
  }
`
export const DELETE_DOCUMENT = gql`
  mutation deletedocument($inp: deletedocument!) {
    deletedocument(inp: $inp)
  }
`

export const SEND_MESSAGE = gql`
  mutation Mutation($messageInput: MessageInput!) {
    sendMessage(messageInput: $messageInput) {
      sender
      content
      receiver
      type
    }
  }
`
export const SEND_DOCUMENT = gql`
  mutation Mutation($messageInputDoc: MessageInputDoc!) {
    sendDocument(messageInputDoc: $messageInputDoc) {
      admin_email
      document_url
      document_name
      document_no
      active_to_train
      admit_time
      last_update_time
    }
  }
`