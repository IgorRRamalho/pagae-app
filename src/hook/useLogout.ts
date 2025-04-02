/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { toast } from "react-toastify";

const useLogout = () => {
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      navigate("/");
      await signOut(auth);
      localStorage.setItem("hasLoggedInBefore", "true");
      toast.success("Você saiu da conta com sucesso! 👋");
    } catch (error) {
      toast.error("Ops! Algo deu errado ao sair. Tente novamente.");
    }
  }, [navigate]);
  
  return handleLogout;
};

export default useLogout;