import { useState } from "react";
import { doc, collection, getDocs, query, where, addDoc } from "firebase/firestore";
import db from "../firebaseconfig";
import logo from "../assets/logo.jpg";

const LoginScreen = () => {
    const [email, setEmail] = useState("");

    const handleCheckEmail = async () => {
        if (!email){
            alert("Por favor, ingresa tu correo.");
            return;
        }

        try{
            const q = query(collection(db, "players"), where("email", "==", email));
            const QuerySnapshot = await getDocs(q);    
            
            if(!QuerySnapshot.empty){
                //Obtener ID del Jugador
                const playerDoc = QuerySnapshot.docs[0];
                const playerId = playerDoc.id;
                const playerName = playerDoc.data().name

                // Obtener la fecha y hora actual en tu zona horaria local
                 const localTime = new Date();
                 const localOffset = localTime.getTimezoneOffset() * 60000; // Diferencia en milisegundos
                const localDate = new Date(localTime.getTime() - localOffset);

                //crear nuevo documento en "attendance" y obtener ID del jugador
                const attendanceRef = doc(collection(db, "attendance"));
                const attendanceId = attendanceRef.id;

                //guardar asistencia en Firestor            
                await addDoc(collection(db, "attendance"),{
                  ID: attendanceId,
                  playerID: playerName,
                  trainingDateArrival: localDate.toISOString(),  
                });

                alert(`✅ ${playerName}, tu asistencia ha sido registrada.`);
        }else{
            alert("❌ Correo no encontrado.");
        }
        }catch(error){
            console.error("Error getting documents: ", error);
            alert("Ocurrió un error en la búsqueda de correo.");
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
          type="email"
          placeholder="ingresa tu correo."
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleCheckEmail}
          className="submit-button"
        >
          Ingresar
        </button>

        <p className="mt-4 text-sm text-gray-600">
          Ingresa tu correo para registrar tu asistencia.
        </p>
        <a href="#" className="text-blue-500 text-sm">
          Iniciar Sesión
        </a>
      </div>
    </div>
  );
};

export default LoginScreen;
