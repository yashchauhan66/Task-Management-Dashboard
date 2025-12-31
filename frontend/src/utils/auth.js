import jwt_decode from "jwt-decode";

export const getUser = () => {
  const token = localStorage.getItem("token");
  if(!token) return null;
  return jwt_decode(token);
}

export const isLoggedIn = () => !!localStorage.getItem("token");
