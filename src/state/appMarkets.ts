import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const marketsSlice = createSlice({
  name: 'appMarkets',
  initialState: {
    markets: [] as any[],
  },
  reducers: {
    setMarkets: (state, action: PayloadAction<any[]>) => {
      state.markets = action.payload;
    },
  },
});

export const { setMarkets } = marketsSlice.actions;
export const selectMarkets = (state: RootState) => state.appMarketsReducer.markets;

export default marketsSlice.reducer;
