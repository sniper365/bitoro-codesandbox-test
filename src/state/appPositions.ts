import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const positionsSlice = createSlice({
  name: 'appPositions',
  initialState: {
    positions: [],
  },
  reducers: {
    setPositions: (state, action: PayloadAction<[]>) => {
      state.positions = action.payload;
    },
  },
});

export const { setPositions } = positionsSlice.actions;
export const selectPositions = (state: RootState) => state.appPositionsReducer.positions;

export default positionsSlice.reducer;
