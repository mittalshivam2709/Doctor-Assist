import { gql } from '@apollo/client'

export const FETCH_MESSAGES = gql`
  query FetchMessage($sender: ID!, $receiver: ID!) {
    fetchMessage(sender: $sender, receiver: $receiver) {
      sender
      content
      receiver
      type
    }
  }
`
//REMOVE THIS
export const FETCH_NUMBER = gql`
  query Query {
    getNumberList {
      numbers
    }
  }
`
export const FETCH_PATIENTS = gql`
query FetchAmbulancesByDoctorId($docId: ID!) {
  fetchAmbulancesByDoctorId(docID: $docId) {
      doctor
      emt
      age_type
      name
      skin_color
      skin_temperature
      condition
      rhythm
      capillary_refill
      volume
      adventitious_sounds
      pupil_size
      reaction_to_light
      past_history
      gender
      event_during_transport
      loc
      ercp_advice
      critical_case
      problem
      age
      ambulance_no
      body_temperature
      blood_pressure_sys
      blood_pressure_dys
      pulse_rate
      spo2
      rbs
      createdAt
      admit_time
      symptoms
      address
      occupation
      phone
    }
  }
`

export const FETCH_DOCUMENTS = gql`
query Fetchdocumentbydocumentid($doc_no: String!) {
  fetchdocumentbydocumentid(doc_no: $doc_no) {
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

export const FETCH_VITAL = gql`
  query Query($emtId: ID!) {
    fetchVitals(emtID: $emtId) {
      name
      body_temperature
      blood_pressure_sys
      blood_pressure_dys
      pulse_rate
      spo2
      rbs
      pupil_size
      skin_color
      skin_temperature
      condition
      capillary_refill
      reaction_to_light
      rhythm
      volume
      adventitious_sounds
    }
  }
`
export const FETCH_USER_DETAILS = gql`
  query FetchUserDetails($email: String!) {
    getUserByEmail(email: $email) {
      doctor_name
      doctor_mobile
      doctor_visit
      doctor_degree
      privilege
    }
  }
`
export const FETCH_USER_ID_BY_EMAIL = gql`
  query FetchUserIdByEmail($email: String!) {
    getUserIdByEmail(email: $email) {
      ID
      jwt_token
    }
  }
`;

