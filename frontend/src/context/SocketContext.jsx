import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

export const SocketContext = createContext()

export const useSocketContext = () => {
  return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuthContext()
    useEffect(() => {
        if(authUser){
             const socket = io("http://localhost:8080",{
                query:{userId:authUser._id}
             })
             setSocket(socket)

               //socket.on is an event listener, can be used to listen in both client and server side

             socket.on("getOnlineUsers", (users) => {
                console.log("🚀 ~ socket.on ~ users:", users)
                setOnlineUsers(users)
             })

             return () => socket.close()
        }else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    },[authUser])
  return <SocketContext.Provider value={{socket, onlineUsers}}>{children}</SocketContext.Provider>;
};