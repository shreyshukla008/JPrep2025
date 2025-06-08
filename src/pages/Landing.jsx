import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { googleLogin,guestLogin } from "../utils/authUtils"; 
import { Button } from "../components/Button";



export default function LandingPage() {
  const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      const userId = await googleLogin();
      navigate(`/user/${userId}`);
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

    const handleGuestLogin = async () => {
        setError(null);
        setLoading(true);
        try {
            const userId = await guestLogin();
            navigate(`/user/${userId}`);
        } catch (err) {
            setError("Guest login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-sky-50 to-white  flex flex-col items-center justify-center px-6 text-center">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Welcome to <span className="italic">J-Prep</span>
      </motion.h1>

      <p className="text-gray-600 max-w-xl mb-6 text-lg">
        Search and explore previous year questions, starred content, and manage course documents.
      </p>

     
      <div className="w-full max-w-sm bg-slate-50 p-8 rounded-2xl shadow-xl mb-6">
        <div className="flex flex-col gap-4">
            <div className="flex justify-center w-full mb-6 mt-4">
                <img src="./logo-gol.png" className="w-[5rem]"></img>
            </div>
            
          <Button
            onClick={handleGoogleLogin}
            className="bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center gap-2 shadow-sm"
            disabled={loading}
          >
            <FcGoogle className="text-xl" />
            Sign in with Google
          </Button>

          <Button
            onClick={handleGuestLogin}
            className="bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-300"
            disabled={loading}
          >
            Continue as Guest
          </Button>
        </div>

        {loading && (
          <p className="mt-4 text-blue-600 font-medium text-sm">Signing in...</p>
        )}

        {error && (
          <p className="mt-4 text-red-600 font-medium text-sm">{error}</p>
        )}

        <div className="text-xs text-gray-600 mt-5 text-left space-y-1 border-t border-gray-200 pt-4">
          <p>
            <span className="text-blue-600 font-medium">*</span> Google login is
            powered by Firebase — credentials are never stored on our servers.
          </p>
          <p>
            <span className="text-blue-600 font-medium">*</span> Guest mode
            allows temporary access with limited features and no data retention.
          </p>
        </div>
      </div>

      <footer className="mt-10 text-xs text-gray-400">
        © 2025 SafeAccess. All rights reserved.
      </footer>
    </div>
  );
}
