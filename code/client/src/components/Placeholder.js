import { ChatState } from "../context/ChatProvider";
import LoremIpsum from "../utils/loremipsum";
const Placeholder = () => {
  const {selectedChat, setSelectedChat} = ChatState();
    return (
      <p>
       {LoremIpsum}
       Currently selected = {selectedChat}
      </p>
    );
  };

  export default Placeholder;