import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const orderSlice = createSlice({
  name: 'appOrder',
  initialState: {
    order: {},
  },
  reducers: {
    setOrder: (state, action: PayloadAction<{}>) => {
      state.order = action.payload;
    },
  },
});

export const { setOrder } = orderSlice.actions;
export const selectOrder = (state: RootState) => state.appOrderReducer.order;

export default orderSlice.reducer;
