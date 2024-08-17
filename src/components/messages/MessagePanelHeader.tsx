import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RootState } from "@/store";
import { selectConversationById } from "@/store/conversationSlice";
import { AuthContext } from "@/utils/contexts/AuthContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const MessagePanelHeader = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const conversation = useSelector((state: RootState) =>
    selectConversationById(state, parseInt(id!))
  );

  const displayName =
    user?.id === conversation?.creator.id
      ? `${conversation?.recipient.firstName} ${conversation?.recipient.lastName}`
      : `${conversation?.creator.firstName} ${conversation?.creator.lastName}`;

  return (
    <div className='flex items-center gap-2 px-4 py-2.5 text-lg text-white shadow-md bg-neutral-800'>
      <Avatar>
        <AvatarImage src='https://github.com/shadcn.png' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p className='font-medium'>{displayName}</p>
    </div>
  );
};

export default MessagePanelHeader;
