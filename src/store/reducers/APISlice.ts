import { createSlice } from '@reduxjs/toolkit';
import { DefaultAPI } from '@src/lib/constants/editor';

const initialState = {
  URL: DefaultAPI,
};

const APISlice = createSlice({
  name: 'URL',
  initialState,
  reducers: {
    setURL: (state, action) => {
      state.URL = action.payload;
    },
  },
});

export const { setURL } = APISlice.actions;
export default APISlice.reducer;
