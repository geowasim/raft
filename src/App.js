import React from "react";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { Route, Routes, Link } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Invoices from "./components/Invoices";
import Pos from "./pages/Pos";
import Reback from "./components/Reback/Reback";
import { useState, useContext, createContext } from "react";
import { auth } from "./firebase";
import TaifInvoices from "./components/taif/TaifInvoices";

// const InvoiceRebackContext = createContext();

function App() {
  const [dataFromInvoice, setDatafromInvoice] = useState({});

  const readDataFromInvoiceComponent = (data) => {
    setDatafromInvoice(data);
  };

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
            {/* <li>
              <Link to="/taif">Taif</Link>
            </li> */}
            <li>
              <Link to="/reback">Reback</Link>
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
                <Invoices
                // readDataFromInvoiceComponent={readDataFromInvoiceComponent}
                />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/taif"
            element={
              <ProtectedRoute>
                <TaifInvoices
                // readDataFromInvoiceComponent={readDataFromInvoiceComponent}
                />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/reback"
            element={
              <ProtectedRoute>
                <Reback dataFromInvoice={dataFromInvoice} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
