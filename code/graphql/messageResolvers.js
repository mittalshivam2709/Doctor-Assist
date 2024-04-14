const Message = require("../models/MessageModel");
const Document = require("../models/Document");
module.exports = {
  Query: {
    fetchMessage: async (_, { sender, receiver }) => {
      try {

        const messages1 = await Message.find({ sender: sender, receiver: receiver });
        const messages2 = await Message.find({ sender: receiver, receiver: sender });
        const mergedMessages = messages1.concat(messages2);
        const messages = mergedMessages.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
          });
        return messages;
      } catch (error) {
        throw new Error('message fail error');
      }
    },
  },
  Mutation: {
    sendMessage: async (_, { messageInput }) => {
      try {
        // Create a new message using the input data
        const { content, sender, receiver, type } = messageInput;
        const newMessage = new Message({
            sender,
            content,
            receiver,
            type
        });
        // console.log(newMessage);
        const savedMessage = await newMessage.save();

        return savedMessage;
      } catch (error) {
        throw new Error('Failed to send message');
      }
    },
    sendDocument: async (_, { messageInputDoc }) => {
      try {
        // Create a new message using the input data
        const { admin_email,document_url,document_name,document_no,active_to_train,admit_time,last_update_time } = messageInputDoc;
        const newMessageDoc = new Document({
          admin_email,
          document_url,
          document_name,
          document_no,
          active_to_train,
          admit_time,
          last_update_time,
        });
        // console.log(newMessage);
        const savedMessage2 = await newMessageDoc.save();
        return savedMessage2;
      } catch (error) {
        throw new Error('Failed to send message');
      }
    },
  },
};
