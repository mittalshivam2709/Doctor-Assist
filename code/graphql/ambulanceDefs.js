const { gql } = require('apollo-server')

module.exports = gql`
  type Ambulance {
    doctor: ID!
    emt: ID!
    age_type: String
    name: String
    skin_color: String
    skin_temperature: String
    condition: String
    rhythm: String
    capillary_refill: String
    volume: String
    adventitious_sounds: String
    pupil_size: String
    reaction_to_light: String
    past_history: String
    gender: String
    event_during_transport: String
    loc: String
    ercp_advice: String
    critical_case: String
    problem: String
    symptoms: String
    age: Int
    ambulance_no: Int
    body_temperature: [Float]
    blood_pressure_sys: [Float]
    blood_pressure_dys: [Float]
    pulse_rate: [Float]
    spo2: [Float]
    rbs: [Float]
    createdAt: String
    admit_time: String
    address: String
    occupation: String
    phone: String
  }
  type Vitals {
    name: String
    body_temperature: [Float]
    blood_pressure_sys: [Float]
    blood_pressure_dys: [Float]
    pulse_rate: [Float]
    spo2: [Float]
    rbs: [Float]
  }
  extend type Query {
    fetchVitals(emtID: ID!): Vitals
    fetchAmbulancesByDoctorId(docID: ID!): [Ambulance]
    getUserByUsername(_id: ID!): User!
  }
  extend type Mutation {
    updateAmbulanceVital(emtId: ID!, vitalName: String!, value: Float!): Boolean

    createAmbulance(
      doctor: ID!
      emt: ID!
      age_type: String
      name: String
      skin_color: String
      skin_temperature: String
      condition: String
      rhythm: String
      capillary_refill: String
      volume: String
      adventitious_sounds: String
      pupil_size: String
      reaction_to_light: String
      past_history: String
      gender: String
      event_during_transport: String
      loc: String
      ercp_advice: String
      critical_case: String
      problem: String
      symptoms: String
      age: Int
      ambulance_no: Int
      body_temperature: [Float]
      blood_pressure_sys: [Float]
      blood_pressure_dys: [Float]
      pulse_rate: [Float]
      spo2: [Float]
      rbs: [Float]
      address: String
      occupation: String
      phone: String
    ): Ambulance
  }
`
