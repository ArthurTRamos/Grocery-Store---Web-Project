import React, { useState, useEffect } from "react";
import { useIMask } from "react-imask"; // Import the hook
import "./UserCoupons.css";

import CouponInfo from "./CouponInfo";
import CustomAlert from "../utility_elements/CustomAlert";
// Import the centralized imask configurations
import { imaskOptions } from "../../services/Formatters";
import { GetUserById, UpdateUser, GetCoupons } from "../../services/Fetchs";

function UserCoupons({ loggedUser }) {
  // State to manage the new coupon number
  const [newCouponNumber, setNewCouponNumber] = useState("");
  const [couponAlreadyAdded, setCouponAlreadyAdded] = useState(false);
  const [couponNotFound, setCouponNotFound] = useState(false);

  // States to manage API
  const [loggedUserData, setLoggedUserData] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiError, setApiError] = useState(false);

  // Fetch initial data
  useEffect(() => {
      const fetchUserData = async () => {
        try {
          setIsLoading(true);
          const data = await GetUserById(loggedUser);
          setLoggedUserData(data || null);
          setError(null);
        } catch (err) {
          setError("Falha ao carregar dados do usuário.");
          console.error(err);
        }

        try {
          setIsLoading(true);
          const data = await GetCoupons();
          setCoupons(data || null);
          setError(null);
        } catch (err) {
          setError("Falha ao carregar dados do usuário.");
          console.error(err);
        }

        setIsLoading(false);
      };
  
      fetchUserData();
    }, []);

  // Setup imask hook for the coupon input
  const { ref: couponRef } = useIMask(imaskOptions.coupon, {
    onAccept: (value) => setNewCouponNumber(value),
  });

  // Handler for when the NewCoupon is added
const handleNewCouponAdd = async () => {
  // --- Start of synchronous checks ---
  const couponExists = loggedUserData.coupons.find(
    (coupon) => coupon.couponNumber === newCouponNumber
  );
  if (couponExists) {
    setCouponAlreadyAdded(true);
    return;
  }

  const couponData = coupons.find(
    (coupon) => coupon.couponNumber === newCouponNumber
  );
  if (!couponData) {
    setCouponNotFound(true);
    return;
  }
  // --- End of synchronous checks ---

  // Prepare the new state object first
  const newUserData = {
    ...loggedUserData,
    coupons: [
      ...loggedUserData.coupons,
      {
        couponNumber: newCouponNumber,
        used: false,
      },
    ],
  };

  try {
    // Await the API call
    await UpdateUser(loggedUser, newUserData);

    // If the API call succeeds, THEN update the state
    setLoggedUserData(newUserData);
    
    // Clear input field after a successful addition
    setNewCouponNumber("");

  } catch (err) {
    setApiError(true);
    console.error(err);
    // Do not update the state if the API call fails
  } 
};

  return (
    <div className="user-coupons-container">
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
      {apiError && (
        <CustomAlert
          messageHeader="Erro de Comunicação"
          alertMessage="Ocorreu um erro na comunicação com o servidor. Tente novamente mais tarde."
          onConfirm={() => setApiError(false)}
          onConfirmMessage={"Ok"}
          error={true}
        />
      )}
      {isLoading && <p className="loading-message">Carregando Perfil...</p>}
      {error && <p className="error-message">{error}</p>}
      {!isLoading && !error && (
        <>
          <div className="user-coupons-add">
            <h2>Adicionar Novo Cupom</h2>
            <div className="user-coupons-add-actions">
              <input
                type="text"
                placeholder="Digite o código do cupom"
                ref={couponRef} // Use the ref from the hook
                value={newCouponNumber}
                onKeyDown={(e) => {
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
              {loggedUserData.coupons.map((userCoupon) => {
                const couponData = coupons.find(
                  (coupon) => coupon.couponNumber === userCoupon.couponNumber
                );
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
              {loggedUserData.coupons.map((userCoupon) => {
                const couponData = coupons.find(
                  (coupon) => coupon.couponNumber === userCoupon.couponNumber
                );
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
