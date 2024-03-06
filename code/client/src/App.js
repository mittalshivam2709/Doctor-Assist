import Navbar from "./components/Navbar";
import Homepage from "./pages/Homepage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ChatWidget from "./components/ChatWidget";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <>
                <Navbar />
                <Homepage />
                {/* <ChatWidget /> */}
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
