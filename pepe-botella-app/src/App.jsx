import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from "./components/LoginScreen.jsx";
import RegisterScreen from './components/RegisterScreen.jsx';
import ReportLogin from './components/ReportLogin.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Change the path to a valid URL path */}
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/report-login" element={<ReportLogin />} />
        <Route path="/dashboard" element={ <AdminDashboard />}/>
      </Routes>
    </Router>
  );
}

export default App;

