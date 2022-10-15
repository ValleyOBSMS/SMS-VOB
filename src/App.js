import { Route, Routes, BrowserRouter } from "react-router-dom";
import AdminLogin from "./pages/admin/adminLogin";
import AdminPanel from "./pages/admin/adminPanel";
import AdminHistory from "./pages/admin/adminHistory";
import AdminMessage from "./pages/admin/adminMessage";
import React, { useState } from "react";
import UserLogin from "./pages/user/userLogin";
import UserHistory from "./pages/user/userHistory";
import UserPanel from "./pages/user/userPanel";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import "./scss/main.scss";
import "./App.css";
const localUser = localStorage.getItem("valleyobsmsuser");
function App() {
  const auth = getAuth();
  const [user, setUser] = useState(JSON.parse(localUser));
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      setUser("");
      localStorage.removeItem("valleyobsmsuser");
    }
  });
  return (
    <div>
      <BrowserRouter>
        {user ? (
          <Routes>
            (
            <Route path="/admin-panel" element={<AdminPanel />} />
            <Route path="/admin-history" element={<AdminHistory />} />
            <Route path="/admin-messages" element={<AdminMessage />} />
            <Route path="/user-panel" element={<UserPanel />} />
            <Route path="/user-history" element={<UserHistory />} />){" "}
          </Routes>
        ) : (
          <Routes>
            (
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/" element={<UserLogin />} />)
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
