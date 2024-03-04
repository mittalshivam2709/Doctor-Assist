import "../index.css";
import logo from "../logo.png"

const Navbar = () => {
    return (
      <div className="custom-navbar">
        {/* <div>p</div> */}
        <div className="flex items-center">
        <img src={logo} alt="Logo" /> 
        <p className="" style={{marginLeft:"5px"}}>Doctors assist</p>
        </div>
        <div>Username</div>
      </div>
    );
  };

  export default Navbar;