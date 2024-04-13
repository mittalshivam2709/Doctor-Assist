// following in ambulanceresolvers
    fetchprotocolByDocumentId: ;;async (_, { document_no }) => {
      try {
        const documents = await Documents.find({
          document_no: { $in: document_no },
        })
        return documents
      } catch (error) {
        throw new Error('Failed to fetch document by document number')
      }
    },
      // following in ambulancedef.js
      `
  extend type Query {
    fetchVitals(emtID: ID!): Vitals
    fetchAmbulancesByDoctorId(docID: ID!): [Ambulance]
    getUserByEmail(email: String!): User
    getUserIdByEmail(email: String!): ID
    fetchprotocolByDocumentId(document_no: ID!): [Documents]
  }  
`
//   following is for queries.js

export const FETCH_DOCUMENTS = gql`
query fetchprotocolByDocumentId($document_no: ID!) {
  fetchprotocolByDocumentId(docID: $document_no) {
    admin_email
    document_url
    document_no
    active_to_train
    }
  }
`