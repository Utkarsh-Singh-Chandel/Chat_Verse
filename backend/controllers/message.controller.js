import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js'
import { getRecieverSocketId, io } from '../socket/socket.js';

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: recieverId } = req.params; // kyoki message routes mein "/send?:id tha
    const senderId = req.user._id; // using middleware(protect route wala) we get user id to authenticate the user
    let conversation=await Conversation.findOne({
        participants:{$all:[senderId,recieverId]}
    })
    if(!conversation){
        conversation=await Conversation.create({
            participants:[senderId,recieverId]
        })

    }
    const newMessage=new Message({
        senderId,
        recieverId,
        message
    })
    if(newMessage){
        conversation.messages.push(newMessage._id)
    }
//here we use socket io functionality 
    //await conversation.save();
    //await newMessage.save();
    //this lines work one after the other taking longer tim 
    //so use this
    await Promise.all([conversation.save(),newMessage.save()]);

    const recieverSocketId=getRecieverSocketId(recieverId)
    if(recieverSocketId){
       io.to(recieverSocketId).emit("newMessage",newMessage) 
    }
    res.status(201).json(newMessage);


} catch (error) {
    console.log("Error in Send Message controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const getMessages=async(req,res)=>{
    try {
        
        const {id:userToChatId}=req.params;
        const senderId=req.user._id;
        const conversation=await Conversation.findOne(
            {
                participants:{$all:[senderId,userToChatId]}
            }).populate("messages");
            

        //not refernce but we get actual message due to populate function
        if(!conversation){
            return res.status(200).json([]);
        }
        const messages=conversation.messages;
       res.status(200).json(messages);
        
    } catch (error) {
        console.log("Error in Get Message controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
