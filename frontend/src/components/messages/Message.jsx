import React, { useEffect, useRef } from "react";
import useConversation from '../../zustand/useConversation'
import  {useAuthContext}  from '../../context/AuthContext'
import { extractTime } from "../../../../backend/utils/extractTime";

const Message = ({message}) => {
  const {authUser}=useAuthContext();
const {selectedConversation}=useConversation();
const fromMe=message.senderId===authUser._id
const profilePic=fromMe? authUser.profilePic:selectedConversation?.profilePic;
const chatClassName=fromMe ? "chat-end":"chat-start";
const bubbleBg=fromMe?"bg-c1":"bg-c2";
const formattedTime=extractTime(message.createdAt)
const shakeClass=message.shouldShake?"shake":"";


  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="" />
        </div>
      </div>
      <div className={`chat-bubble text-white  ${bubbleBg} ${shakeClass} pb-2 `}>{message.message}</div>
      <div className="chat-footer text-white opacity-50 text-xs flex gap-1 items-center">
       {formattedTime}
      </div>
    </div>
  );
};

export default Message;
