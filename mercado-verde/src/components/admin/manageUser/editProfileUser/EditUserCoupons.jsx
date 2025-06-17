import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./EditUserCoupons.css";

import CouponInfo from "./EditCouponInfo";

import CustomAlert from "../../../utility_elements/CustomAlert";

import { GetUserById, UpdateUser, GetCoupons } from "../../../../services/Fetchs";

function EditUserCoupons() {
  // State to hold new coupon input value
  const [newCouponNumber, setNewCouponNumber] = useState("");

  // Flags to show alerts for duplicate coupon or invalid coupon
  const [couponAlreadyAdded, setCouponAlreadyAdded] = useState(false);
  const [couponNotFound, setCouponNotFound] = useState(false);

  // User info and all available coupons from server
  const [userEdit, setUserEdit] = useState("");
  const [coupons, setCoupons] = useState([]);

  // Get user ID from URL parameters
  const { id } = useParams();
  
  // Fetch user data and coupons when component mounts or id changes
  useEffect(() => {
    if (!id) {
      console.warn("ID não encontrado. Redirecionando...");
      return;
    }

    // Fetch user info by ID
    const fetchUserInfos = async() => {
      try {
        console.log(id);
        const userInfos = await GetUserById(id);
        setUserEdit(userInfos);
      } catch(error){
        console.log(error);
      }
    }

    // Fetch all coupons data
    const fetchCouponsInfos = async() => {
      try {
        const couponsInfos = await GetCoupons();
        setCoupons(couponsInfos);
      } catch(error){
        console.log(error);
      }
    }

    fetchUserInfos();
    fetchCouponsInfos();
  }, [id]);

  // Handle adding a new coupon to the user
  const handleNewCouponAdd = async () => {
    // Check if input is empty or only spaces
    if (!newCouponNumber.trim()) {
      alert("Digite um código de cupom válido!");
      return;
    }

    // Check if user data is loaded
    if (!userEdit) {
      alert("Erro: dados do usuário não encontrados!");
      return;
    }

    // Get user's current coupons (empty array if none)
    const userCoupons = userEdit.coupons || [];

    // Check if coupon is already added to user
    const couponExists = userCoupons.find(
      (coupon) => coupon.couponNumber === newCouponNumber
    );

    if (couponExists) {
      setCouponAlreadyAdded(true);
      return;
    }

    // Find coupon details from all coupons by coupon number
    const couponData = coupons?.find(
      (coupon) => coupon.couponNumber === newCouponNumber
    );

    // Show alert if coupon not found in available coupons
    if (!couponData) {
      setCouponNotFound(true);
      return;
    }

    // Create new coupon object for user
    const newUserCoupon = {
      couponNumber: newCouponNumber,
      used: false,
    };

    // Update user data with new coupon added
    const updatedUser = {
      ...userEdit,
      coupons: [...userCoupons, newUserCoupon],
    };

    // Update state immediately for UI responsiveness
    setUserEdit(updatedUser);

    try {
      // Update user data on server
      await UpdateUser(id, updatedUser);
      console.log("atualizou");
    } catch(error) {
      console.log(error);
    }

    // Clear input field
    setNewCouponNumber("");
  };

  // Show loading message if user data is not ready yet
  if (!userEdit) {
    return <div>Carregando...</div>;
  }

  // Separate user's coupons into available (not used) and used lists
  const userCoupons = userEdit.coupons || [];
  const availableCoupons = userCoupons.filter((userCoupon) => !userCoupon.used);
  const usedCoupons = userCoupons.filter((userCoupon) => userCoupon.used);

  return (
    <div className="user-coupons-container">

      {/* Alert if coupon was already added */}
      {couponAlreadyAdded && (
        <CustomAlert
          alertMessage="Cupom já adicionado!"
          onConfirm={() => setCouponAlreadyAdded(false)}
          onConfirmMessage="OK"
        />
      )}

      {/* Alert if coupon not found */}
      {couponNotFound && (
        <CustomAlert
          alertMessage="Cupom inválido!"
          onConfirm={() => setCouponNotFound(false)}
          onConfirmMessage="OK"
        />
      )}

      {/* Header showing user's name */}
      <div className="user-coupons-header">
        <h1>Cupons de {userEdit.name}</h1>
      </div>

      {/* Section to add a new coupon */}
      <div className="user-coupons-add">
        <h2>Adicionar Novo Cupom</h2>
        <div className="user-coupons-add-actions">
          <input
            type="text"
            placeholder="Digite o código do cupom"
            value={newCouponNumber}
            onChange={(e) => setNewCouponNumber(e.target.value.toUpperCase())} // Convert input to uppercase
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleNewCouponAdd();
              }
            }}
          />
          <button onClick={handleNewCouponAdd}>Adicionar</button>
        </div>
      </div>

      {/* List of available (not used) coupons */}
      <div className="user-coupons-list">
        <h2>Cupons Disponíveis ({availableCoupons.length})</h2>
        <div className="non-used-coupons-exhibition-container">
          {availableCoupons.length === 0 ? (
            <p>Nenhum cupom disponível.</p>
          ) : (
            availableCoupons.map((userCoupon) => {
              const couponData = coupons?.find(
                (coupon) => coupon.couponNumber === userCoupon.couponNumber
              );
              // Render CouponInfo only if coupon details found
              return couponData ? (
                <CouponInfo
                  key={couponData.couponNumber}
                  couponData={couponData}
                  used={userCoupon.used}
                />
              ) : null;
            })
          )}
        </div>

        {/* List of used coupons */}
        <h2>Cupons Usados ({usedCoupons.length})</h2>
        <div className="used-coupons-exhibition-container">
          {usedCoupons.length === 0 ? (
            <p>Nenhum cupom usado.</p>
          ) : (
            usedCoupons.map((userCoupon) => {
              const couponData = coupons?.find(
                (coupon) => coupon.couponNumber === userCoupon.couponNumber
              );
              // Render CouponInfo only if coupon details found
              return couponData ? (
                <CouponInfo
                  key={couponData.couponNumber}
                  couponData={couponData}
                  used={userCoupon.used}
                />
              ) : null;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default EditUserCoupons;
