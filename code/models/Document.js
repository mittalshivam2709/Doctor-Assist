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
      type: Number,
      required: true
    },
    active_to_train:
    {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)
module.exports = model('Document', documentSchema);

