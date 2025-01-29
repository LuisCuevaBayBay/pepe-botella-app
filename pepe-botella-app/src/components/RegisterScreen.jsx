import {useState} from "react";
import {collection, addDoc} from "firebase/firestore";
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import db from "../firebaseconfig";

const RegisterScreen = ()=>{
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [position, setPosition] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [pin, setPin] = useState("");


const handleRegister = async ()=>{
    if (!name || !lastName|| !position || !pin || !email || !phone){
        alert("Por favor, llena todos los campos.");
        return;
    }

    try{
        await addDoc(collection(db, "players"),{
            name,
            lastName,
            position,
            email,
            phone,
            registrationDate: new Date().toISOString(),
            pin,
        });
        alert("✅ Registro exitoso!");
    }catch (error){
        console.error("Error adding document: ", error);
        alert("❌ Ocurrió un error al registrar.");
    }
};

const handleGoogleSignUp = async()=>{
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try{
        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        await addDoc(collection(db, "players"),{
            name: user.displayName.split(" ")[0],  
            lastName: user.displayName.split(" ")[1],
            position: "", //editar luego
            pin: "", //el usuario debe asignarlo despues
            email: user.email,
            phone: user.phoneNumber || "", //el usuario debe ingresarlo despues
            registrationDate: new Date().toISOString(),
        });
        alert("✅ Registro con Google exitoso!");
    }catch(error){
        console.error("Error signing in with Google: ", error);
        alert("❌ Ocurrió un error al registrar con Google.");
    }
};

return(
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
        <img src="../public/logo.jpg" alt="Logo Pepe Botella" className="logo" />
        <h1 className="text-2xl font-bold text-gray-700 mb-4">REGISTRO</h1>
        <div className="auth-links">
            <input
                type="text"
                placeholder="Nombre"
                className="border p2-w-full rounded-md mb-2"
                value={name}
                onChange={(e)=> setName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Apellido"
                className="border p2-w-full rounded-md mb-2"
                value={lastName}
                onChange={(e)=> setLastName(e.target.value)}
            />
            
            <select
            className="border p2 w-full rounded-md mb-2"
            value={position}
            onChange={(e)=> setPosition(e.target.value)}>
                <option value="">Seleccion tu Rol o Posición en el Campo</option>
                <option value="Admin">Administracion</option>
                <option value="Entrenador">Entrenador</option>
                <option value="Portero">Portero</option>
                <option value="Defensa">Defensa</option>
                <option value="Medio">Medio</option>
                <option value="Delantero">Delantero</option>
            </select>  
            <input
                type="email"
                placeholder="Correo Electronico"
                className="border p-2 w-full rounded-md mb-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="tel"
                placeholder="Numero de Telefono"
                className="border p-2 w-full rounded-md mb-2"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
            <input
                type ="password"
                placeholder="PIN (4 digitos)"
                className="border p-2 w-full rounded-md mb-2"
                value={pin}
                onChange={(e)=> setPin(e.target.value)}
            />
            
            <button
            onClick={handleRegister}
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
            Registrarse
            </button>
            <button
            onClick={handleGoogleSignUp}
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
            Registrarse con Google
            </button>
        </div>
    </div>
    );
}
    export default RegisterScreen;