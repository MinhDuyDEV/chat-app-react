import { FC, useContext } from "react";
import { MonitorDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ConversationType } from "@/utils/types";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CreateConversationModal from "@/components/modals/CreateConversationModal";
import { AuthContext } from "@/utils/contexts/AuthContext";

type Props = {
  conversations: ConversationType[];
};

const ConversationSidebar: FC<Props> = ({ conversations }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const getDisplayUser = (conversation: ConversationType) => {
    return conversation.creator.id === user?.id
      ? conversation.recipient
      : conversation.creator;
  };

  return (
    <div className='h-full'>
      <div className='flex h-full rounded-lg bg-neutral-800'>
        <aside className='flex flex-col w-[400px] h-full rounded-lg'>
          <header className='flex h-[80px] w-full items-center justify-between p-3'>
            <h1 className='text-2xl font-bold'>Chats</h1>
            <CreateConversationModal />
          </header>
          <Separator className='bg-neutral-600' />
          <ScrollArea className='flex-1 overflow-auto'>
            <div className='flex flex-col pl-2 pr-4 my-2 bg-neutral-800'>
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className='flex gap-2 p-2 transition-all rounded-md cursor-pointer hover:bg-neutral-700'
                  onClick={() => navigate(`/conversations/${conversation.id}`)}
                >
                  <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col'>
                    <p className='font-bold'>
                      {`${getDisplayUser(conversation).firstName} ${
                        getDisplayUser(conversation).lastName
                      }`}
                    </p>
                    <p className='text-sm text-neutral-400'>Sample Text</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className='p-3 text-center'>
            <p className='flex items-center justify-center gap-4 px-1 py-2 rounded-md cursor-pointer hover:bg-neutral-600'>
              <MonitorDown />
              Try Messenger for Windows
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ConversationSidebar;
