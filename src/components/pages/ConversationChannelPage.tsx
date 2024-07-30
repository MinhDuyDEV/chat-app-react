import { useContext } from "react";

import { AuthContext } from "@/utils/contexts/AuthContext";

const ConversationChannelPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className='flex-1 my-4 rounded-lg bg-neutral-800'>
      {user && user.email}
    </div>
  );
};

export default ConversationChannelPage;
