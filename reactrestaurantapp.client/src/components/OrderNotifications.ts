//import { useState, useEffect } from "react";
//import { HubConnectionBuilder } from "@microsoft/signalr";

//const OrderNotification = () => {
//    const [messages, setMessages] = useState([]);

//    useEffect(() => {
//        const connection = new HubConnectionBuilder().withUrl("http://localhost:5000/notificationhub").build();
//        connection.on("receiveMessage", (par: string) => {
//            setMessages(prev => [...prev,par])
//            console.log(par);
//        })

//    },[])

//}