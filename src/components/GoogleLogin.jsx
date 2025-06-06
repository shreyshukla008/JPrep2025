import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import {auth, provider, signInWithPopup} from '../firebase-config';

function GoogleLogin() {

    const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleLogin = async () => {
        try{
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();

            console.log("id TOKEN: " , idToken);

            const res = await fetch(`${BASE_URL}/api/auth/google-login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({token: idToken})
            });

            const data = await res.json();
            console.log("Backend Response: ", data);


            //save jwt or proceed to next: 
            localStorage.setItem("user", JSON.stringify({
                _id: data.user._id,
                name: data.user.name,
                email: data.user.email,
                role: data.user.role,
                starred: data.user.starred,
                token: data.token  // the JWT
              }));;
            navigate(`/user/${data.user._id}`);  // Redirect to user dashboard
        }catch(error){
            setError("Login failed. Please try again.");
            console.log("Error: ", error);
        }
    };

    return (
        <div>
           <h1>Login Page</h1>
      {error && <p className="text-red-500">{error}</p>}
      <button onClick={handleLogin}>
        Login with Google
      </button>
        </div>
    )
}

export default GoogleLogin;