import "../index.css";
import logo from "../logo.png"
import DoctorLogo from "../components/DoctorLogo";

const Navbar = ({username}) => {
    return (
      <div className="custom-navbar">
        {/* <div>p</div> */}
        <div className="flex items-center">
        <img src={logo} alt="Logo" className = "emri_logo" /> 
        <h2>{username}</h2>
        </div>
      </div>
    );
  };

  export default Navbar;