import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);

  return (
    <div>
      <Link to="/">בית</Link>
      <span> | </span>
      {user ? (
        <button onClick={logoutUser}>התנתקות</button>
      ) : (
        <Link to="/login">התחברות</Link>
      )}
      {user && <p>שלום {user.username}!</p>}
    </div>
  );
};

export default Header;
