import { configureStore } from "@reduxjs/toolkit";

import messageReducer from "@/store/messageSlice";
import conversationReducer from "@/store/conversationSlice";

export const store = configureStore({
  reducer: {
    conversation: conversationReducer,
    messages: messageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
