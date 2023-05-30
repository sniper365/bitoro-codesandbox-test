import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const bitoroFeeSlice = createSlice({
  name: 'appBitoroFee',
  initialState: {
    accountBitoroFee: 0
  },
  reducers: {
    setAccountBitoroFee: (state, action: PayloadAction<number>) => {
      state.accountBitoroFee = action.payload;
    },
  }
});

export const { setAccountBitoroFee } = bitoroFeeSlice.actions;
export const selectAccountBitoroFee = (state: RootState) => state.appBitoroFeeReducer.accountBitoroFee;

export default bitoroFeeSlice.reducer;
