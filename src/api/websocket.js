import { Client, Message } from "@stomp/stompjs";
import { useSelector } from "react-redux";

// TODO: Get all chat ids from redux store and subscribe

export default function startWebsocket(chats) {
  const client = new Client({
    brokerURL: "ws://localhost:8080/ws/chat",
    debug: function(str) {
      console.log(str);
    },
    /*connectHeaders: {
      login: localStorage.getItem("access_token"),
      passcode: localStorage.getItem("access_token"),
      host: localStorage.getItem("access_token")
    },*/
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
  });

  client.onConnect = function(frame) {
    const ids = Object.keys(chats);

    ids.forEach(id => {
      client.subscribe(`/ws/topic/chats/${id}`, function(message) {
        console.log("Message!!");
        console.log(message.body);
      });
      /*client.publish({
        destination: `/ws/app/chats/${id}/message`,
        body: "Test"
      });*/
    });
  };

  client.activate();

  return client;
}
