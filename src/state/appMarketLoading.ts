import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const marketLoadingSlice = createSlice({
  name: 'appMarketLoading',
  initialState: {
    marketLoading: false
  },
  reducers: {
    setMarketLoading: (state, action: PayloadAction<boolean>) => {
      state.marketLoading = action.payload;
    },
  }
});

export const { setMarketLoading } = marketLoadingSlice.actions;
export const selectMarketLoading = (state: RootState) => state.appMarketLoadingReducer.marketLoading;

export default marketLoadingSlice.reducer;
