import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ConversationMessage, ConversationType } from "@/utils/types";
import { getConversationMessages, getConversations } from "@/utils/api";

export interface ConversationsState {
  conversations: ConversationType[];
  messages: ConversationMessage[];
  loading: boolean;
}

const initialState: ConversationsState = {
  conversations: [],
  messages: [],
  loading: false,
};

export const fetchConversationsThunk = createAsyncThunk(
  "conversations/fetch",
  async () => {
    return getConversations();
  }
);

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch",
  async (id: number) => {
    return getConversationMessages(id);
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
      })

      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        const { id } = action.payload.data;
        const index = state.messages.findIndex((cm) => cm.id === id);
        const exists = state.messages.find((cm) => cm.id === id);
        if (exists) {
          state.messages[index] = action.payload.data;
        } else {
          state.messages.push(action.payload.data);
        }
        state.loading = false;
      })
      .addCase(fetchMessagesThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessagesThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addConversation } = conversationsSlice.actions;

export default conversationsSlice.reducer;
