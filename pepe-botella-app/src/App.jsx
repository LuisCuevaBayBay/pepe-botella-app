import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from "./components/LoginScreen.jsx";
import RegisterScreen from './components/RegisterScreen.jsx';
import ReportLogin from './components/ReportLogin.jsx';

function App() {
  return (
    <Router>
      <Routes>
        {/* Change the path to a valid URL path */}
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/report-login" element={<ReportLogin />} />
      </Routes>
    </Router>
  );
}

export default App;

