import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { auth } from "../firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
const AdminDashboard = () => {
    const [isSideBarOpen, setIsSideBarOpen] = useState(true);
    const [email, setEmail]= useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsusbcribe = onAuthStateChanged(auth,(currentUser)=>{
          if(currentUser){
            setEmail(currentUser.email);
          }else{
            navigate("/report-login");
          }
        });
        return () => unsusbscribe();
      }, [navigate]);

    return(
        <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-blue-900 text-white w-64 p-4 ${isSidebarOpen ? "block" : "hidden"} md:block`}>
        <h2 className="text-xl font-bold mb-4">⚽ Equipo Admin</h2>
        <ul>
          <li className="mb-2"><Link to="/dashboard" className="block p-2 hover:bg-blue-700 rounded">🏠 Escritorio</Link></li>
          <li className="mb-2"><Link to="/asistencias" className="block p-2 hover:bg-blue-700 rounded">📅 Asistencias</Link></li>
          <li className="mb-2"><Link to="/reportes" className="block p-2 hover:bg-blue-700 rounded">📊 Reportes</Link></li>
          <li className="mb-2"><Link to="/jugadores" className="block p-2 hover:bg-blue-700 rounded">👥 Jugadores</Link></li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex justify-between items-center mb-6">
          <button className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <Menu className="text-blue-900" />
          </button>
          <h1 className="text-2xl font-bold text-blue-900">Panel de Administración</h1>
          {user && <p className="text-gray-700">Bienvenido, {user.email}</p>}
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold">Lista Asistencias</h2>
            <p>Módulo</p>
          </div>
          <div className="bg-orange-500 text-white p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold">Jugadores</h2>
            <p>Total: 22</p>
          </div>
          <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold">Reporte de Asistencias</h2>
            <p>Módulo</p>
          </div>
        </div>
      </div>
    </div>
    );
};
export default AdminDashboard;