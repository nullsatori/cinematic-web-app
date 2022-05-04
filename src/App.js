import "./index.scss";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  BrowserRouter as Router,
} from "react-router-dom";
import WatchList from "./components/WatchList";
import DashBoard from "./components/DashBoard";
import Auth from "./components/Auth";
import Search from "./components/Search";
import { getAuth } from "firebase/auth";
import { app } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "./components/Header";

import { GlobalProvider } from "./components/context/GlobalState";

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
    return <Navigate to="/search" state={{ from: location }} />;
  }
};
const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route
            path="/auth"
            element={
              <UnrequiredAuth>
                <Auth />
              </UnrequiredAuth>
            }
          />
          <Route path="/" element={<Navigate to="/search" />} />
          <Route
            path="/search"
            element={
              <RequiredAuth>
                <Header />
                <Search />
              </RequiredAuth>
            }
          />

          <Route
            path="/dashboard"
            element={
              <RequiredAuth>
                <Header />
                <DashBoard />
              </RequiredAuth>
            }
          />
          <Route
            path="/watchlist"
            element={
              <RequiredAuth>
                <Header />
                <WatchList />
              </RequiredAuth>
            }
          />
        </Routes>
      </Router>
    </GlobalProvider>
  );
};

export default App;
