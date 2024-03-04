const Message = require("../models/MessageModel");

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
        const { content, sender, receiver } = messageInput;
        const newMessage = new Message({
            sender,
            content,
            receiver,
        });
        // console.log(newMessage);
        const savedMessage = await newMessage.save();

        return savedMessage;
      } catch (error) {
        throw new Error('Failed to send message');
      }
    },
  },
};
