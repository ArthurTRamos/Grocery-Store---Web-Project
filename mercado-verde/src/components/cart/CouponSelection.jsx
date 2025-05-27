import React from "react";

import "./CouponSelection.css";

function CouponSelection({ onCouponSelect, coupons }) {
  return (
    <div className="coupon-selection-container">
      <h3>Adicionar Cupom</h3>
      <select
        className="coupon-dropdown"
        onChange={(e) => onCouponSelect(e.target.value)}
        required
      >
        <option value="">Selecione um cupom</option>
        {coupons
          ? coupons.map((couponData) =>
              couponData.used ? null : (
                <option
                  key={couponData.couponNumber}
                  value={couponData.couponNumber}
                >
                  <p>{couponData.couponNumber}</p>
                </option>
              )
            )
          : null}
      </select>
    </div>
  );
}

export default CouponSelection;
