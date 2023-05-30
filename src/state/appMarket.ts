import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const marketSlice = createSlice({
  name: 'appMarket',
  initialState: {
    market: {
      token: 'ETH',
      price: ''
    }
  },
  reducers: {
    setMarket: (state, action: PayloadAction<{ token: string, price: string }>) => {
      state.market = action.payload;
    },
  }
});

export const { setMarket } = marketSlice.actions;
export const selectMarket = (state: RootState) => state.appMarketReducer.market;

export default marketSlice.reducer;
