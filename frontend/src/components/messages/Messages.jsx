import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";
const Messages = () => {
  const { messages, loading } = useGetMessages();
  // console.log(messages);
  useListenMessages();
  const lastMessageref = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageref.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 overflow-auto flex-1">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={lastMessageref}>
            <Message message={message} />
          </div>
        ))}
     
      {loading && (
       <>
          {[...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
     </>
      )}
      {!loading && messages.length === 0 && (
        <p className="text-center text-white">Send a Message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;

