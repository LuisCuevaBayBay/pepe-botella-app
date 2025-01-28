import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from "./components/LoginScreen.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Change the path to a valid URL path */}
        <Route path="/" element={<LoginScreen />} />
      </Routes>
    </Router>
  );
}

export default App;

