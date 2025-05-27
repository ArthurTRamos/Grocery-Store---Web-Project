import React from "react";

import "./CouponSelection.css";

function CouponSelection({ onCouponSelect, coupons, userCoupons }) {
  return (
    <div className="coupon-selection-container">
      <h3>Adicionar Cupom</h3>
      <select
        className="coupon-dropdown"
        onChange={(e) => onCouponSelect(e.target.value)}
        required
      >
        <option value="">Selecione um cupom</option>
        {userCoupons
          ? userCoupons.map((couponData) => {
              // First, check if the coupon is used
              if (couponData.used) {
                return null;
              }

              // Then, find the coupon details from the 'coupons' array
              const foundCoupon = coupons.find(
                (coupon) => coupon.couponNumber === couponData.couponNumber
              );

              // If the coupon details are not found in 'coupons', don't render the option
              if (!foundCoupon) {
                return null;
              }

              // If the coupon is not used AND its details are found, render the option
              return (
                <option
                  className="coupon-option"
                  key={couponData.couponNumber}
                  value={couponData.couponNumber}
                >
                  <p>{couponData.couponNumber} </p>
                  <p>{"["}
                    {foundCoupon.type === "money"
                      ? `R$ ${foundCoupon.discount.toFixed(2)}`
                      : `${foundCoupon.discount}%`}
                    {"]"}
                  </p>
                </option>
              );
            })
          : null}
      </select>
    </div>
  );
}

export default CouponSelection;
