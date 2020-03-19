import { Client, Message } from "@stomp/stompjs";

export default function startWebsocket() {
  const test = { name: "Davvo" };

  const client = new Client({
    brokerURL: "ws://localhost:8080/chat",
    debug: function(str) {
      console.log(str);
    },
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000
  });

  client.onConnect = function(frame) {
    client.subscribe("/topic/greetings", function(message) {
      console.log("Message " + message.body);
    });
    client.subscribe("/topic/chats", function(message) {
      console.log("Message " + message.body);
    });
    client.publish({
      destination: "/app/hello",
      body: JSON.stringify(test)
    });
  };

  client.activate();

  return client;
}
