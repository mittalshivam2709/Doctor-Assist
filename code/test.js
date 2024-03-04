GQL MUTATION EXAMPLE




mutation CreateAmbulance($doctor: ID!, $emt: ID!, $ageType: String, $name: String, $skinColor: String, $skinTemperature: String, $condition: String, $rhythm: String, $capillaryRefill: String, $volume: String, $adventitiousSounds: String, $pupilSize: String, $reactionToLight: String, $pastHistory: String, $gender: String, $eventDuringTransport: String, $ercpAdvice: String, $loc: String, $criticalCase: String, $age: Int, $problem: String, $ambulanceNo: Int, $bodyTemperature: [Float], $bloodPressureSys: [Float], $bloodPressureDys: [Float], $pulseRate: [Float], $spo2: [Float], $rbs: [Float], $symptoms: String) {
  createAmbulance(doctor: $doctor, emt: $emt, age_type: $ageType, name: $name, skin_color: $skinColor, skin_temperature: $skinTemperature, condition: $condition, rhythm: $rhythm, capillary_refill: $capillaryRefill, volume: $volume, adventitious_sounds: $adventitiousSounds, pupil_size: $pupilSize, reaction_to_light: $reactionToLight, past_history: $pastHistory, gender: $gender, event_during_transport: $eventDuringTransport, ercp_advice: $ercpAdvice, loc: $loc, critical_case: $criticalCase, age: $age, problem: $problem, ambulance_no: $ambulanceNo, body_temperature: $bodyTemperature, blood_pressure_sys: $bloodPressureSys, blood_pressure_dys: $bloodPressureDys, pulse_rate: $pulseRate, spo2: $spo2, rbs: $rbs, symptoms: $symptoms) {
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
    symptoms
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
  }
}




{
  "doctor": "65d463dda0b915283dced3dd",
  "emt": "65d7ade0b081b21291ac3922",
  "ageType": "Adult",
  "name": "N Y C",
  "skinColor": "Pink",
  "skinTemperature": "Warm",
  "condition": "Normal",
  "rhythm": "Regular",
  "volume": "Normal",
  "capillaryRefill": "2-4",
  "adventitiousSounds": "Creps",
  "pupilSize": "Normal",
  "reactionToLight": "Brisk",
  "pastHistory": "heart attack, stroke",
  "gender": "Male",
  "eventDuringTransport": "concioussness loss",
  "loc": "A",
  "ercpAdvice": "None",
  "criticalCase": "yes",
  "problem": "Breathing Problem - breathing problem",
  "age": 30,
  "ambulanceNo": 2023,
  "bodyTemperature": [98.6],
  "bloodPressureSys": [120],
  "bloodPressureDys": [80],
  "pulseRate": [70],
  "spo2": [98],
  "rbs": [100],
  "symptoms": "back pain, chest pain"
}
