import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

export const getProfileData = createAsyncThunk(
  "profile/me",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/profile/me");
      return response;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const createProfile = createAsyncThunk(
  "profile/me",
  async ({formData, isEdit}, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/profile", formData);
      return response;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

const initialState = {
  profile: {},
  loading: false,
  error: null
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfile: (state) => {
      state.profile = {};
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: {
    // getProfileData
    [getProfileData.fulfilled]: (state, action) => {
      state.profile = action.payload.data;
      state.loading = false;
      state.error = null;
    },
    [getProfileData.pending]: (state) => {
      state.loading = true;
    },
    [getProfileData.rejected]: (state, action) => {
      state.error = action.meta.response.data;
      state.loading = false;
    },
    // createProfile
    [createProfile.fulfilled]: (state, action) => {
      state.profile = action.payload.data;
      state.loading = false;
      state.error = null;
    },
    [createProfile.pending]: (state) => {
      state.loading = true;
    },
    [createProfile.rejected]: (state, action) => {
      state.error = action.meta.response.data;
      state.loading = false;
    }
  },
});

export const { clearProfile } = profileSlice.actions
export default profileSlice.reducer
