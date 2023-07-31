import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { axiosApi } from "../../helpers/axios";

const initialStates = {
  loginData: [],
  registerData: [],
  reload: [],
  status: null,
  isSuccess: false,
};

// ** Login
export const login = createAsyncThunk(
  "login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/auth/login", data);
      if (response) {
        localStorage.setItem("access", response.data.token);
        axiosApi.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.tokens.access.token}`;
        toast.success(response.data.message);
      }
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// ** Register
export const register = createAsyncThunk(
  "register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosApi.post("/auth/register", data);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// ** Login Profile
export const loginProfile = createAsyncThunk(
  "loginProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("/auth/accessToken");
      toast.success(response.data.message);
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Dashboard Count For Super Admin
export const dashboardCount = createAsyncThunk(
  "dashboardCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/SuperAdmin/deshboardCount?yearOfIntroducer=${new Date().getFullYear()}&yearOfUser=${new Date().getFullYear()}`);
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// Dashboard Count For Introducer
export const dashboardCountForIntroducer = createAsyncThunk(
  "dashboardCountForIntroducer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get(`/auth/dashboardCount?year=${new Date().getFullYear()}`);
      return response.data.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      toast.error(error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// ** Create Slice
const authSlice = createSlice({
  name: "auth",
  initialState: initialStates,
  extraReducers: {
    [login.pending]: (state) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.loginData = action.payload;
    },
    [login.rejected]: (state) => {
      state.status = "failed";
    },
    [register.pending]: (state) => {
      state.status = "loading";
    },
    [register.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.loginData = action.payload;
    },
    [register.rejected]: (state) => {
      state.status = "failed";
    },
    [loginProfile.pending]: (state) => {
      state.process = "loading";
    },
    [loginProfile.fulfilled]: (state, action) => {
      state.process = "succeeded";
      state.ProfileData = action.payload;
    },
    [loginProfile.rejected]: (state) => {
      state.status = "failed";
    },
    [dashboardCount.pending]: (state) => {
      state.status = "loading";
    },
    [dashboardCount.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.dashboard = action.payload;
      state.isSuccess = false
    },
    [dashboardCount.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [dashboardCountForIntroducer.pending]: (state) => {
      state.status = "loading";
    },
    [dashboardCountForIntroducer.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.dashboardForIntroducer = action.payload;
      state.isSuccess = false
    },
    [dashboardCountForIntroducer.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  }
});

const { reducer } = authSlice;

export default reducer;
