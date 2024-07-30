import { FC } from "react";
import { Edit, MonitorDown } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ConversationType } from "@/utils/types";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";

type Props = {
  conversations: ConversationType[];
};

const ConversationSidebar: FC<Props> = ({ conversations }) => {
  const navigate = useNavigate();

  return (
    <div className='h-full'>
      <div className='flex h-full bg-neutral-800 rounded-lg'>
        <aside className='flex flex-col w-[400px] h-full rounded-lg'>
          <header className='flex h-[80px] w-full items-center justify-between p-3'>
            <h1 className='text-2xl font-bold'>Chats</h1>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className='p-2 bg-neutral-600 rounded-full hover:bg-neutral-500 cursor-pointer'>
                    <Edit size={20} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add new conversation</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </header>
          <Separator className='bg-neutral-600' />
          <ScrollArea className='flex-1 overflow-auto'>
            <div className='flex flex-col bg-neutral-800 pl-2 pr-4 my-2'>
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className='flex gap-2 p-2 cursor-pointer hover:bg-neutral-700 rounded-md transition-all'
                  onClick={() => navigate(`/conversations/${conversation.id}`)}
                >
                  <Avatar>
                    <AvatarImage src='https://github.com/shadcn.png' />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className='flex flex-col'>
                    <p className='font-bold'>{conversation.name}</p>
                    <p className='text-sm text-neutral-400'>
                      {conversation.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className='p-3 text-center'>
            <p className='hover:bg-neutral-600 px-1 py-2 rounded-md  flex items-center justify-center gap-4 cursor-pointer'>
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
