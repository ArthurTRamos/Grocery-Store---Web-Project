// Import useEffect hook from React
import { useEffect } from "react";
// Import useNavigate from React Router for navigation
import { useNavigate } from "react-router-dom";

// Component that logs out the user and redirects to the homepage
function EditLogout({ setLoggedUser }) {
  const navigate = useNavigate();

  // Run once when the component mounts
  useEffect(() => {
    // Redirect to homepage ("/"), replacing current history entry
    navigate("/", { replace: true });

    // Clear the logged user state
    setLoggedUser("");
  }, [setLoggedUser, navigate]);

  // Component does not render anything
  return null;
}

// Export the component for use in other parts of the app
export default EditLogout;

