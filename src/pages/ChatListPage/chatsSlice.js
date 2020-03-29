import _ from "lodash";
import { createSlice } from "@reduxjs/toolkit";

export const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    value: {}
  },
  reducers: {
    setChats: (state, action) => {
      const chatArr = action.payload.map(chat => {
        if (chat.name === undefined) {
          // Chat name becomes comma separated string of names of participants
          chat.name = chat.participants.map(n => n.name + ", ").join("");
          chat.name = chat.name.slice(0, chat.name.length - 2);
        }
        return chat;
      });

      state.value = _.keyBy(chatArr, chat => chat.id); // Transform Array into Map with id as key
    },
    setChatMessages: (state, action) => {
      if (action.payload.length === 0) return;

      const { chatId } = action.payload[0];
      if (state.value[chatId]) {
        state.value[chatId].messages = action.payload;
      }
    },
    addChatMessage: (state, action) => {
      const { chatId } = action.payload;
      if (state.value[chatId] && state.value[chatId].messages) {
        state.value[chatId].messages.push(action.payload);
      } else {
        state.value[chatId].messages = [action.payload];
      }
      state.value[chatId].hasUnread = true;
    },
    setHasRead: (state, action) => {
      const chatId = action.payload;
      state.value[chatId].hasUnread = false;
    }
  }
});

export const {
  setChats,
  setChatMessages,
  addChatMessage,
  setHasRead
} = chatsSlice.actions;

export const selectChats = state => state.chats.value;
export const selectMessages = id => state =>
  state.chats.value[id] && state.chats.value[id].messages;
export const selectHasUnread = id => state =>
  state.chats.value[id] &&
  state.chats.value[id].messages &&
  state.chats.value[id].messages.hasUnread;

export default chatsSlice.reducer;
