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

const sliceName = 'profileSlice';

const profileSlice = createSlice({
  name: sliceName,
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
    requestKycStart: (state: ProfileSlice) => {
      state.loadingUpdate = true;
    },
    requestKycSuccess: (state: ProfileSlice, { payload }: any) => {
      state.loadingUpdate = false;
      state.profile = payload;
    },
    requestKycError: (state: ProfileSlice) => {
      state.loadingUpdate = false;
    },
    logoutProfile: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state, action) => {
      return {
        ...state,
        ...action.payload[sliceName],
      };
    });
  },
});

export const getProfileSlice = (state: RootState): ProfileSlice => state[sliceName];

export const {
  getProfileStart,
  getProfileSuccess,
  getProfileError,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileError,
  requestKycStart,
  requestKycSuccess,
  requestKycError,
  logoutProfile,
} = profileSlice.actions;

export default persistReducer(getPersistConfig(sliceName, { whitelist: ['profile'] }), profileSlice.reducer);
