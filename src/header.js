import React from "react";
import { Link } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
const auth = getAuth();
const Header = () => {
  return (
    <div id="Header">
      <img src="/big_boss.gif" alt="logo" />
      <div>
        <Link to="/dashboard" replace>
          dashboard
        </Link>
        <Link to="/home" replace>
          homepage
        </Link>
        <button
          disabled={!auth}
          onClick={() => {
            signOut(auth)
              .then(() => {
                alert("logout successful");
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          sign-out
        </button>
      </div>
    </div>
  );
};

export default Header;
