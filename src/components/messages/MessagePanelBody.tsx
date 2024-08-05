import { FC } from "react";

import { MessageType, User } from "@/utils/types";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  messages: MessageType[];
  user: User;
};

const MessagePanelBody: FC<Props> = ({ messages, user }) => {
  return (
    <ScrollArea scrollToBottom={true} className='flex-1 my-3 overflow-y-auto'>
      <div className='flex flex-col gap-2 ml-2 mr-4'>
        {messages.length > 0 &&
          messages.map((message) => {
            const isUserMessage = message.author.id === user?.id;
            return (
              <div
                key={message.id}
                className={`break-words py-2.5 px-3 rounded-3xl text-sm max-w-xs md:max-w-md ${
                  isUserMessage
                    ? "ml-auto bg-blue-500 text-neutral-100"
                    : "mr-auto bg-neutral-400 text-neutral-900"
                }`}
              >
                <p>{message.content}</p>
              </div>
            );
          })}
      </div>
    </ScrollArea>
  );
};

export default MessagePanelBody;
