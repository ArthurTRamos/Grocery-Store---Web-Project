import React from "react";
import "./CouponInfo.css"; // Import the stylesheet for this component.

/**
 * A presentational component that displays the information for a single discount coupon.
 * It changes its style based on whether the coupon has been used.
 */
function CouponInfo({ couponData, used }) {
  return (
    // The container's class is dynamically set based on the 'used' prop.
    // This allows for different styling for used and unused coupons via CSS.
    <div className={`coupon-info-container-${used ? "used" : "non-used"}`}>
      <div className="coupon-info-header">
        {/* Display the coupon's unique code or number. */}
        <h2>{couponData.couponNumber}</h2>
      </div>
      <div className="coupon-info-details">
        <p>
          Desconto:{" "}
          {/* Use a ternary operator to format the discount value based on its type. */}
          {couponData.type === "money"
            ? // If the type is "money", format it as Brazilian currency with two decimal places.
              `R$ ${couponData.discount.toFixed(2)}`
            : // Otherwise (e.g., for "percentage"), display the value with a percent sign.
              `${couponData.discount}%`}
        </p>
      </div>
      {/*-- CONDITIONAL RENDERING FOR THE "USED" LABEL --*/}
      {/* This block is only rendered if the 'used' prop is true. */}
      {used && (
        <div className="used-coupon-info-label">
          <p>Usado</p>
        </div>
      )}
    </div>
  );
}

// Export the component for use in other parts of the application.
export default CouponInfo;