import { createSlice } from "@reduxjs/toolkit";

const likesSlice = createSlice({
    name: "likes",
    initialState: 0,
    reducers: {
        addLike(state){
            state++;
        },
        addDislike(state){
            state--;
        }
    }
})

export const { laddLike, addDislike } = authSlice.actions

export const selectLikes = (state) => state.likes;

export default likesSlice.reducer