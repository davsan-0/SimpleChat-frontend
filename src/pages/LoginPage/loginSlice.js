import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "user",
  initialState: {
    value: { id: "", imageUrl: "", name: "", isLoggedIn: false }
  },
  reducers: {
    login: (state, action) => {
      const { googleId, imageUrl, name } = action.payload;
      state.value = {
        ...state.value,
        id: googleId,
        imageUrl: imageUrl,
        name: name,
        isLoggedIn: true
      };
    },
    logout: state => {
      state.value = { id: "", imageUrl: "", name: "", isLoggedIn: false };
    }
  }
});

export const { login, logout } = loginSlice.actions;

export const selectIsLoggedIn = state => state.user.value.isLoggedIn;

export default loginSlice.reducer;
