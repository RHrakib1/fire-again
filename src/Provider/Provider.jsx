import { createUserWithEmailAndPassword } from "firebase/auth"
import { createContext, useState } from "react"
import auth from "../Firebase.config"

const AuthContext = createContext(null)

export default function Provider({ children }) {
    const [user, setuser] = useState(null)
    const [loadding, setloadding] = useState(true)


    const createuser = (emial, password) => {
        setloadding(true)
        return createUserWithEmailAndPassword(auth, emial, password)
    }


    const usedata = {
        user,
        loadding,
        createuser
    }


    return (
        <AuthContext.Provider value={usedata}>
            {children}
        </AuthContext.Provider>
    )
}
