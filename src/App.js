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

export const RequiredAuth: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  let location = useLocation();
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return (
      <div>
        <p>Initialising User...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  if (user) {
    return children;
  }
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <RequiredAuth>
              <Homepage />
            </RequiredAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RequiredAuth>
              <Dashboard />
            </RequiredAuth>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
