import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setIsAuth(true);
        setUser(currentUser);
      } else {
        setIsAuth(false);
        setUser(null);
        navigate("/signin");
      }
    });

    return () => unsubscribe();
  }, [auth, history]);

  return { isAuth, user };
};

export default useAuth;
