import { ChatState } from "../context/ChatProvider";
import LoremIpsum from "../utils/loremipsum";
const Placeholder = () => {
  const {selectedChat, setSelectedChat} = ChatState();
    return (
      <p>
        {
          selectedChat?
          `Currently selected = ${selectedChat}`:LoremIpsum
        }
      </p>
    );
  };

  export default Placeholder;