import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserName, setUserId } from "../app/redux";

const TEMP_USER_ID = "c2d80cae-2e12-4a8c-a7ae-47b74c0a16d7";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

const authHeader = () => {
  return {
    headers: { Authorization: localStorage.getItem("access_token") }
  };
};

export const getAccessToken = (providerToken, provider) => {
  return api.post("/auth/providertoken", {
    token: providerToken,
    provider: provider
  });
};

export const getMe = () => {
  return api.get("/users/me", authHeader());
};

export const getMyChats = () => {
  return api.get("/users/me/chats", authHeader());
};

export const getUser = () => {
  return api.get(`/users/${TEMP_USER_ID}`, authHeader());
};

export const getChatWithId = id => {
  return api.get(`/chats/${id}`, authHeader());
};

export const getAllChatsWithUserId = id => {
  return api.get(`/users/${id}/chats`, authHeader());
};

export const getChatMessages = (chatId, sort) => {
  return api.get(`/chats/${chatId}/messages?sort=${sort}`, authHeader());
};
