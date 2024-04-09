const Ambulance = require('../models/AmbulanceModel')
const User = require('../models/auth')
const { ApolloError } = require('apollo-server')


function formatToAMPM(isoDateString) {
  // function to convert iso date time to standard am pm 12 hour format
  const date = new Date(isoDateString)

  let hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'

  hours = hours % 12 || 12
  const formattedHours = hours < 10 ? `0${hours}` : hours
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
  const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`
  return formattedTime
}

module.exports = {
  Query: {
    fetchVitals: async (_, { emtID }) => {
      try {
        const ambulance = await Ambulance.findOne({ emt: emtID })

        const vitals = {
          name: ambulance.name,
          body_temperature: ambulance.body_temperature,
          blood_pressure_sys: ambulance.blood_pressure_sys,
          blood_pressure_dys: ambulance.blood_pressure_dys,
          pulse_rate: ambulance.pulse_rate,
          spo2: ambulance.spo2,
          rbs: ambulance.rbs,
        }

        return vitals
      } catch (error) {
        console.log(error)
        throw new Error('Failed to fetch vitals')
      }
    },
    // fetchAmbulancesByDoctorId: async (_, { docID }) => {
    //   try {
    //     const ambulances = await Ambulance.find({ doctor: docID })

    //     return ambulances
    //   } catch (error) {
    //     throw new Error('Failed to fetch ambulances by doctor ID')
    //   }
    // },
    fetchAmbulancesByDoctorId: async (_, { docID }) => {
      try {
        const ambulances = await Ambulance.find({ doctor: { $in: docID } });
        return ambulances;
      } catch (error) {
        throw new Error('Failed to fetch ambulances by doctor ID');
      }
    },    
    async getUserByEmail(_, { email }) {
      try {
        const user = await User.findOne({email })
        if (!user) {
          throw new ApolloError('User not found')
        }
        // Extracting required fields
        const { doctor_name, doctor_mobile, doctor_visit, doctor_degree ,privilege} = user
        return {
          doctor_name,
          doctor_mobile,
          doctor_visit,
          doctor_degree,
          privilege
        }
      } catch (error) {
        console.error(error)
        throw new ApolloError('Internal server error')
      }
    },
    // getUserIdByEmail: async (_, { email }) => {
    //   try {
    //     const user = await User.findOne({ email })
    //     if (!user) {
    //       throw new ApolloError('User not found')
    //     }
    //     return user.id
    //   } catch (error) {
    //     console.error(error)
    //     throw new ApolloError('Internal server error')
    //   }
    // },
    // getUserIdByEmail: async (_, { email }) => {
    //   try {
    //     const users = await User.find({ email }); // Find all users with matching email
    //     const userIds = users.map(user => user.id); // Extract IDs from matching users
    //     return userIds;
    //   } catch (error) {
    //     console.error(error);
    //     throw new ApolloError('Internal server error');
    //   }
    // },    
    getUserIdByEmail: async(_, { email }) =>{
      try {
        const user = await User.findOne({ email }); // Find the user with the matching email
        if (!user) {
          throw new ApolloError('User not found');
        }
        console.log("hell")
        console.log(user)
        console.log("hell")
        console.log(user._id.toString()); // Convert ObjectId to string and log the value
        console.log("sahi");
        return user._id.toString(); // Return the ObjectId as a string
      } catch (error) {
        console.error(error);
        throw new ApolloError('Internal server error');
      }
    },    
  },
  Mutation: {
    updateAmbulanceVital: async (_, { emtId, vitalName, value }) => {
      try {
        const ambulance = await Ambulance.findOne({ emt: emtId })

        if (!ambulance) {
          throw new Error('Ambulance not found')
        }

        if (!ambulance[vitalName]) {
          ambulance[vitalName] = [] // empty list
        }

        ambulance[vitalName].push(value) // append value to the list

        await ambulance.save()

        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
    createAmbulance: async (_, args) => {
      try {
        const newAmbulance = new Ambulance({
          ...args,
          admit_time: formatToAMPM(new Date().toISOString()),
        })
        const savedAmbulance = await newAmbulance.save()

        return savedAmbulance // return the new ambulance
      } catch (error) {
        console.error(error)
        throw new Error('Failed to create ambulance')
      }
    },
  },
}
