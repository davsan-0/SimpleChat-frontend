import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "user",
  initialState: {
    id: "",
    imageUrl: "",
    name: "",
    isLoggedIn: false,
    fetching: false,
    error: false,
    errorMessage: "",
  },
  reducers: {
    fetching: (state) => {
      state.fetching = true;
    },
    error: (state, action) => {
      state.fetching = false;
      state.error = true;
      state.errorMessage = action.payload;
    },
    login: (state, action) => {
      const { id, imageUrl, name } = action.payload;
      return {
        ...state,
        id: id,
        imageUrl: imageUrl,
        name: name,
        isLoggedIn: true,
        fetching: false,
      };
    },
    logout: () => {
      return {
        id: "",
        imageUrl: "",
        name: "",
        isLoggedIn: false,
        fetching: false,
      };
    },
  },
});

export const { fetching, error, login, logout } = loginSlice.actions;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserId = (state) => state.user.id;
export const selectUserName = (state) => state.user.name;
export const selectUserImageUrl = (state) => state.user.imageUrl;
export const selectFetching = (state) => state.user.fetching;

export default loginSlice.reducer;
