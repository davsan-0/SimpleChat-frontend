import { Client, Message } from "@stomp/stompjs";
import { useSelector } from "react-redux";

import { addChatMessage } from "../pages/ChatListPage/chatsSlice";

// TODO: Get all chat ids from redux store and subscribe

export default function startWebsocket(dispatch, chats) {
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
        dispatch(addChatMessage(JSON.parse(message.body)));
      });
    });
  };

  client.activate();

  return client;
}
