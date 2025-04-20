import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export let AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const [UserData, setUserData] = useState(null);

  let saveUserData = () => {
    let encodedToken = localStorage.getItem("userToken");
    if (encodedToken) {
      let decodedToken = jwtDecode(encodedToken);
      setUserData(decodedToken);
    //   console.log(decodedToken);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ UserData, saveUserData }}>
      {props.children}
    </AuthContext.Provider>
  );
}
