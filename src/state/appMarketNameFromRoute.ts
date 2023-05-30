import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const marketNameFromRouteSlice = createSlice({
  name: 'appMarketNameFromRoute',
  initialState: {
    market: 'ETH'
  },
  reducers: {
    setMarketNameFromRoute: (state, action: PayloadAction<string>) => {
      state.market = action.payload;
    },
  }
});

export const { setMarketNameFromRoute } = marketNameFromRouteSlice.actions;
export const selectMarketNameFromRoute = (state: RootState) => state.appMarketNameFromRouteReducer.market;

export default marketNameFromRouteSlice.reducer;
