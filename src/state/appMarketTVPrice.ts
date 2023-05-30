import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const marketTVPriceSlice = createSlice({
  name: 'appmarketTVPrice',
  initialState: {
    marketTVPrice: ''
  },
  reducers: {
    setMarketTVPrice: (state, action: PayloadAction<string>) => {
      state.marketTVPrice = action.payload;
    },
  }
});

export const { setMarketTVPrice } = marketTVPriceSlice.actions;
export const selectMarketTVPrice = (state: RootState) => state.appMarketTVPriceReducer.marketTVPrice;

export default marketTVPriceSlice.reducer;
