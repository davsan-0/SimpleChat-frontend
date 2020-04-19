import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.0.8:8080",
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
