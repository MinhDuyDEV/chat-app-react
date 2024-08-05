import { FC, useContext } from "react";

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
  if (!user) return null;

  return (
    <div className='flex flex-col w-full py-2 my-4 overflow-hidden rounded-lg bg-neutral-800'>
      <MessagePanelHeader />
      <MessagePanelBody messages={messages} user={user} />
      <MessagePanelFooter />
    </div>
  );
};

export default MessagePanel;
