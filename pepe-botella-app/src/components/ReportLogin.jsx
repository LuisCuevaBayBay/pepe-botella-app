import { useState } from "react";
import { collection, query, where, getDocs } from  "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseconfig";
import logo from "../assets/logo.jpg";

const ReportLogin = () => {
    const [email, setEmail] = useState("");
    const [pin, setPin] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !pin) {
            alert("Por favor, llena todos los campos.");
            return;
        }
        try{
            
            const q = query(collection(db, "players"), where("email", "==", email), where("pin", "==", pin));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const playerDoc = querySnapshot.docs[0];
                const playerData = playerDoc.data();

                // Guardar la sesión del usuario en localStorage
                localStorage.setItem("reportUser", JSON.stringify({
                    id: playerDoc.id,
                    name: playerData.name,
                    email: playerData.email,
                }));

                alert("Inicio de sesión exitoso");
                navigate("/reportes"); // Redirigir a la página de reportes
            } else {
                alert("Credenciales incorrectas");
            }
        } catch (error) {
            console.error("Error getting documents: ", error);
            alert("Ocurrió un error en la búsqueda del Pin.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
          <h1 className="text-2xl font-bold text-gray-700 mb-4">LOGIN SECCION DE REPORTES</h1>
    
          <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
            <img
              src={logo}
              alt="Logo"
              className="logo"
            />
            <input
              type="email"
              placeholder="ingresa tu Email."
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              
            />
            <input
              type="password"
              placeholder="ingresa tu pin."
              className="input-field"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={4}
            />
    
            <button
              onClick={handleLogin}
              className="submit-button"
            >
              Ingresar
            </button>        
          </div>
        </div>
      );
};

export default ReportLogin;