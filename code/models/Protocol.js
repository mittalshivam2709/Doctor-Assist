const mongoose = require("mongoose");
// contains all the messages, including if the message was sent to 
// the doc query or the emt of that ambulance
const protocolSchema = mongoose.Schema(
  {
    
  },
  { timestamps: true }
);

const Protocol = mongoose.model("Protocol", protocolSchema);
module.exports = Protocol;