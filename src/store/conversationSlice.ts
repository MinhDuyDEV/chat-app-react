import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ConversationType, MessageEventPayload } from "@/utils/types";
import { getConversations } from "@/utils/api";

export interface ConversationsState {
  conversations: ConversationType[];
  loading: boolean;
}

const initialState: ConversationsState = {
  conversations: [],
  loading: false,
};

export const fetchConversationsThunk = createAsyncThunk(
  "conversations/fetch",
  async () => {
    return getConversations();
  }
);

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      console.log("🚀 ~ state:", state);
      console.log("🚀 ~ action:", action);
      console.log("addConversation");
    },
    updateConversation: (state, action: PayloadAction<MessageEventPayload>) => {
      const conversation = action.payload.conversation;
      const index = state.conversations.findIndex(
        (c) => c.id === conversation.id
      );
      state.conversations.splice(index, 1);
      state.conversations.unshift(conversation);
      state.conversations[0]["lastMessageSent"] = action.payload.message;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchConversationsThunk.fulfilled, (state, action) => {
        state.conversations = action.payload.data;
        state.loading = false;
      })
      .addCase(fetchConversationsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConversationsThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addConversation, updateConversation } =
  conversationsSlice.actions;

export default conversationsSlice.reducer;
