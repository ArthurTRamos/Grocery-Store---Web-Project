import React, { useState, useEffect } from "react";
import { useIMask } from "react-imask"; // Import the hook for input masking
import "./UserCoupons.css";

// Import child components
import CouponInfo from "./CouponInfo";
import CustomAlert from "../utility_elements/CustomAlert";
// Import the centralized imask configurations and API functions
import { imaskOptions } from "../../services/Formatters";
import { GetUserById, UpdateUser, GetCoupons } from "../../services/Fetchs";

/**
 * A component to manage a user's discount coupons. It allows users to add new coupons
 * and displays their current coupons, separated into 'available' and 'used' lists.
 */
function UserCoupons({ loggedUser }) {
  // State to manage the input for adding a new coupon code.
  const [newCouponNumber, setNewCouponNumber] = useState("");
  // States to control specific error alerts.
  const [couponAlreadyAdded, setCouponAlreadyAdded] = useState(false);
  const [couponNotFound, setCouponNotFound] = useState(false);

  // States to manage data from the API and loading/error status.
  const [loggedUserData, setLoggedUserData] = useState([]); // Holds the specific user's data.
  const [coupons, setCoupons] = useState([]); // Holds the master list of all coupons in the system.
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiError, setApiError] = useState(false);

  // This effect fetches all necessary initial data when the component mounts.
  useEffect(() => {
    const fetchUserData = async () => {
      // Fetch the logged-in user's data.
      try {
        setIsLoading(true);
        const data = await GetUserById(loggedUser);
        setLoggedUserData(data || null);
        setError(null);
      } catch (err) {
        setError("Falha ao carregar dados do usuário.");
        console.error(err);
      }

      // Fetch the master list of all available coupons.
      try {
        setIsLoading(true);
        const data = await GetCoupons();
        setCoupons(data || null);
        setError(null);
      } catch (err) {
        setError("Falha ao carregar dados do usuário.");
        console.error(err);
      }

      setIsLoading(false); // Set loading to false after all fetches are attempted.
    };

    fetchUserData();
  }, []); // Empty dependency array means this runs once on mount.

  // Setup imask hook for the coupon input field using a centralized configuration.
  const { ref: couponRef } = useIMask(imaskOptions.coupon, {
    onAccept: (value) => setNewCouponNumber(value), // Update state when the masked value changes.
  });

  // Handler for when the user tries to add a new coupon.
  const handleNewCouponAdd = async () => {
    // --- Synchronous Validation Checks ---
    // Check if the user has already added this coupon.
    const couponExists = loggedUserData.coupons.find(
      (coupon) => coupon.couponNumber === newCouponNumber
    );
    if (couponExists) {
      setCouponAlreadyAdded(true);
      return; // Stop execution if coupon is already in the user's list.
    }

    // Check if the coupon code is valid by seeing if it exists in the master list.
    const couponData = coupons.find(
      (coupon) => coupon.couponNumber === newCouponNumber
    );
    if (!couponData) {
      setCouponNotFound(true);
      return; // Stop execution if the coupon code is invalid.
    }
    // --- End of Synchronous Checks ---

    // Prepare the new user data object for the API update.
    const newUserData = {
      ...loggedUserData,
      coupons: [
        ...loggedUserData.coupons,
        {
          couponNumber: newCouponNumber,
          used: false, // New coupons are always added as unused.
        },
      ],
    };

    try {
      // Call the API to update the user data on the server.
      await UpdateUser(loggedUser, newUserData);

      // If the API call succeeds, then update the local state.
      setLoggedUserData(newUserData);

      // Clear the input field for the next entry.
      setNewCouponNumber("");
    } catch (err) {
      // If the API call fails, show an error and do not update the local state.
      setApiError(true);
      console.error(err);
    }
  };

  return (
    <div className="user-coupons-container">
      {/* Conditionally rendered alerts for specific validation errors. */}
      {couponAlreadyAdded && (
        <CustomAlert
          alertMessage="Cupom já adicionado!"
          onConfirm={() => setCouponAlreadyAdded(false)}
          onConfirmMessage="OK"
        />
      )}
      {couponNotFound && (
        <CustomAlert
          alertMessage="Cupom inválido!"
          onConfirm={() => setCouponNotFound(false)}
          onConfirmMessage="OK"
        />
      )}
      <div className="user-coupons-header">
        <h1>Meus Cupons</h1>
      </div>
      {/* Conditionally rendered alert for generic API errors. */}
      {apiError && (
        <CustomAlert
          messageHeader="Erro de Comunicação"
          alertMessage="Ocorreu um erro na comunicação com o servidor. Tente novamente mais tarde."
          onConfirm={() => setApiError(false)}
          onConfirmMessage={"Ok"}
          error={true}
        />
      )}
      {/* Display loading/error messages during the initial data fetch. */}
      {isLoading && <p className="loading-message">Carregando Perfil...</p>}
      {error && <p className="error-message">{error}</p>}
      {/* Render main content only after data is successfully loaded. */}
      {!isLoading && !error && (
        <>
          <div className="user-coupons-add">
            <h2>Adicionar Novo Cupom</h2>
            <div className="user-coupons-add-actions">
              <input
                type="text"
                placeholder="Digite o código do cupom"
                ref={couponRef} // Attach the ref from the useIMask hook.
                value={newCouponNumber} // Control the input value with state.
                onKeyDown={(e) => {
                  // Allow submitting by pressing the Enter key.
                  if (e.key === "Enter") {
                    handleNewCouponAdd();
                  }
                }}
              />
              <button
                onClick={() => {
                  handleNewCouponAdd();
                }}
              >
                Adicionar
              </button>
            </div>
          </div>
          <div className="user-coupons-list">
            <h2>Cupons Disponíveis</h2>
            <div className="non-used-coupons-exhibition-container">
              {/* Map over the user's coupons to display the unused ones. */}
              {loggedUserData.coupons.map((userCoupon) => {
                // For each coupon the user has, find its full details in the master list.
                const couponData = coupons.find(
                  (coupon) => coupon.couponNumber === userCoupon.couponNumber
                );
                // Render the CouponInfo component only if the coupon exists and is NOT used.
                return couponData && !userCoupon.used ? (
                  <CouponInfo
                    key={couponData.couponNumber}
                    couponData={couponData}
                    used={userCoupon.used}
                  />
                ) : null;
              })}
            </div>
            <h2>Cupons Usados</h2>
            <div className="used-coupons-exhibition-container">
              {/* Map over the user's coupons again to display the used ones. */}
              {loggedUserData.coupons.map((userCoupon) => {
                // Find the full details for each coupon.
                const couponData = coupons.find(
                  (coupon) => coupon.couponNumber === userCoupon.couponNumber
                );
                // Render the CouponInfo component only if the coupon exists and IS used.
                return couponData && userCoupon.used ? (
                  <CouponInfo
                    key={couponData.couponNumber}
                    couponData={couponData}
                    used={userCoupon.used}
                  />
                ) : null;
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserCoupons;
