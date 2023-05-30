import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const marketRealtimePriceSlice = createSlice({
  name: 'appmarketRealtimePrice',
  initialState: {
    marketRealtimePrice: ''
  },
  reducers: {
    setMarketRealtimePrice: (state, action: PayloadAction<string>) => {
      state.marketRealtimePrice = action.payload;
    },
  }
});

export const { setMarketRealtimePrice } = marketRealtimePriceSlice.actions;
export const selectMarketRealtimePrice = (state: RootState) => state.appMarketRealtimePriceReducer.marketRealtimePrice;

export default marketRealtimePriceSlice.reducer;
