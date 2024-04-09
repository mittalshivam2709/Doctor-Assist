const { model, Schema } = require('mongoose');

const userSchema = new Schema({
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
    username: {
        type: String,
        // Set the username field to allow null values
        // or mark it as optional by removing the required property
        default: null // If you want to set existing documents' username to null
    },
    privelege: {
        type: Number
    }
});

module.exports = model('User', userSchema);
