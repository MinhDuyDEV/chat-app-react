import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MessageSquareMore,
  RefreshCw,
  Settings,
  User,
  Video,
} from "lucide-react";

import { AppDispatch, RootState } from "@/store";
import { fetchConversationsThunk } from "@/store/conversationSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ConversationPanel from "@/components/conversations/ConversationPanel";
import ConversationSidebar from "@/components/conversations/ConversationSidebar";

const ConversationPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const conversations = useSelector(
    (state: RootState) => state.conversation.conversations
  );
  useEffect(() => {
    dispatch(fetchConversationsThunk());
  }, [dispatch]);

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
