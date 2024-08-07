import { useContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { RootState } from "@/store";
import MessagePanelBody from "./MessagePanelBody";
import MessagePanelHeader from "./MessagePanelHeader";
import MessagePanelFooter from "./MessagePanelFooter";
import { AuthContext } from "@/utils/contexts/AuthContext";
import { formatConversationMessages } from "@/utils/format";

const MessagePanel = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { loading, messages: conversationMessages } = useSelector(
    (state: RootState) => state.messages
  );
  if (!user) return null;

  return (
    <div className='flex flex-col w-full py-2 my-4 overflow-hidden rounded-lg bg-neutral-800'>
      <MessagePanelHeader />
      {loading ? (
        <div className='flex items-center justify-center w-full h-full'>
          <div className='p-2 border border-t-0 rounded-full animate-spin'></div>
        </div>
      ) : (
        <MessagePanelBody
          messages={formatConversationMessages(conversationMessages, id)}
          user={user}
        />
      )}
      <MessagePanelFooter />
    </div>
  );
};

export default MessagePanel;
