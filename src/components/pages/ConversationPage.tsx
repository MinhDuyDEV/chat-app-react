import { Outlet, useParams } from "react-router-dom";
import {
  MessageSquareMore,
  RefreshCw,
  Settings,
  User,
  Video,
} from "lucide-react";

import mockConversations from "@/mocks/conversations";
import ConversationPanel from "@/components/conversations/ConversationPanel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ConversationSidebar from "@/components/conversations/ConversationSidebar";

const ConversationPage = () => {
  const { id } = useParams();
  return (
    <div className='flex h-full gap-4 px-4'>
      <div className='flex flex-col gap-2 mt-4'>
        <div className='flex items-center justify-center mb-2 transition-all rounded-full cursor-pointer w-11 h-11 hover:bg-neutral-600 bg-neutral-600'>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className='flex items-center justify-center transition-all rounded-md cursor-pointer w-11 h-11 hover:bg-neutral-600 bg-neutral-600'>
          <MessageSquareMore size={28} />
        </div>
        <div className='flex items-center justify-center transition-all rounded-md cursor-pointer w-11 h-11 hover:bg-neutral-600'>
          <User size={28} />
        </div>
        <div className='flex items-center justify-center transition-all rounded-md cursor-pointer w-11 h-11 hover:bg-neutral-600'>
          <RefreshCw size={28} />
        </div>
        <div className='flex items-center justify-center transition-all rounded-md cursor-pointer w-11 h-11 hover:bg-neutral-600'>
          <Settings size={28} />
        </div>
        <div className='flex items-center justify-center transition-all rounded-md cursor-pointer w-11 h-11 hover:bg-neutral-600'>
          <Video size={28} />
        </div>
      </div>
      <ConversationSidebar conversations={mockConversations} />
      {!id && <ConversationPanel />}
      <Outlet />
    </div>
  );
};

export default ConversationPage;
