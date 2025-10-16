import {createContext, useContext, useEffect, useState} from "react";

const UserContext = createContext()

export function UserProvider({children}) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    useEffect(() => {
        async function getData() {

            let jsonResponse = await fetch(import.meta.env.VITE_URL_BASE + "api/user/me", {})
            if (!jsonResponse.ok) {
                throw new Error(`Response status: ${jsonResponse.status}`);
            }

            const result = await jsonResponse.json();
            setUser(result);
            console.log(result);


        }

        if (!user) {
            getData()
        }
    }, [])

    return (<UserContext.Provider value={{ user, setUser ,token, setToken }}>
        {children}
    </UserContext.Provider>)
}
export function useUser() {
    return useContext(UserContext)
}
