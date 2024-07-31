import { Edit } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateConversationForm from "@/components/forms/CreateConversationForm";

const CreateConversationModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='p-2 rounded-full cursor-pointer bg-neutral-600 hover:bg-neutral-500'>
          <Edit size={20} />
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg bg-neutral-800 border-neutral-700'>
        <DialogHeader className='flex flex-row items-center justify-between mb-2'>
          <DialogTitle className='text-slate-100'>
            Create a conversation
          </DialogTitle>
        </DialogHeader>
        <div className='flex items-center justify-center'>
          <CreateConversationForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateConversationModal;
