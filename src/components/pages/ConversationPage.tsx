import { Outlet, useParams } from "react-router-dom";
import {
  MessageSquareMore,
  RefreshCw,
  Settings,
  User,
  Video,
} from "lucide-react";

import { useEffect, useState } from "react";
import { getConversations } from "@/utils/api";
import { ConversationType } from "@/utils/types";
import ConversationPanel from "@/components/conversations/ConversationPanel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ConversationSidebar from "@/components/conversations/ConversationSidebar";

const ConversationPage = () => {
  const { id } = useParams();
  const [conversations, setConversations] = useState<ConversationType[]>([]);
  useEffect(() => {
    getConversations()
      .then(({ data }) => {
        console.log("🚀 ~ .then ~ data:", data);
        setConversations(data);
      })
      .catch((err) => console.log(err));
  }, []);

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
      <ConversationSidebar conversations={conversations} />
      {!id && <ConversationPanel />}
      <Outlet />
    </div>
  );
};

export default ConversationPage;
