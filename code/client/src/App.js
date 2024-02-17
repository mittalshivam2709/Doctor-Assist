import Dropdown from "./components/Dropdown";
import Navbar from "./components/Navbar";
import Placeholder from "./components/Placeholder";
import Template from "./components/Template";
import Homepage from "./pages/Homepage";
import { Provider } from 'react-redux';
import store from "./state/dropdownStore";

import { createContext } from "react";

function App() {
  
    return (
    
    <Provider store={store}>
      <Navbar />
      <Homepage />
      
    </Provider>
  );
}

export default App;