import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";

import { AppDispatch } from "@/store";
import { ConversationType, MessageEventPayload } from "@/utils/types";
import MessagePanel from "@/components/messages/MessagePanel";
import { SocketContext } from "@/utils/contexts/SocketContext";
import { addConversation, updateConversation } from "@/store/conversationSlice";
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
    socket.emit("onClientConnect", {
      conversationId: parseInt(id!),
    });
    socket.on("onMessage", (payload: MessageEventPayload) => {
      dispatch(addMessage(payload));
      dispatch(updateConversation(payload));
    });
    socket.on("onConversation", (payload: ConversationType) => {
      console.log("Received onConversation Event");
      console.log(payload);
      dispatch(addConversation(payload));
    });
    return () => {
      socket.off("onMessage");
      socket.off("onConversation");
    };
  }, [dispatch, id, socket]);

  return <MessagePanel />;
};

export default ConversationChannelPage;
