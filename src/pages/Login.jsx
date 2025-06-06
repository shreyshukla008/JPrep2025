// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { auth, GoogleAuthProvider } from "../firebase-config";
// import { signInWithPopup } from "firebase/auth";

// const Login = () => {
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await signInWithPopup(auth, new GoogleAuthProvider());
//       const user = result.user;
//       const token = await user.getIdToken();  // Get Firebase token

//       localStorage.setItem("token", token);  // Store token in localStorage
//       navigate(`/user/${user.uid}`);  // Redirect to user dashboard
//     } catch (err) {
//       setError("Login failed. Please try again.");
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h1>Login Page</h1>
//       {error && <p className="text-red-500">{error}</p>}
//       <button onClick={handleGoogleLogin}>
//         Login with Google
//       </button>
//     </div>
//   );
// };

// export default Login;
