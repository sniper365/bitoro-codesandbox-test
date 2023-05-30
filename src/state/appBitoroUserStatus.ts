import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

const bitoroUserStatus = createSlice({
  name: 'appBitoroUserStatus',
  initialState: {
    userStatus: {
      isChecked: false,
      bitoroAddress: '',
      text: ''
    }
  },
  reducers: {
    setUserStatus: (state, action: PayloadAction<{ isChecked: boolean, bitoroAddress: string, text: string }>) => {
      state.userStatus = action.payload;
    },
  }
});

export const { setUserStatus } = bitoroUserStatus.actions;
export const selectUserStatus = (state: RootState) => state.appBitoroUserStatusReducer.userStatus;

export default bitoroUserStatus.reducer;
