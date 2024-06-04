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
  // CREATE USER //

  const createUser = (email, password) => {
    setLoader(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // LOGIN USER //
  const loginUser = (email, password) => {
    setLoader(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //   SAVE USER ON DB //
  const saveUser = async (user) => {
    console.log(user.displayName);
    const name = user?.displayName ? user.displayName : "";
    const currentUser = {
      name,
      email: user?.email,
      role: "normalUser",
      status: "none-verified",
    };
    const idToken = await user.getIdToken();
    // const { data } = await axiosUser.put(`/user`, currentUser);
    const { data } = await axiosUser.put(`/user`, currentUser, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    return data;
  };
  // UPDATE PROFILE

  // OBSERVER USER IS HE/SHE LOGIN OR NOT //
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (observ) => {
      setUser(observ);
      if (observ) {
        console.log(observ);
        await saveUser(observ);
        const userInformation = { email: observ.email };
        // get token and store client //
        axios
          .post(`${import.meta.env.VITE_API_URL}/jwt`, userInformation)
          .then((res) => {
            if (res.data.token) {
              localStorage.setItem("Token", res.data.token);

              setLoader(false);
            }
          });
      } else {
        localStorage.removeItem("Token");
        setLoader(false);
      }
    });
    return () => {
      unSubscribe();
    };
  }, [reload]);
  // LOGED OUT //

  const logOutUser = () => {
    setLoader(true);

    return signOut(auth);
  };

  // UPDATE USER IMAGE AND NAME //
  const updateImageAndName = (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  // -----SOCIAL LOGIN----- //

  // GOOGLE LOGIN //
  const googleLogin = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };
  // GITHUB LOGIN //
  const githubLogin = () => {
    setLoader(true);
    return signInWithPopup(auth, githubProvider);
  };
  const allvalues = {
    user,
    loader,
    createUser,
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
