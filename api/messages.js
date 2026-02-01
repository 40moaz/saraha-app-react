const mongoose = require("mongoose");
const Message = require("../models/Message");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
};

module.exports = async (req, res) => {
  await connectDB();

  if (req.method === "POST") {
    const { text } = req.body;

    const newMessage = await Message.create({ text });
    return res.status(201).json(newMessage);
  }

  if (req.method === "GET") {
    const messages = await Message.find().sort({ createdAt: 1 });
    return res.json(messages);
  }

  res.status(405).json({ message: "Method not allowed" });
};
