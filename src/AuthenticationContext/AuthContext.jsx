import React,{useState} from 'react'


const AuthContext = React.createContext() 

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

   function login() {
    setIsLoggedIn(true)
    }

  function logout() {
    setIsLoggedIn(false)
    }

  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export { AuthContext }