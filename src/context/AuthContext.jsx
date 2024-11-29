import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";


const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

const googleProvider = new GoogleAuthProvider();


//AuthProvider
export const AuthProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //register user
    const registerUser = async(fullName, email, password)=>{
        return await createUserWithEmailAndPassword(auth, fullName, email, password)
    }

    // login
    const logUserIn = async(email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    // google sign in
    const signInWithGoogle = async()=>{
        return await signInWithPopup(auth, googleProvider)
    }

    const logOut = ()=>{
        return signOut(auth)
    }

    //manage user
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user);
            setLoading(false);

            if(user){
                const {displayName, email, photoURL } = user;
                const userData = {
                    email,
                    userName: displayName,
                    photo: photoURL
                }
            }
        })

        return ()=> unsubscribe()
    }, [])


    const value = {
        loading,
        currentUser,
        registerUser,
        logUserIn,
        signInWithGoogle,
        logOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
