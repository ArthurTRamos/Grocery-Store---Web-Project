import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setLoggedUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
    setLoggedUser("");
  }, [setLoggedUser, navigate]);

  return null;
}

export default Logout;
