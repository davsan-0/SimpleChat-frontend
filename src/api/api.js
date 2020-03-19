import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserName, setUserId } from "../app/redux";

const TEMP_USER_ID = "c2d80cae-2e12-4a8c-a7ae-47b74c0a16d7";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

export const getUser = () => {
  api.get(`/users/${TEMP_USER_ID}`);
};

export const getChatWithId = id => {
  return api.get(`/chats/${id}`);
};

export const getAllChatsWithUserId = id => {
  return api.get(`/users/${id}/chats`);
};
