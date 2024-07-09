import React from "react";
import useConversation from "../../zustand/useConversation";
import {useAuthContext} from "../../context/AuthContext"
import { extractTime } from "../../utils/extractTime";

const Message = ( {message} ) => {
  const { authUser } = useAuthContext();
  const {selectedConversation} = useConversation()
  const isFromMe = message.senderId === authUser._id
  const formattedTime = extractTime(message.createdAt)
  const chatClassName = isFromMe ? 'chat-end':'chat-start'
  const profilePic = isFromMe ? authUser.profilePic : selectedConversation.profilePic
  const bubbleBgColor = isFromMe ? 'bg-green-500' : ' '
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avater">
        <div className="w-10 rounded-full">
          <img
            src={profilePic}
            alt="img"
          />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500 ${bubbleBgColor}`}>{message.message}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;


//STARTED CODE FOR THIS FILE
//import React from "react";

// const Message = () => {
//   return (
//     <div className="chat chat-start">
//       <div className="chat-image avater">
//         <div className="w-10 rounded-full">
//           <img src="" alt="img" />
//         </div>
//       </div>
//       <div className="chat-bubble text-white bg-blue-500">Hi whats up</div>
//       <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">12:42</div>
//     </div>
//   );
// };

// export default Message;
