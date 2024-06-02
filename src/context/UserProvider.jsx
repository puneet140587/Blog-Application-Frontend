import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getCurrentUser, authenticate } from "../Authentication/index";
import userContext from "./userContext";

function UserProvider({ children }) {
  const [user, setUser] = useState({
    data: {},
    login: false,
  });

  useEffect(() => {
    setUser({
      data: getCurrentUser(),
      login: authenticate(),
    });
  }, []);

  return (
    <userContext.Provider value={{ user, setUser }}>
      {children}
    </userContext.Provider>
  );
}

export default UserProvider;
