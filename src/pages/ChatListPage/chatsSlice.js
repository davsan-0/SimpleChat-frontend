import _ from "lodash";
import { createSlice } from "@reduxjs/toolkit";

export const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    fetching: false,
    chats: {},
  },
  reducers: {
    setChats: (state, action) => {
      const chatArr = action.payload.map((chat) => {
        if (chat.name === undefined) {
          // Chat name becomes comma separated string of names of participants
          chat.name = Object.values(chat.participants)
            .map((n) => n.name + ", ")
            .join("");
          chat.name = chat.name.slice(0, chat.name.length - 2);
        }
        chat.participants = _.keyBy(chat.participants, (user) => user.id);
        return chat;
      });

      state.chats = _.keyBy(chatArr, (chat) => chat.id); // Transform Array into Map with id as key
      state.fetching = false;
    },
    setChatMessages: (state, action) => {
      if (action.payload.length === 0) return;

      const { chatId } = action.payload[0];
      if (state.chats[chatId]) {
        state.chats[chatId].messages = action.payload;
      }
    },
    addChatMessage: (state, action) => {
      const message = action.payload;
      const chatId = message.chatId;
      const authorId = message.author.id;
      const author = state.chats[chatId]?.participants[authorId];
      message.author = author;

      if (state.chats[chatId]?.messages) {
        let i = state.chats[chatId].messages.length;
        state.chats[chatId].messages.push(message);
      } else {
        state.chats[chatId].messages = [message];
      }
      state.chats[chatId].latestMessage = message;

      if (!state.chats[chatId].focused) {
        state.chats[chatId].hasUnread = true;
        state.chats[chatId].unreadAmount = state.chats[chatId].unreadAmount
          ? state.chats[chatId].unreadAmount + 1
          : 1;
      }
    },
    // Flag that determines if chat is currently focused
    setFocusedAndClearUnread: (state, action) => {
      const chatId = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId].focused = true;
        state.chats[chatId].hasUnread = false;
        state.chats[chatId].unreadAmount = 0;
      } else {
        console.log(`Error: ${chatId} not found`);
      }
    },
    setUnfocused: (state, action) => {
      const chatId = action.payload;
      if (state.chats[chatId]) {
        state.chats[chatId].focused = false;
      } else {
        console.log(`Error: ${chatId} not found`);
      }
    },
    setReadReceiptForUser: (state, action) => {
      const { chatId, userId, messageId } = action.payload;
      const user = state.chats[chatId].participants[userId];
      user.lastReadMessage = messageId;
      /*if (state.chats[chatId]) {
        // Clears the old readreceipt out, as there should be only one message with a readreceipt from each user
        const oldReadReceipt = state.chats[chatId].readReceiptMap[userId];
        const msgIndex = state.chats[chatId].messageMap[oldReadReceipt];
        const readReceiptArr =
          state.chats[chatId].messages[msgIndex].readReceipts;
        readReceiptArr = readReceiptArr.filter((el) => el.id !== userId);

        // Set new readreceipt
        const newMsgIndex = state.chats[chatId].messageMap[messageId];
        const newReadReceiptArr =
          state.chats[chatId].messages[newMsgIndex].readReceipts;
        newReadReceiptArr.push(user);
      }*/
    },
    reset: () => {
      return { fetching: false, chats: {} };
    },
    setOnlineStatusForUserInChat: (state, action) => {
      const { userId, online, chatId } = action.payload;

      if (state.chats[chatId] && state.chats[chatId].participants[userId]) {
        state.chats[chatId].participants[userId].online = online;
      }
    },
  },
});

export const {
  setChats,
  setChatMessages,
  addChatMessage,
  setFocusedAndClearUnread,
  setUnfocused,
  reset,
  setReadReceiptForUser,
  setOnlineStatusForUserInChat,
} = chatsSlice.actions;

export const selectChats = (state) => state.chats.chats;
export const selectMessages = (id) => (state) =>
  state.chats.chats[id]?.messages;
export const selectHasUnread = (id) => (state) =>
  state.chats.chats[id]?.hasUnread;
export const selectLatestMessage = (id) => (state) =>
  state.chats.chats[id]?.latestMessage;
export const selectParticipants = (id) => (state) =>
  state.chats.chats[id]?.participants;
export const selectFocused = (id) => (state) => state.chats.chats[id]?.focused;

export default chatsSlice.reducer;
