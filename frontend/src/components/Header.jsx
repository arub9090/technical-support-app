import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate, userNavigate } from "react-router-dom";
import { useSelector, userDispatch, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispathch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout=()=>{
      dispathch(logout())
      dispathch(reset());
      navigate('/')
  }
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          {" "}
          <h4>Support Desk</h4>{" "}
        </Link>
      </div>
      <ul>
          {user ? (<>
          <li>
              <button className="btn" onClick={onLogout}><FaSignOutAlt /> Logout</button>
          </li>
          </>) : (<>
            <li>
          <Link to="/login">
            <FaSignInAlt /> Login
          </Link>
        </li>
        <li>
          <Link to="/register">
            <FaUser /> Register
          </Link>
        </li></>)}
        
      </ul>
    </header>
  );
}

export default Header;
