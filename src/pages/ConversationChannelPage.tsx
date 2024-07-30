import { useContext } from "react";
import { AuthContext } from "../utils/contexts/AuthContext";
import { ConversationChannelPageStyle } from "../utils/styles";

const ConversationChannelPage = () => {
  const { user } = useContext(AuthContext);
  return (
    <ConversationChannelPageStyle>
      {user && user.email}
    </ConversationChannelPageStyle>
  );
};

export default ConversationChannelPage;
