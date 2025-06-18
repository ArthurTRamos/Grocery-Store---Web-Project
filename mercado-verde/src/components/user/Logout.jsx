import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * A non-visual component responsible for handling the user logout process.
 * When rendered, it clears the user's session and redirects them to the homepage.
 */
function Logout({ setLoggedUserId }) {
  // Get the navigate function from React Router to programmatically change routes.
  const navigate = useNavigate();

  // The useEffect hook performs the side effects of logging out.
  // It runs once when the component is mounted.
  useEffect(() => {
    // Navigate the user to the homepage ('/').
    // The `replace: true` option replaces the '/logout' entry in the browser's history,
    // so the user can't click the "back" button to return to this page.
    navigate("/", { replace: true });

    // Call the state setter function passed from the parent component (App.js)
    // to clear the logged-in user's ID from the application's state.
    setLoggedUserId("");
  }, [setLoggedUserId, navigate]); // Dependency array ensures the effect runs only when these stable functions change (i.e., once on mount).

  // This component does not render any HTML, it only performs an action.
  // Therefore, it returns null.
  return null;
}

export default Logout;