// Import necessary dependencies from React and react-router-dom.
import React, { useState /*useEffect/*/ } from "react";
import { Routes, Route } from "react-router-dom";

// Import custom service functions for API calls.
import {
  GetProducts,
  FetchCreateProduct,
  UpdateCoupon,
  GetUserById,
} from "./services/Fetchs";

// Import page components.
import HomePage from "./components/HomePage";

// Import Admin-specific components.
import AdmHomeAdmin from "./components/admin/HomeAdmin";
import AdmCreateUser from "./components/admin/createUserProduct/CreateUser";
import AdmCreateProduct from "./components/admin/createUserProduct/CreateProduct";
import AdmCreateCoupon from "./components/admin/createUserProduct/CreateCoupon";
import AdmManageUsers from "./components/admin/manageUser/ManageUsers";
import AdmLayout from "./components/admin/adm_layout"; // Admin section layout component.

// Import components for editing user profiles from the admin panel.
import AdmEditUserPage from "./components/admin/manageUser/editProfileUser/EditUserPage";
import AdmEditProfile from "./components/admin/manageUser/editProfileUser/EditProfile";
import AdmEditPaymentMethods from "./components/admin/manageUser/editProfileUser/EditPaymentMethods";
import AdmEditUserCoupons from "./components/admin/manageUser/editProfileUser/EditUserCoupons";

// Import general and user-specific components.
import ProductPage from "./components/ProductPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UserPage from "./components/user/UserPage"; // Layout for the user's personal area.
import UserProfile from "./components/user/UserProfile";
import PaymentMethods from "./components/user/PaymentMethods";
import CartPage from "./components/cart/CartPage";
import UserCoupons from "./components/user/UserCoupons";
import LoginRegister from "./components/LoginRegister";
import RecipePage from "./components/RecipePage";
import Logout from "./components/user/Logout";
import Sections from "./components/sections/Sections";

// Import the main stylesheet for the application.
import "./App.css";

function App() {
  // State to hold the items in the user's shopping cart.
  const [cartData, setCartData] = useState([]);
  // State to hold product data (commented out).
  // const [productData, setProductData] = useState([]);
  // State to hold user data (commented out).
  // const [users, setUsers] = useState([]);
  // State to store the ID of the currently logged-in user.
  const [loggedUserId, setLoggedUserId] = useState("");

  // This useEffect hook is commented out. It was likely intended to sort the productData array by name whenever it was updated.
  // useEffect(() => {
  //   const orderProductsByName = () => {
  //     productData.sort((a, b) => {
  //       if (a.name < b.name) return -1;
  //       if (a.name > b.name) return 1;
  //       return 0;
  //     });
  //   };

  //   orderProductsByName();
  // }, [productData]);

  // This function is commented out. It was likely intended to handle the registration of a new user by updating the 'users' state.
  // const handleRegisterUser = (newUser) => {
  //   const updatedUserData = [...users, newUser];

  //   console.log("Novo user no app.jsx");
  //   console.log({ updatedUserData });

  //   setUsers(updatedUserData);

  //   console.log("Adicionando user no app.jsx");
  //   console.log({ users });
  // };

  return (
    // Main container div for the entire application.
    <div className="App">
      {/* Header component is displayed on all pages, showing the number of items in the cart and the logged-in user's status. */}
      <Header loggedUserId={loggedUserId} cartItemNumber={cartData.length} />

      {/* The Routes component from react-router-dom manages all the application's routing. */}
      <Routes>
        {/* Route for the home page. */}
        <Route path="/" element={<HomePage />} />
        {/* Nested routes for the admin dashboard, all rendered within the AdmLayout component. */}
        <Route
          path="/manage"
          element={<AdmLayout loggedUserId={loggedUserId} />}
        >
          {/* The default page for the /manage route. */}
          <Route index element={<AdmHomeAdmin />} />
          {/* Route for the admin to create a new user. */}
          <Route path="createUser" element={<AdmCreateUser />} />
          {/* Route for the admin to create a new product. */}
          <Route path="createProduct" element={<AdmCreateProduct />} />
          {/* Route for the admin to create a new coupon. */}
          <Route path="createCoupon" element={<AdmCreateCoupon />} />
          {/* Route for the admin to manage existing users. */}
          <Route path="manageUsers" element={<AdmManageUsers />} />
          {/* Nested routes for editing a specific user's details, rendered within the AdmEditUserPage layout. */}
          <Route
            path="manageUsers/edit"
            element={<AdmEditUserPage loggedUserId={loggedUserId} />}
          >
            {/* Default edit route, shows the user's profile. */}
            <Route
              index
              element={<AdmEditProfile loggedUserId={loggedUserId} />}
            />
            {/* Route to edit a specific user's profile, identified by an ID in the URL. */}
            <Route
              index
              path="profile/:id"
              element={<AdmEditProfile loggedUserId={loggedUserId} />}
            />
            {/* Route to edit a specific user's payment methods. */}
            <Route
              path="payment-methods/:id"
              element={<AdmEditPaymentMethods />}
            />
            {/* Route to edit a specific user's coupons. */}
            <Route path="coupons/:id" element={<AdmEditUserCoupons />} />
          </Route>
        </Route>
        {/* Route for displaying product sections or categories. */}
        <Route path="/section" element={<Sections />} />
        {/* Route for the product details page. */}
        <Route
          path="/product"
          element={
            <ProductPage
              loggedUserId={loggedUserId}
              setCartData={setCartData}
              cartData={cartData}
            />
          }
        />
        {/* Nested routes for the logged-in user's personal area, rendered within the UserPage layout. */}
        <Route path="/user" element={<UserPage loggedUser={loggedUserId} />}>
          {/* Default route for the user area, showing the user's profile. */}
          <Route index element={<UserProfile loggedUser={loggedUserId} />} />
          {/* Route for the user to manage their payment methods. */}
          <Route
            path="payment-methods"
            element={<PaymentMethods loggedUser={loggedUserId} />}
          />
          {/* Route for the user to view their available coupons. */}
          <Route
            path="coupons"
            element={<UserCoupons loggedUser={loggedUserId} />}
          />
        </Route>
        {/* Route for the shopping cart page. */}
        <Route
          path="/cart"
          element={
            <CartPage
              cartData={cartData}
              setCartData={setCartData}
              loggedUser={loggedUserId}
            />
          }
        />
        {/* Route for the login and registration page. */}
        <Route
          path="/auth"
          element={<LoginRegister setLoggedUserId={setLoggedUserId} />}
        />
        {/* Route that logs the user out. */}
        <Route
          path="/logout"
          element={<Logout setLoggedUserId={setLoggedUserId} />}
        />
        {/* Route for the recipe page. */}
        <Route path="/recipe" element={<RecipePage />} />

        {/* A "catch-all" route that redirects any undefined URL path to the HomePage. */}
        <Route path="*" element={<HomePage />} />
      </Routes>

      {/* Footer component is displayed on all pages. */}
      <Footer />
    </div>
  );
}

// Export the App component to be used as the root of the application.
export default App;
