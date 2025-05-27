import React, { useState } from "react";

import "./UserCoupons.css";

import CouponInfo from "./CouponInfo";

function UserCoupons({ loggedUser, setLoggedUser, coupons }) {
  // State to manage the new coupon number
  const [newCouponNumber, setNewCouponNumber] = useState("");

  // Handler for when the NewCoupon is added
  const handleNewCouponAdd = () => {
    // Check if the coupon number is already in the user's coupons
    const couponExists = loggedUser.coupons.find(
      (coupon) => coupon.couponNumber === newCouponNumber
    );
    if (couponExists) {
      alert("Cupom já adicionado!");
      return;
    }

    // Check if the coupon number is valid
    const couponData = coupons.find(
      (coupon) => coupon.couponNumber === newCouponNumber
    );
    if (!couponData) {
      alert("Cupom inválido!");
      return;
    }

    // Add the new coupon to the user's coupons
    // and set it as unused
    setLoggedUser((prevData) => ({
      ...prevData,
      coupons: [
        ...prevData.coupons,
        {
          couponNumber: newCouponNumber,
          used: false,
        },
      ],
    }));
  };

  return (
    <div className="user-coupons-container">
      <div className="user-coupons-header">
        <h1>Meus Cupons</h1>
      </div>
      <div className="user-coupons-add">
        <h2>Adicionar Novo Cupom</h2>
        <div className="user-coupons-add-actions">
          <input
            type="text"
            placeholder="Digite o código do cupom"
            value={newCouponNumber}
            onChange={(e) => setNewCouponNumber(e.target.value.toUpperCase())}
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
          {loggedUser.coupons.map((userCoupon) => {
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
          {loggedUser.coupons.map((userCoupon) => {
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
    </div>
  );
}

export default UserCoupons;
