import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const authHeader = () => {
  return {
    headers: { Authorization: localStorage.getItem("access_token") },
  };
};

export const getAccessToken = (providerToken, provider) => {
  return api.post("/auth/providertoken", {
    token: providerToken,
    provider: provider,
  });
};

export const getMe = () => {
  return api.get("/users/me", authHeader());
};

export const getMyChats = () => {
  return api.get("/users/me/chats", authHeader());
};

export const getAllUsers = (search) => {
  return api.get(`/users?search=${search}`, authHeader());
};

export const getUser = (id) => {
  return api.get(`/users/${id}`, authHeader());
};

export const getChatWithId = (id) => {
  return api.get(`/chats/${id}`, authHeader());
};

export const getAllChatsWithUserId = (id) => {
  return api.get(`/users/${id}/chats`, authHeader());
};

export const getChatMessages = (chatId, sort) => {
  return api.get(`/chats/${chatId}/messages?sort=${sort}`, authHeader());
};

export const setLastRead = (chatId, messageId) => {
  return api.put(
    `/chats/${chatId}/lastmessageread`,
    { message_id: messageId },
    authHeader()
  );
};

export const createNewChat = (name, participantIds) => {
  if (name === "") name = undefined;
  return api.post(
    "/chats",
    {
      name: name,
      participants: participantIds,
    },
    authHeader()
  );
};
