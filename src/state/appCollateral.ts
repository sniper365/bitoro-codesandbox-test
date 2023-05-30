import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const collateralSlice = createSlice({
  name: 'appCollateral',
  initialState: {
    collateral: {
      token: 'USDT',
      price: '1'
    },
  },
  reducers: {
    setCollateral: (state, action: PayloadAction<{ token: string, price: string }>) => {
      state.collateral = action.payload;
    },
  },
});

export const { setCollateral } = collateralSlice.actions;
export const selectCollateral = (state: RootState) => state.appCollateralReducer.collateral;

export default collateralSlice.reducer;
