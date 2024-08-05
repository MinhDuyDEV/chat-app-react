import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { MessageEventPayload, MessageType } from "@/utils/types";
import { getConversationMessages } from "@/utils/api";
import MessagePanel from "@/components/messages/MessagePanel";
import { SocketContext } from "@/utils/contexts/SocketContext";

const ConversationChannelPage = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { id } = useParams();
  const socket = useContext(SocketContext);
  useEffect(() => {
    const conversationId = parseInt(id!);
    getConversationMessages(conversationId)
      .then(({ data }) => {
        setMessages(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    socket.on("connected", () => console.log("Connected to socket"));
    socket.on("onMessage", (data: MessageEventPayload) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socket.off("connected");
      socket.off("onMessage");
    };
  }, [socket]);

  return <MessagePanel messages={messages} />;
};

export default ConversationChannelPage;
