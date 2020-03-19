import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: { id: "", name: "" }
  },
  reducers: {
    setUserName: (state, action) => {
      state["name"] = action.payload;
    },
    setUserId: (state, action) => {
      state["id"] = action.payload;
    }
  }
});

export const { setUserName, setUserId } = userSlice.actions;

export default userSlice.reducer;
