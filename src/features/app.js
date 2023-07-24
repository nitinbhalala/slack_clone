import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    value: 0,
    reloadTime: 0
  },
  reducers: {
    enterRoom: (state, action) => {
      state.channelId = action.payload.channelId;
      state.channelName = action.payload.channelName;
    },
    channelList: (state, action) => {
      state.ChannelArray = action.payload.ChannelArray;
    },
    messageList: (state, action) => {
      state.MessageArray = action.payload.MessageArray;
    },
    reloadPage: (state, action) => {
      state.reloadTime = action.payload;
    },
  },
});

export const { enterRoom, channelList, messageList, reloadPage } = appSlice.actions;

export const selectChannelId = state => state.app.channelId;
export const selectchannelName = state => state.app.channelName;
export const selectChannelArray = state => state.app.ChannelArray;
export const selectMessageArray = state => state.app.MessageArray;
export const selectReload = state => state.app.reload;
export const reloadtime = state => state.app.reloadTime;

export default appSlice.reducer;
