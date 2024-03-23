import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentVideo: null,
    loading: false,
    error: false
}

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccessed: (state, action) => {
            state.currentVideo = action.payload;
            state.loading = false;
        },
        fetchFailured: (state) => {
            state.loading = false;
            state.error = true;
        },
        like: (state, action) => {
            if (!state.currentVideo.likes.includes(action.payload)) {
                state.currentVideo.likes.push(action.payload);
                const userIndex = state.currentVideo.dislikes.findIndex(userId => userId === action.payload);
                if (userIndex !== -1) state.currentVideo.dislikes.splice(userIndex, 1);
            }
        },
        dislike: (state, action) => {
            if (!state.currentVideo.dislikes.includes(action.payload)) {
                state.currentVideo.dislikes.push(action.payload);
                const userIndex = state.currentVideo.likes.findIndex(userId => userId === action.payload);
                if (userIndex !== -1) state.currentVideo.likes.splice(userIndex, 1);
            }
        }
    }
});

export const { fetchStart, fetchSuccessed, fetchFailured, like, dislike } = videoSlice.actions

export default videoSlice.reducer