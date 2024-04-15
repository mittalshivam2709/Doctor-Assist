const { model, Schema } = require('mongoose');
const documentSchema = new Schema(
  {
    admin_email:
    {
      type: String,
      required: true,
    },
    document_url: 
    {
      type: String,
      required: true,
    },
    document_no:
    {
      type: String,
      required: true
    },
    document_name:
    {
      type: String,
      required: true
    },
    active_to_train:
    {
      type: String,
      required: true
    },
    admit_time:
    {
      type: String,
      required: true
    },
    last_update_time:
    {
      type: String,
      required: true
    }
  },
)
module.exports = model('Document', documentSchema);
// const { model, Schema } = require('mongoose');

// const documentSchema = new Schema(
//   {
//     admin_email: {
//       type: String,
//       required: true,
//     },
//     document_url: {
//       type: String,
//       required: true,
//     },
//     document_no: {
//       type: String,
//       required: true
//     },
//     active_to_train: {
//       type: String,
//       required: true
//     }
//   },
//   { timestamps: true }
// );

// const Document = model('Document', documentSchema);

// Function to format date to IST time in "15:13 PM" format
// function formatISTDate(date) {
//     const ISTOptions = { timeZone: 'Asia/Kolkata', hour12: true, hour: '2-digit', minute: '2-digit' };
//     return date.toLocaleTimeString([], ISTOptions);
// }

// // Override default toJSON method to format timestamps in IST before sending response
// documentSchema.set('toJSON', {
//   transform: function (doc, ret) {
//     ret.createdAt = formatISTDate(ret.createdAt);
//     ret.updatedAt = formatISTDate(ret.updatedAt);
//     return ret;
//   }
// });

// module.exports = Document;

