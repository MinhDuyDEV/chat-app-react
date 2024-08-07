import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getConversationMessages } from "@/utils/api";
import { ConversationMessage, MessageEventPayload } from "@/utils/types";

export interface MessagesState {
  messages: ConversationMessage[];
  loading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
};

export const fetchMessagesThunk = createAsyncThunk(
  "messages/fetch",
  (id: number) => {
    return getConversationMessages(id);
  }
);

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<MessageEventPayload>) => {
      const { conversation, ...content } = action.payload;
      const conversationMessage = state.messages.find(
        (cm) => cm.id === conversation.id
      );
      conversationMessage?.messages.push(content);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesThunk.fulfilled, (state, action) => {
        const { id } = action.payload.data;
        const index = state.messages.findIndex((cm) => cm.id === id);
        index !== -1
          ? (state.messages[index] = action.payload.data)
          : state.messages.push(action.payload.data);
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

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
