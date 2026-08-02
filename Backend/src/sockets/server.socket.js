import { Server } from "socket.io";

let io;


export  function initsocket(httpserver){
    io = new Server(httpserver,{
        cors:{
            origin:[
                'http://localhost:5173',
                'http://localhost:4173',
                'http://localhost:3000',
                /^https:\/\/[a-z0-9-]+\.vercel\.app$/i,
                process.env.FRONTEND_URL?.trim().replace(/\/$/, '')
            ].filter(Boolean),
            credentials:true
        }
    })
  
   console.log("socket io server is running");
   

    io.on("connection",(socket)=>{
        console.log("connected sucessfully , socket-id:"+socket.id);
        
    })
}

export function getIO(){
    if(!io){
        throw new Error("io is not created");
        
    }
    return io;
}