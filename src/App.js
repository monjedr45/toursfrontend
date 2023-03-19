import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import './App.css';
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import ProtectedLogin from "./components/ProtectedLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthContext } from "./hooks/useAuthContext";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import MyProfile from "./pages/MyProfile";
import Signup from "./pages/auth/Signup";
import Tour from "./pages/Tour";
import PageNotFound from "./pages/PageNotFound";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";


function App() {
  const { authIsReady } = useAuthContext()

  return (

    <div className="App">
      {authIsReady && (
        <Router>
          <Navbar />
          <Routes>
            <Route end path="/" element={
              <Home />
            } />
            <Route end path="/forgot_password" element={
              <ForgotPassword />
            } />
            <Route end path="/reset_password/:token" element={
              <ResetPassword />
            } />
            <Route end path="/my_profile" element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            } />
            <Route end path="/tour/:id" element={<Tour />} />
            <Route end path="/checkout/:id" element={
              <ProtectedRoute>

                <Checkout />
              </ProtectedRoute>

            } />
            <Route end path="/login" element={
              <ProtectedLogin>
                <Login />
              </ProtectedLogin>
            } />
            <Route end path="/signup" element={
              <ProtectedLogin>
                <Signup />
              </ProtectedLogin>
            } />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <Footer />
        </Router>
      )}

    </div>
  );
}

export default App;
