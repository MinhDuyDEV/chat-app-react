import { TbEdit } from "react-icons/tb";
import { ConversationSidebarStyle } from "../../utils/styles";

const ConversationSidebar = () => {
  return (
    <ConversationSidebarStyle>
      <header>
        <h1>Conversations</h1>
        <TbEdit size={40} />
      </header>
    </ConversationSidebarStyle>
  );
};

export default ConversationSidebar;
