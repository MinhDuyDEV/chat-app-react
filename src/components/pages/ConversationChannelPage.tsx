import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";

import { AppDispatch } from "@/store";
import { MessageEventPayload } from "@/utils/types";
import MessagePanel from "@/components/messages/MessagePanel";
import { SocketContext } from "@/utils/contexts/SocketContext";
import { updateConversation } from "@/store/conversationSlice";
import { fetchMessagesThunk, addMessage } from "@/store/messageSlice";

const ConversationChannelPage = () => {
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const conversationId = parseInt(id!);
    dispatch(fetchMessagesThunk(conversationId));
  }, [dispatch, id]);

  useEffect(() => {
    socket.on("onMessage", (payload: MessageEventPayload) => {
      dispatch(addMessage(payload));
      dispatch(updateConversation(payload));
    });
    return () => {
      socket.off("onMessage");
    };
  }, [dispatch, socket]);

  return <MessagePanel />;
};

export default ConversationChannelPage;
