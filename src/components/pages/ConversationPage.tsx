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
    <div className='h-full flex gap-4'>
      <div className='flex flex-col gap-2 mt-4'>
        <div className='w-11 h-11 hover:bg-neutral-600 bg-neutral-600 flex items-center justify-center cursor-pointer rounded-full mb-2 transition-all'>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className='w-11 h-11 hover:bg-neutral-600 bg-neutral-600 flex items-center justify-center cursor-pointer rounded-md transition-all'>
          <MessageSquareMore size={28} />
        </div>
        <div className='w-11 h-11 hover:bg-neutral-600 flex items-center justify-center cursor-pointer rounded-md transition-all'>
          <User size={28} />
        </div>
        <div className='w-11 h-11 hover:bg-neutral-600 flex items-center justify-center cursor-pointer rounded-md transition-all'>
          <RefreshCw size={28} />
        </div>
        <div className='w-11 h-11 hover:bg-neutral-600 flex items-center justify-center cursor-pointer rounded-md transition-all'>
          <Settings size={28} />
        </div>
        <div className='w-11 h-11 hover:bg-neutral-600 flex items-center justify-center cursor-pointer rounded-md transition-all'>
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
