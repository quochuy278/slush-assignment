import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoutes";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import useAuth from "./store/useAuth";

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Routes that protected */}
      <Route element={<ProtectedRoute canAccess={user !== null} />}>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} /> {/* 👈 Renders at /app/ */}
        </Route>
      </Route>

      <Route path="/signin" element={<SignInPage />} />
    </Routes>
  );
}

export default App;
