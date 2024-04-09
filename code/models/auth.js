const { model, Schema } = require('mongoose');

const authSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    },
    doctor_name: {
        type: String
    },
    doctor_degree: {
        type: String
    },
    doctor_mobile: {
        type: String
    },
    doctor_visit: {
        type: String
    },
    privilege:{
        type: String
    }
});

module.exports = model('Authentication', authSchema);
