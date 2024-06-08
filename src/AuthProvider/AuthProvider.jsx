import axios from "axios";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";
import useAxiosUser from "../hooks/useAxiosUser";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loader, setLoader] = useState(true);
  const [reload, setReload] = useState(false);
  const axiosUser = useAxiosUser();

  const createUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateImageAndName = (name, image) => {
    console.log("Updating profile with name:", name, "and image:", image);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  const getToken = async (email) => {
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/jwt`, {
      email,
    });
    return data;
  };

  const saveUser = async (user) => {
    const currentUser = {
      name: user?.displayName,
      email: user?.email,
      role: "normalUser",
      status: "none-verified",
    };
    console.log("Saving user with displayName:", user?.displayName);
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/user`,
      currentUser
    );
    return data;
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (observ) => {
      if (observ) {
        console.log(observ);
        await getToken(observ.email);
        // Save the user after profile has been updated
        if (observ.displayName) {
          await saveUser(observ);
        }
      } else {
        localStorage.removeItem("Token");
        setLoader(false);
      }
      setUser(observ);
      setLoader(false);
    });
    return () => {
      unSubscribe();
    };
  }, [reload]);

  const logOutUser = () => {
    setLoader(true);
    return signOut(auth);
  };

  const googleLogin = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };

  const githubLogin = () => {
    setLoader(true);
    return signInWithPopup(auth, githubProvider);
  };

  const allvalues = {
    user,
    loader,
    createUser,
    setLoader,
    setReload,
    loginUser,
    logOutUser,
    updateImageAndName,
    googleLogin,
    githubLogin,
  };

  return (
    <div>
      <AuthContext.Provider value={allvalues}>{children}</AuthContext.Provider>
    </div>
  );
}
