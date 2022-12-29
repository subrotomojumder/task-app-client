import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.config';

const auth = getAuth(app);
export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [darkTheme, setDarkTheme] = useState(false);
    useEffect(() => {
        if (darkTheme) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkTheme])
    useEffect(() => {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkTheme(true)
        } else {
            setDarkTheme(false)
        }
    }, [])
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };
    const updateUser = (name) => {
        return updateProfile(auth.currentUser, { displayName: name })
    };
    const userLogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    };
    const logOut = () => {
        return signOut(auth);
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
            console.log(currentUser)
        })
        return () => unsubscribe();
    }, [])
    const userInfo = {
        user,
        loading,
        createUser,
        updateUser,
        userLogin,
        googleLogin,
        logOut,
        setDarkTheme,
        darkTheme
    };
    return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
};

export default AuthProvider;