import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    searchTerm: '',
    subreddit: 'r/memes'
} 

const redditSlice = createSlice({
    name: 'reddit',
    initialState,
    reducers: {
        setPosts(state, action) {
            state.posts = action.payload;
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload;
        },
        setSubreddit(state, action) {
            state.subreddit = action.payload;
            state.searchTerm = '';
        }
    }
})

export const {
    setPosts, setSearchTerm, setSubreddit
} = redditSlice.actions

const redditReducer = redditSlice.reducer
export default redditReducer