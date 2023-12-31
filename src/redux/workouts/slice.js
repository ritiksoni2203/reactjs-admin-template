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
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(`/workout`);
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
export const addWorkout = createAsyncThunk(
    "addWorkout",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post("/workout", data);
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
export const deleteWorkout = createAsyncThunk(
    "deleteWorkout",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosApi.delete(`/workout/${id}`);
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
export const updateWorkout = createAsyncThunk(
    "updateWorkout",
    async ({ data, id }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put(`/workout/${id}`, data);
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
        [addWorkout.pending]: (state) => {
            state.status = "loading";
        },
        [addWorkout.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.clubData = action.payload;
            state.isSuccess = true;
        },
        [addWorkout.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        [deleteWorkout.pending]: (state) => {
            state.status = "loading";
        },
        [deleteWorkout.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.reload = action.payload;
        },
        [deleteWorkout.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        [updateWorkout.pending]: (state) => {
            state.status = "loading";
        },
        [updateWorkout.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.reload = action.payload;
        },
        [updateWorkout.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        }
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