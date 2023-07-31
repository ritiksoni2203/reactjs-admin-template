import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import { axiosApi } from "../../helpers/axios";

const initialStates = {
    test: [],
    data: [],
    status: null,
    process: null,
    reload: [],
    clubData: [],
    isSuccess: false,
    clubProfiles: {},
    totalCount: 0,
};

// ** Clubs List
export const workoutsList = createAsyncThunk(
    "workoutsList",
    async ({ page, limit, search }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(`/workout`);
            console.log('res', response.data);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

// ** Clubs List For Introducer
export const activeClubsListApi = createAsyncThunk(
    "activeClubsListApi",
    async ({ page, limit, search }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(`pokemon?limit=10&offset=0`);
            return response.data;
        } catch (error) {
            if (!error.response) {
                throw error;
            }
            toast.error(error.response.data.message);
            return rejectWithValue(error.response.data);
        }
    }
);

// ** Add Club
export const addClub = createAsyncThunk(
    "addClub",
    async ({ data }, { rejectWithValue }) => {
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        try {
            const response = await axiosApi.post("/club/createClub", data, config);
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

// ** Delete Club
export const deleteClub = createAsyncThunk(
    "deleteClub",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosApi.delete(`/club/deleteclubprofile/${id}`);
            toast.success(response.data.msg);
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

// ** Update Club
export const updateClubApi = createAsyncThunk(
    "updateClubApi",
    async ({ data, id }, { rejectWithValue }) => {
        const config = {
            headers: { "content-type": "multipart/form-data" },
        };
        try {
            const response = await axiosApi.put(`/club/updateclubprofile/${id}`, data, config);
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

// ** Club Profile
export const clubProfileApi = createAsyncThunk(
    "clubProfileApi",
    async ({ id }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(`/club/getclubprofile/${id}`);
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

// ** Club Profile
export const activeInactiveClub = createAsyncThunk(
    "activeInactiveClub",
    async ({ active, id }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put(`/club/active-deactiveClubs/${id}`, { isActive: active });
            toast.success(response.data.msg)
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

const workoutSlice = createSlice({
    name: "workout",
    initialState: initialStates,
    extraReducers: {
        [workoutsList.pending]: (state) => {
            state.status = "loading";
        },
        [workoutsList.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.isSuccess = false;
            state.reload = null;
            state.totalCount = action.payload.totalResults;
        },
        [workoutsList.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        [activeClubsListApi.pending]: (state) => {
            state.status = "loading";
        },
        [activeClubsListApi.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.isSuccess = false;
            state.reload = null;
            state.totalCount = action.payload.totalResults;
        },
        [activeClubsListApi.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        [addClub.pending]: (state) => {
            state.status = "loading";
        },
        [addClub.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.clubData = action.payload;
            state.isSuccess = true;
        },
        [addClub.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        [deleteClub.pending]: (state) => {
            state.status = "loading";
        },
        [deleteClub.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.reload = action.payload;
        },
        [deleteClub.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        [updateClubApi.pending]: (state) => {
            state.status = "loading";
        },
        [updateClubApi.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.reload = action.payload;
        },
        [updateClubApi.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        [clubProfileApi.pending]: (state) => {
            state.status = "loading";
        },
        [clubProfileApi.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.clubProfiles = action.payload;
        },
        [clubProfileApi.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        [activeInactiveClub.pending]: (state) => {
            state.status = "loading";
        },
        [activeInactiveClub.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.reload = action.payload;
        },
        [activeInactiveClub.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
    },
    reducers: {
        clearClubProfile(state) {
            state.clubProfiles = []
        },
        clearClubReload(state) {
            state.reload = []
        },
        clearClubList(state) {
            state.data = []
        }
    }
});

export const { clearClubProfile, clearClubReload, clearClubList } = workoutSlice.actions

const { reducer } = workoutSlice;

export default reducer;