import { Route, Routes, BrowserRouter } from "react-router-dom";
import AdminLogin from './pages/admin/adminLogin';
import AdminPanel from './pages/admin/adminPanel';
import AdminHistory from './pages/admin/adminHistory';
import AdminMessage from './pages/admin/adminMessage';

import UserLogin from './pages/user/userLogin';
import UserHistory from './pages/user/userHistory';
import UserPanel from './pages/user/userPanel';

import './scss/main.scss';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/admin-history" element={<AdminHistory />} />
          <Route path="/admin-messages" element={<AdminMessage />} />

          {/* User Router */}
          <Route path="/" element={<UserLogin />} />
          <Route path="/user-panel" element={<UserPanel />} />
          <Route path="/user-history" element={<UserHistory />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
