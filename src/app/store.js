import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../pages/LoginPage/loginSlice";
import chatsReducer from "../pages/ChatListPage/chatsSlice";

export default configureStore({
  reducer: { user: loginReducer, chats: chatsReducer }
});
