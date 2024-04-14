// // following in ambulanceresolvers
// fetchprotocolByDocumentId: ;;async (_, { document_no }) => {
//   try {
//     const documents = await Documents.find({
//       document_no: { $in: document_no },
//     })
//     return documents
//   } catch (error) {
//     throw new Error('Failed to fetch document by document number')
//   }
// },
//   // following in ambulancedef.js
//       `
// extend type Query {
//     fetchVitals(emtID: ID!): Vitals
//     fetchAmbulancesByDoctorId(docID: ID!): [Ambulance]
//     getUserByEmail(email: String!): User
//     getUserIdByEmail(email: String!): ID
//     fetchprotocolByDocumentId(document_no: ID!): [Documents]
//   }  
// `
// //   following is for queries.js

// export const FETCH_DOCUMENTS = gql`
// query fetchprotocolByDocumentId($document_no: ID!) {
//   fetchprotocolByDocumentId(docID: $document_no) {
//     admin_email
//     document_url
//     document_no
//     active_to_train
//     }
//   }
// `

// // /////////////////////////////////////////////////////////////////////////
// // following is for ambulanceresolvers.js

// deletedocumentbydocumenturl: ;async (_, { document_url }) => {
//   try {
//     const result = await Documents.deleteOne({ document_url: document_url })

//     if (!result) {
//       throw new Error('Document deletion unsuccessful')
//     } else {
//       return true
//     }
//   } catch (error) {
//     console.error(error)
//     return false
//   }
// },
//   // following in ambulancedef.js
//   `
// extend type Query {
//     fetchVitals(emtID: ID!): Vitals
//     fetchAmbulancesByDoctorId(docID: ID!): [Ambulance]
//     getUserByEmail(email: String!): User
//     getUserIdByEmail(email: String!): ID
//     fetchprotocolByDocumentId(document_no: ID!): [Documents]
//     deletedocumentbydocumenturl(document_url: STRING!): boolean 
//   }  
// `
// //   following is for queries.js

// export const DELETE_DOCUMENT = gql`
//   query deletedocumentbydocumenturl($document_url: STRING!) {
//     deletedocumentbydocumenturl(document_url: $documet_url) {
//       admin_email
//       document_url
//       document_no
//       active_to_train
//     }
//   }
// `
// // /////////////////////////////////////////////////////////////////////////

// togglestatusbyurl:
//     ;async loginUser(_, { userInput: { email, password } }) {
//       const user = await User.findOne({ email })
//       if (!user) {
//         throw new ApolloError('User with Email does not exist')
//       }
//       if (user.password != password) {
//         throw new ApolloError('Incorrect password', 'PASSWORD_ERROR')
//       }
//       const token = jwt.sign(
//         {
//           user_id: user._id,
//           email,
//         },
//         'SECRET_KEY',
//         {
//           expiresIn: '5h',
//         }
//       )
//       user.token = token
//       return {
//         id: user._id,
//         ...user._doc,
//       }
//     },

// ;async (_, { document_url }) => {
//   try {
//     const result = await Documents.findOne({ document_url: document_url })

//     if (!result) {
//       throw new Error('Document deletion unsuccessful')
//     } else {
//       return true
//     }
//   } catch (error) {
//     console.error(error)
//     return false
//   }
// },
//   // following in ambulancedef.js
//   `
// extend type Query {
//     fetchVitals(emtID: ID!): Vitals
//     fetchAmbulancesByDoctorId(docID: ID!): [Ambulance]
//     getUserByEmail(email: String!): User
//     getUserIdByEmail(email: String!): ID
//     fetchprotocolByDocumentId(document_no: ID!): [Documents]
//     deletedocumentbydocumenturl(document_url: STRING!): boolean 
//     togglestatusbyurl(document_url: STRING!): boolean 
//   }  
// `
// //   following is for queries.js

// export const UPDATE_ACTIVITY_STATUS = gql`
//   query togglestatusbyurl($document_url: STRING!) {
//     togglestatusbyurl(document_url: $documet_url) {
//       admin_email
//       document_url
//       document_no
//       active_to_train
//     }
//   }
// `