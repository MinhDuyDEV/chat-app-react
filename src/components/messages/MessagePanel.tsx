import { FC, useContext } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/store";
import { MessageType } from "@/utils/types";
import MessagePanelBody from "./MessagePanelBody";
import MessagePanelHeader from "./MessagePanelHeader";
import MessagePanelFooter from "./MessagePanelFooter";
import { AuthContext } from "@/utils/contexts/AuthContext";

type Props = {
  messages: MessageType[];
};

const MessagePanel: FC<Props> = ({ messages }) => {
  const { user } = useContext(AuthContext);
  const loading = useSelector((state: RootState) => state.messages.loading);
  if (!user) return null;

  return (
    <div className='flex flex-col w-full py-2 my-4 overflow-hidden rounded-lg bg-neutral-800'>
      <MessagePanelHeader />
      {loading ? (
        <div className='flex items-center justify-center w-full h-full'>
          <div className='p-2 border border-t-0 rounded-full animate-spin'></div>
        </div>
      ) : (
        <MessagePanelBody messages={messages} user={user} />
      )}
      <MessagePanelFooter />
    </div>
  );
};

export default MessagePanel;
