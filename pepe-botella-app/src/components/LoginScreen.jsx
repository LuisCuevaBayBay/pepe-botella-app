import { useState } from "react";
import { doc, collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../firebaseconfig";
import logo from "../assets/logo.jpg";
import {Link} from "react-router-dom";

const LoginScreen = () => {
    const [pin, setPin] = useState("");
  
    const handleCheckPin = async () => {
        if (!pin || pin.length !== 4){
            alert("Por favor, ingresa tu PIN de 4 digitos.");
            return;
        }

        try{
            const pinNumber = parseInt(pin, 10);
            console.log("Buscando PIN: ", pin);
            const q = query(collection(db, "players"), where("pin", "==", pin.toString()));
            const QuerySnapshot = await getDocs(q);    
            
            if(!QuerySnapshot.empty){
                //Obtener ID del Jugador
                const playerDoc = QuerySnapshot.docs[0];
                const playerId = playerDoc.id;
                const playerName = playerDoc.data().name;

                // Obtener la fecha y hora actual en tu zona horaria local
                 const localTime = new Date();
                 const localOffset = localTime.getTimezoneOffset() * 60000; // Diferencia en milisegundos
                 const localDate = new Date(localTime.getTime() - localOffset);

                //guardar asistencia en Firestore            
                await addDoc(collection(db, "attendance"),{
                  playerID: playerName,
                  trainingDateArrival: localDate.toISOString(),  
                });

                alert(`✅ ${playerName}, tu asistencia ha sido registrada.`);
        }else{
            alert("❌ Ocurrio un error al buscar tu PIN.");
        }
        }catch(error){
            console.error("Error getting documents: ", error);
            alert("Ocurrió un error en la búsqueda del Pin.");
        }
};

return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">ASISTENCIA PEPE BOTELLA</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-80 text-center">
        <img
          src={logo}
          alt="Logo"
          className="logo"
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
          onClick={handleCheckPin}
          className="submit-button"
        >
          Ingresar
        </button>

        <p className="mt-4 text-sm text-gray-600">
          Ingresa tu PIN para registrar tu asistencia.
        </p>
        
        <div className="auth-links">
          <a href="/register" className="text-blue-500 text-sm block mb-2">Registrarse</a>
          <a href="/report-login" className="text-blue-500 text-sm block">Iniciar Sesión para Reportes (En Construccion)⚠️🏗️ </a>
        </div>

        
      </div>
    </div>
  );
};

export default LoginScreen;
