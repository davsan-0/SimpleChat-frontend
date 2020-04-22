import { Client, Message } from "@stomp/stompjs";
import { useSelector } from "react-redux";

import {
  addChatMessage,
  setReadReceiptForUser,
  setOnlineStatusForUserInChat,
} from "../pages/ChatListPage/chatsSlice";

let client = null;

export const getClient = () => {
  return client;
};

export function startWebsocket(dispatch, chats) {
  const wsClient = new Client({
    brokerURL: process.env.REACT_APP_WS_URL,
    debug: function (str) {
      if (process.env.NODE_ENV === "development") {
        console.log(str);
      }
    },
    reconnectDelay: 12000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
  });

  wsClient.onConnect = function (frame) {
    const ids = Object.keys(chats);

    ids.forEach((id) => {
      wsClient.subscribe(`/ws/topic/chats/${id}/message`, (message) => {
        dispatch(addChatMessage(JSON.parse(message.body)));
      });
      wsClient.subscribe(`/ws/topic/chats/${id}/readreceipt`, (message) => {
        const messageObj = JSON.parse(message.body);
        messageObj.chatId = id;
        dispatch(setReadReceiptForUser(messageObj));
      });
      wsClient.subscribe(`/ws/topic/chats/${id}/online`, (message) => {
        const payload = JSON.parse(message.body);
        payload.chatId = id;
        dispatch(setOnlineStatusForUserInChat(payload));
      });
    });
  };

  wsClient.activate();

  client = wsClient;
}

export function stopWebsocket() {
  if (client) {
    client.deactivate();
    client = null;
  }
}
