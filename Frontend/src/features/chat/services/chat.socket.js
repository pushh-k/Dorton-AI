import { io } from "socket.io-client";
import { API_BASE_URL } from "../../../app/apiBase.js";


export const intializesocketconnection=()=>{
    const socket =io(API_BASE_URL,{

        withCredentials:true
    }
    )


    socket.on('connect',()=>{
        

    })
}