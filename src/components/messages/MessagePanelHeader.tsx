import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MessagePanelHeader = () => {
  return (
    <div className='flex items-center gap-2 px-4 py-2.5 text-lg text-white shadow-md bg-neutral-800'>
      <Avatar>
        <AvatarImage src='https://github.com/shadcn.png' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p className='font-medium'>Chat Application</p>
    </div>
  );
};

export default MessagePanelHeader;
