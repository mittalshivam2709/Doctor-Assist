const mongoose = require("mongoose");
// contains all the messages, including if the message was sent to 
// the doc query or the emt of that ambulance
const DocumentSchema = mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    urls: [String]
  },
  { timestamps: true }
);

const Document = mongoose.model("Protocol", DocumentSchema);
module.exports = Document;