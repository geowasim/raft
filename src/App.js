import React from "react";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { Route, Routes, Link } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Invoices from "./components/Invoices";
import Pos from "./pages/Pos";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <nav>
          <ul className="links">
            <li>
              <Link to="/pos">Home</Link>
            </li>
            <li>
              <Link to="/invoices">Invoices</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Signin />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
          <Route
            path="/pos"
            element={
              <ProtectedRoute>
                <Pos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/invoices"
            element={
              <ProtectedRoute>
                <Invoices />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
