import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "user",
  initialState: {
    value: { id: "", imageUrl: "", name: "", isLoggedIn: false }
  },
  reducers: {
    login: (state, action) => {
      const { id, imageUrl, name } = action.payload;
      state.value = {
        ...state.value,
        id: id,
        imageUrl: imageUrl,
        name: name,
        isLoggedIn: true
      };
    },
    /*login: state => {
      state.value.isLoggedIn = true;
    },*/
    logout: state => {
      localStorage.removeItem("access_token");
      state.value = {
        id: "",
        imageUrl: "",
        name: "",
        isLoggedIn: false
      };
    }
  }
});

export const { login, logout } = loginSlice.actions;

export const selectIsLoggedIn = state => state.user.value.isLoggedIn;
export const selectUserId = state => state.user.value.id;
export const selectUserName = state => state.user.value.name;

export default loginSlice.reducer;
