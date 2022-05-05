import React from "react";
import { Link } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
const auth = getAuth();
const Header = () => {
  return (
    <div id="Header">
      <Link to="/search" replace>
        <img src="/big_boss.gif" alt="logo" />
      </Link>
      <div>
        <Link to="/search" replace>
          search
        </Link>
        <Link to="/watchlist" replace>
          watchlist
        </Link>
        <Link to="/dashboard" replace>
          dashboard
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
