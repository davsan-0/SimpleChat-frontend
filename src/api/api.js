import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

export const getChatWithId = id => {
  return api.get("/chats/" + id);
};

export const getAllChatsWithUserId = id => {
  return api.get("/users/" + id + "/chats");
};
