// Import necessary hooks from React and the Link component for navigation.
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Import the specific CSS file for styling this component.
import "./Header.css";

// Import the logo image asset.
import logo from "../assets/logo.png";

// Import the function to fetch user data by their ID from the services file.
import { GetUserById } from "../services/Fetchs.js";

// Define the Header component. It accepts 'loggedUserId' and 'cartItemNumber' as props from its parent.
function Header({ loggedUserId, cartItemNumber }) {
  // State to hold the full object of the logged-in user. It's initialized as an empty string.
  const [loggedUser, setLoggedUser] = useState("");

  // This useEffect hook is responsible for fetching user data.
  // It runs automatically whenever the value of 'loggedUserId' changes.
  useEffect(() => {
    // An async function is defined inside the effect to handle the API call.
    const fetchUser = async () => {
      // If loggedUserId is an empty string (meaning no user is logged in or they logged out),
      // reset the loggedUser state to empty and stop further execution.
      if (loggedUserId === "") {
        setLoggedUser("");
        return;
      }
      // If there is a loggedUserId, call the API to get the user's full details.
      const data = await GetUserById(loggedUserId);
      // After fetching, update the loggedUser state with the data received from the API.
      // This will cause the component to re-render with the new user information.
      setLoggedUser(data);
    };

    // Execute the fetch function.
    fetchUser();
  }, [loggedUserId]); // The dependency array ensures this effect only runs when loggedUserId changes.

  return (
    <div>
      <header className="header">
        {/* The logo and site name are wrapped in a Link component to navigate to the homepage. */}
        <Link to="/" className="logo-name-header">
          <img className="logo-header" src={logo} alt="Logo" />
          <h1>Mercado Verde</h1>
        </Link>
        <nav>
          <ul className="header-menu">
            {/*-- CONDITIONAL RENDERING FOR ADMIN LINK --*/}
            {/* This list item will only be rendered if a user is logged in AND that user's 'admin' property is true. */}
            {loggedUser && loggedUser.admin ? (
              <li>
                <Link to="/manage">Gerenciar</Link>
              </li>
            ) : null}
            <li>
              <Link to="/recipe">Receitas</Link>
            </li>
            <li>
              {/* This Link passes location state to the '/section' route, which can be used by the destination component. */}
              <Link to="/section" state={{ sectionData: "todos" }}>
                Seções
              </Link>
            </li>
            <li>
              <Link to="/cart">
                Meu Carrinho{" "}
                {/*-- CONDITIONAL RENDERING FOR CART COUNTER --*/}
                {/* The cart item count is displayed only if the number is greater than 0. */}
                {cartItemNumber > 0 ? `(${cartItemNumber})` : ""}
              </Link>
            </li>
            {/*-- CONDITIONAL RENDERING FOR USER AUTHENTICATION --*/}
            {loggedUser ? (
              // If 'loggedUser' has data (i.e., a user is logged in), display a personalized welcome message.
              <li>
                <Link to="/user">Bem Vindo, {loggedUser.name}</Link>
              </li>
            ) : (
              // If 'loggedUser' is empty, display the link to the login/registration page.
              <li>
                <Link to="/auth">Entrar / Cadastro</Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
}

// Export the Header component to be used in other parts of the application, like App.js.
export default Header;