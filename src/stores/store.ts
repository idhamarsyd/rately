import { configureStore } from "@reduxjs/toolkit";
import movieSlice from "./moviesSlice";
import commentsSlice from "./commentsSlice";
// ...

export const store = configureStore({
  reducer: {
    movies: movieSlice,
    comments: commentsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
