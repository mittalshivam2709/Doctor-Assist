import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ChatWidget from './components/ChatWidget'
import SignupPage from './pages/SignupPage'
import Password_Reset from './pages/Password_Reset'
import Forgot_password from './pages/Forgot_password'
import Forgot_reset_password from './pages/Forgot_reset_password'
import Profile from './pages/Profile_page'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/passwordreset" element={<Password_Reset />} />
          <Route path="/forgotpassword" element={<Forgot_password />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/forgotresetpassword"
            element={<Forgot_reset_password />}
          />
          <Route
            path="/home"
            element={
              <>
                <Navbar />
                <Homepage />
                <ChatWidget />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
