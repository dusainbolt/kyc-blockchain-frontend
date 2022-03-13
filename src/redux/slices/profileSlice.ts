import { updateProfileAction } from '@redux/action/profileAction';
import { getPersistConfig } from '@redux/storage';
import { createAction, createSlice } from '@reduxjs/toolkit';
import { ProfileSlice } from '@type/profile';
import { HYDRATE } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import { RootState } from '../reducer';
import { AppState } from '../store';

const initialState: ProfileSlice = {
  loadingProfile: false,
  loadingUpdate: false,
};

const hydrate = createAction<AppState>(HYDRATE);

const profileSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    getProfileStart: (state: ProfileSlice) => {
      state.loadingProfile = true;
    },
    getProfileSuccess: (state: ProfileSlice, { payload }: any) => {
      state.loadingProfile = false;
      state.profile = payload;
    },
    getProfileError: (state: ProfileSlice) => {
      state.loadingProfile = false;
    },
    updateProfileStart: (state: ProfileSlice, { payload }: updateProfileAction) => {
      state.loadingUpdate = !!payload.address;
    },
    updateProfileSuccess: (state: ProfileSlice) => {
      state.loadingUpdate = false;
    },
    updateProfileError: (state: ProfileSlice) => {
      state.loadingUpdate = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload?.profileSlice,
      };
    });
  },
});

export const getProfileSlice = (state: RootState): ProfileSlice => state.profileSlice;

export const {
  getProfileStart,
  getProfileSuccess,
  getProfileError,
  updateProfileError,
  updateProfileSuccess,
  updateProfileStart,
} = profileSlice.actions;

export default persistReducer(getPersistConfig('profileSlice', { whitelist: ['profile'] }), profileSlice.reducer);
