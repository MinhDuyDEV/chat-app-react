import { ConversationMessage } from "@/utils/types";

export const formatConversationMessages = (
  conversationMessages: ConversationMessage[],
  id: string | undefined
) => {
  return (
    conversationMessages.find((m) => m.id === parseInt(id!))?.messages || []
  );
};
