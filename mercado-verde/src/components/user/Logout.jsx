import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout({ setLoggedUserId }) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/", { replace: true });
    setLoggedUserId("");
  }, [setLoggedUserId, navigate]);

  return null;
}

export default Logout;
