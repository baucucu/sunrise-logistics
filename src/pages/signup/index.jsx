import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../firebase-config";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed. Current user: ", user);
      if (user) {
        navigate("/dashboard");
      }
    });
    // Cleanup the subscription on unmount
    return () => unsubscribe();
  }, [navigate]);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // You can now use this info and store it in state or context.
        console.log({ user, token });
        // redirect to dashboard
        // navigate("/dashboard");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log({ errorCode, errorMessage, email, credential });
      });
  };

  const signInWithUsernameAndPassword = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log({ user });
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log({ errorCode, errorMessage });
      });
  };
  return (
    <Box className="container">
      <Button color="secondary" onClick={signInWithGoogle}>
        Sign in with Google
      </Button>
      <Button color="secondary" onClick={signInWithUsernameAndPassword}>
        Sign in with Username and Password
      </Button>
    </Box>
  );
}
export default Login;
