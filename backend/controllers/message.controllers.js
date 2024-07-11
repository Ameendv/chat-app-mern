import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'
import { getRecieverSocketId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save()
    // await newMessage.save()

    //this will run in parellel
    await Promise.all([conversation.save(), newMessage.save()]);

    //SOCKET IO FUNCTIONALITY
    const receiverSocketId = getRecieverSocketId(receiverId);
    if(receiverSocketId){
      // io.to(receiverSocketId).emit is used to send event to specific user
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("🚀 ~ sendMessage ~ error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate('messages');

    if (!conversation) return res.status(200).json([]);

    const { messages } = conversation;

    res.status(200).json(messages);

  } catch (error) {
    console.log("🚀 ~ getMessages ~ error:", error)
    res.status(500).json({ error: "Internal server error" });
  }
};

