import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const ordersSlice = createSlice({
  name: 'appOrders',
  initialState: {
    orders: [],
  },
  reducers: {
    setOrders: (state, action: PayloadAction<[]>) => {
      state.orders = action.payload;
    },
  },
});

export const { setOrders } = ordersSlice.actions;
export const selectOrders = (state: RootState) => state.appOrdersReducer.orders;

export default ordersSlice.reducer;
