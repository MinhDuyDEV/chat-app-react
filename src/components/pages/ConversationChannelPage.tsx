import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { MessageType } from "@/utils/types";
import { getConversationMessages } from "@/utils/api";
import MessagePanel from "@/components/messages/MessagePanel";

const ConversationChannelPage = () => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const { id } = useParams();
  useEffect(() => {
    const conversationId = parseInt(id!);
    getConversationMessages(conversationId)
      .then(({ data }) => {
        setMessages(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return <MessagePanel messages={messages} />;
};

export default ConversationChannelPage;
