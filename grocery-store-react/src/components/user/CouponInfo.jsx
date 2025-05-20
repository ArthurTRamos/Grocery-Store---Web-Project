import React from "react";
import "./CouponInfo.css";

function CouponInfo({ couponData, used }) {
  return (
    <div className={`coupon-info-container-${used ? "used" : "non-used"}`}>
      <div className="coupon-info-header">
        <h2>{couponData.couponNumber}</h2>
      </div>
      <div className="coupon-info-details">
        <p>
          Desconto:{" "}
          {couponData.type === "money"
            ? `R$ ${couponData.discount.toFixed(2)}`
            : `${couponData.discount}%`}
        </p>
      </div>
      {used && (
        <div className="used-coupon-info-label">
          <p>Usado</p>
        </div>
      )}
    </div>
  );
}

export default CouponInfo;
