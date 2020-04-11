import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "user",
  initialState: {
    value: {
      id: "",
      imageUrl: "",
      name: "",
      isLoggedIn: false,
      fetching: false,
      error: false,
      errorMessage: "",
    },
  },
  reducers: {
    fetching: (state) => {
      state.value.fetching = true;
    },
    error: (state, action) => {
      state.value.fetching = false;
      state.value.error = true;
      state.value.errorMessage = action.payload;
    },
    login: (state, action) => {
      const { id, imageUrl, name } = action.payload;
      state.value = {
        ...state.value,
        id: id,
        imageUrl: imageUrl,
        name: name,
        isLoggedIn: true,
        fetching: false,
      };
    },
    /*login: state => {
      state.value.isLoggedIn = true;
    },*/
    logout: (state) => {
      localStorage.removeItem("access_token");
      state.value = {
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

export const selectIsLoggedIn = (state) => state.user.value.isLoggedIn;
export const selectUserId = (state) => state.user.value.id;
export const selectUserName = (state) => state.user.value.name;
export const selectFetching = (state) => state.user.value.fetching;

export default loginSlice.reducer;
