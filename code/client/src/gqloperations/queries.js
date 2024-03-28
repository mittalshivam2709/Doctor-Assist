import { gql } from '@apollo/client'

export const FETCH_MESSAGES = gql`
  query FetchMessage($sender: ID!, $receiver: ID!) {
    fetchMessage(sender: $sender, receiver: $receiver) {
      sender
      content
      receiver
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
    }
  }
`
export const FETCH_USER_DETAILS = gql`
  query FetchUserDetails($id: ID!) {
    getUserByUsername(_id: $id) {
      doctor_name
      doctor_mobile
      doctor_visit
      doctor_degree
    }
  }
`
