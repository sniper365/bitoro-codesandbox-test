import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const positionSlice = createSlice({
  name: 'appPosition',
  initialState: {
    position: {},
  },
  reducers: {
    setPosition: (state, action: PayloadAction<{}>) => {
      state.position = action.payload;
    },
  },
});

export const { setPosition } = positionSlice.actions;
export const selectPosition = (state: RootState) => state.appPositionReducer.position;

export default positionSlice.reducer;
