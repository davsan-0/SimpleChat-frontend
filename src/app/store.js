import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../pages/LoginPage/loginSlice";

export default configureStore({
  reducer: { user: loginReducer }
});
