import React from "react";
import SideBar from "../../components/siderbar/SideBar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
  return (
    <div
      className="flex  sm:h-[450px] md:h-[540px] 
      bg-gray-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 border border-gray-400

    overflow-hidden "
    >
    <SideBar/>
    <MessageContainer/>
    </div>
    
  );
};

export default Home;
