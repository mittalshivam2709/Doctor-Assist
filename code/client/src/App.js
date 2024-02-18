import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import {Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";

function App() {
  
    return (
    <div>
      {/* <Route path="/" component={Homepage} exact /> */}
      {/* <Route /> */}
      <Navbar />
      <Homepage />
      {/* <LoginPage /> */}
    </div>
      
  );
}

export default App;