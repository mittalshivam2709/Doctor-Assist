const mongoose = require('mongoose')
// contains all the messages, including if the message was sent to
// the doc query or the emt of that ambulance
const protocolSchema = mongoose.Schema(
  {
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
    },
    url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Protocol = mongoose.model('Protocol', protocolSchema)
module.exports = Protocol
