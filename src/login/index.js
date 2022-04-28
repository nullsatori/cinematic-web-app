import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";
import { Navigate, useLocation } from "react-router-dom";
const Login = () => {
  let location = useLocation();
  const auth = getAuth();
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUserName, setRegisterUserName] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    console.log(currentUser.email);
    if (currentUser.email) {
      return <Navigate to="/home" state={{ from: location }} />;
    }
  });
  const register = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
  const logout = async (e) => {
    e.preventDefault();
    await signOut(auth);
  };
  return (
    <div id="Auth">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="signup">
          <form>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(event) => {
                setRegisterEmail(event.target.value);
              }}
              required=""
            />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              onChange={(event) => {
                setRegisterPassword(event.target.value);
              }}
              required=""
            />
            <button onClick={register}>Sign up</button>
          </form>
        </div>

        <div className="login">
          <form>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(event) => {
                setLoginEmail(event.target.value);
              }}
              required=""
            />
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              onChange={(event) => {
                setLoginPassword(event.target.value);
              }}
              required=""
            />
            <button onClick={login}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
