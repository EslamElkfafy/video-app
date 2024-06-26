import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: null,
  loading: false,
  error: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    startLogin: (state) => {
        state.loading = true
    },
    successedLogin: (state, actions) => {
        state.loading = false;
        state.currentUser = actions.payload;
    },
    failuredLogin: (state) => {
        state.loading = false
        state.error = true
    },
    logout: (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = false;
    },
    subscription: (state, action) => {
      if (state.currentUser.subscribedUsers.includes(action.payload)) {
        state.currentUser.subscribedUsers.splice(state.currentUser.subscribedUsers.findIndex(channelId => channelId === action.payload), 1);
      } else {
        state.currentUser.subscribedUsers.push(action.payload);
      }
    }
  },
})

export const { startLogin, successedLogin, failuredLogin, logout, subscription } = userSlice.actions

export default userSlice.reducer