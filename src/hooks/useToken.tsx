import React from "react";

export const useToken = () => {
  // State to store the token
  const [token, setToken] = React.useState<string | null>(null);

  // Function to set the token
  const saveToken = (newToken: string) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
  };

  // Function to get the token
  const getToken = () => {
    if (!token) {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        setToken(storedToken);
        return storedToken;
      }
    }
    return token;
  };

  // Function to remove the token
  const removeToken = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  return {
    token: getToken(),
    saveToken,
    removeToken,
  };
};
