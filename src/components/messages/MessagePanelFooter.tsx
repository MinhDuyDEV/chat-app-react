import { Input } from "@/components/ui/input";

const MessagePanelFooter = () => {
  return (
    <div className='flex mx-3'>
      <Input
        placeholder='Aa'
        className='border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-neutral-400 rounded-3xl text-neutral-100 bg-neutral-700'
      />
    </div>
  );
};

export default MessagePanelFooter;
