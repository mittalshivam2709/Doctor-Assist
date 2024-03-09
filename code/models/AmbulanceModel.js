const mongoose = require("mongoose");

// stores all the data of an ambulance, the patients vitals etc 
const ambulanceSchema = mongoose.Schema(
    {
        doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        emt: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        
        age_type: String,
        name: String,
        skin_color: String,
        skin_temperature: String,
        condition: String,
        rhythm: String,
        capilarry_refill: String,
        volume: String,
        adventious_sounds: String,
        pupil_size: String,
        reaction_to_light: String,
        
        //frontend
        past_history: String,
        gender: String,
        event_during_transport: String,
        loc: String, //level of conciousness 
        ercp_advice: String,
        critical_case: String, //yes or no, could be bool
        problem: String, // goes as title
        symptoms: String,
        admit_time: String,

        age: Number,
        ambulance_no: Number,

        // vitals updated over time
        body_temperature: [Number], // in Farheneit, >105 or < 95, 103-104, 102 or less
        blood_pressure_sys: [Number], // Normal: less than 120 systolic and 80 diastolic., <90, <90 or >160, >140
        blood_pressure_dys: [Number],
        pulse_rate: [Number],
        spo2: [Number], // saturation of peripheral oxygen, <85, <90, >90
        rbs: [Number],  // random blood sugar

        address: String,
        occupation: String,
        phone: String,

    },
    { timestamps: true },
);

const Ambulance =  mongoose.model("Ambulance", ambulanceSchema);
module.exports = Ambulance;
