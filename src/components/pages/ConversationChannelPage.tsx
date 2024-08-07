import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";

import { AppDispatch, RootState } from "@/store";
import MessagePanel from "@/components/messages/MessagePanel";
import { SocketContext } from "@/utils/contexts/SocketContext";
import { fetchMessagesThunk } from "@/store/conversationSlice";
import { MessageEventPayload, MessageType } from "@/utils/types";

const ConversationChannelPage = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { id } = useParams();
  const socket = useContext(SocketContext);
  const dispatch = useDispatch<AppDispatch>();
  const conversationMessages = useSelector(
    (state: RootState) => state.conversation.messages
  );

  useEffect(() => {
    const conversationId = parseInt(id!);
    dispatch(fetchMessagesThunk(conversationId));
  }, [dispatch, id]);

  useEffect(() => {
    setMessages(
      conversationMessages.find((m) => m.id === parseInt(id!))?.messages || []
    );
  }, [conversationMessages, id]);

  useEffect(() => {
    socket.on("onMessage", (data: MessageEventPayload) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socket.off("onMessage");
    };
  }, [socket]);

  return <MessagePanel messages={messages} />;
};

export default ConversationChannelPage;
