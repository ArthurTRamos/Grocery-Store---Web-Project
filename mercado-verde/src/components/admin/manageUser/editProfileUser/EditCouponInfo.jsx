// Importing React library
import React from "react";
// Importing associated CSS for styling
import "./EditCouponInfo.css";

// Component to display information about a coupon
function EditCouponInfo({ couponData, used }) {
  return (
    // Dynamic container class based on whether the coupon is used or not
    <div className={`coupon-info-container-${used ? "used" : "non-used"}`}>
      
      {/* Header section displaying the coupon number */}
      <div className="coupon-info-header">
        <h2>{couponData.couponNumber}</h2>
      </div>

      {/* Coupon details including discount value and type */}
      <div className="coupon-info-details">
        <p>
          Desconto:{" "}
          {couponData.type === "money"
            ? `R$ ${couponData.discount.toFixed(2)}`
            : `${couponData.discount}%`}
        </p>
      </div>

      {/* Label displayed only if the coupon is used */}
      {used && (
        <div className="used-coupon-info-label">
          <p>Usado</p>
        </div>
      )}
    </div>
  );
}

// Exporting the component for use in other parts of the application
export default EditCouponInfo;
