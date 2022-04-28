import "./login/index.scss";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  BrowserRouter as Router,
} from "react-router-dom";

import Dashboard from "./dashboard";
import Login from "./login";
import Homepage from "./homepage";
import { getAuth } from "firebase/auth";
import { app } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "./header";

export const RequiredAuth: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  let location = useLocation();
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return (
      <div className="loading">
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    console.log(error);
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  } else return children;
};
export const UnrequiredAuth: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  let location = useLocation();
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return (
      <div className="loading">
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    console.log(error);
  }
  if (!user) {
    return children;
  } else {
    return <Navigate to="/home" state={{ from: location }} />;
  }
};
const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            <UnrequiredAuth>
              <Login />
            </UnrequiredAuth>
          }
        />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={
            <RequiredAuth>
              <Header />
              <Homepage />
            </RequiredAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequiredAuth>
              <Header />
              <Dashboard />
            </RequiredAuth>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
