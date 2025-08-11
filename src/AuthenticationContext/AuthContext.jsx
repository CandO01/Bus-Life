import React,{useEffect, useState} from 'react'


const AuthContext = React.createContext() 

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null);

 useEffect(() => {
  const name = localStorage.getItem('name');
  if (name) {
    setUser(name);
    setIsLoggedIn(true); // ✅ restore login state
  }
}, []);


   function login({ name }) {
     localStorage.clear(); // Clear any old data
    setIsLoggedIn(true)
    setUser(name)
    localStorage.setItem('name', name)
    }

 function logout() {
  setIsLoggedIn(false);
  setUser(null);
  localStorage.removeItem('name');
}


  return (
    <AuthContext.Provider value={{isLoggedIn, login, logout, user}}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export { AuthContext }