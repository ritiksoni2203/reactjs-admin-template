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
export const goalsList = createAsyncThunk(
    "goalsList",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosApi.get(`/goals`);
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
export const addGoal = createAsyncThunk(
    "addGoal",
    async ({ data }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.post("/goals", data);
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
export const deletegoal = createAsyncThunk(
    "deletegoal",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosApi.delete(`/goal/${id}`);
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
export const updateGoal = createAsyncThunk(
    "updateGoal",
    async ({ data, id }, { rejectWithValue }) => {
        try {
            const response = await axiosApi.put(`/goals/${id}`, data);
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

const goalSlice = createSlice({
    name: "goal",
    initialState: initialStates,
    extraReducers: {
        [goalsList.pending]: (state) => {
            state.status = "loading";
        },
        [goalsList.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.data = action.payload;
            state.isSuccess = false;
            state.reload = null;
            state.totalCount = action.payload.totalResults;
        },
        [goalsList.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        [addGoal.pending]: (state) => {
            state.status = "loading";
        },
        [addGoal.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.clubData = action.payload;
            state.isSuccess = true;
        },
        [addGoal.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        [deletegoal.pending]: (state) => {
            state.status = "loading";
        },
        [deletegoal.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.reload = action.payload;
        },
        [deletegoal.rejected]: (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        },
        [updateGoal.pending]: (state) => {
            state.status = "loading";
        },
        [updateGoal.fulfilled]: (state, action) => {
            state.status = "succeeded";
            state.reload = action.payload;
        },
        [updateGoal.rejected]: (state, action) => {
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

export const { clearClubProfile, clearClubReload, clearClubList } = goalSlice.actions

const { reducer } = goalSlice;

export default reducer;