import { auth, signInAnonymously, provider, signInWithPopup } from "../firebase-config";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;


export async function googleLogin() {
  try {
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    const res = await fetch(`${baseUrl}/api/auth/google-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: idToken }),
    });

    if (!res.ok) {
      throw new Error("Backend login failed");
    }

    const data = await res.json();

    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        starred: data.user.starred,
        token: data.token,
      })
    );

    return data.user._id; 
  } catch (error) {
    console.error("Google login error:", error);
    throw error;
  }
}


export async function guestLogin() {
    try{
        const result = await signInAnonymously(auth);
        const idToken = await result.user.getIdToken();

        const res = await fetch(`${baseUrl}/api/auth/guest-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: idToken }),
        });

        if (!res.ok) {
            throw new Error("Guest login failed");
        }

        const data = await res.json();

        localStorage.setItem(
            "user",
            JSON.stringify({
            _id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            starred: data.user.starred || [],
            token: data.token,
            })
        );

        return data.user._id;
    } catch (error) {
    console.error("Guest login error:", error);
    throw error; 
  }
}
