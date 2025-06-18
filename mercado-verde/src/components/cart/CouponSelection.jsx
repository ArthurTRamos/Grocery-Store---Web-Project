import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation

import "./CouponSelection.css";

/**
 * A component that provides a dropdown menu for a user to select one of their available coupons.
 */
function CouponSelection({ onCouponSelect, coupons, userCoupons }) {
  const navigate = useNavigate(); // Initialize the navigate function from the hook.

  // This handler is called when the "Add New" button is clicked.
  const handleAddCouponClick = () => {
    // Navigates the user to the page where they can manage their coupons.
    navigate("/user/coupons");
  };

  return (
    <div className="coupon-selection-container">
      <h3>Adicionar Cupom</h3>
      <div className="coupon-controls">
        {/* Wrapper for the dropdown and the button */}
        <select
          className="coupon-dropdown"
          // When the user selects an option, the onCouponSelect function from props is called with the coupon code.
          onChange={(e) => onCouponSelect(e.target.value)}
          required
        >
          {/* Default, non-selectable option */}
          <option value="">Selecione um cupom</option>
          {/* Check if the userCoupons array exists before trying to map over it. */}
          {userCoupons
            ? userCoupons.map((couponData) => {
                // First, filter out any coupons that have already been marked as used.
                if (couponData.used) {
                  return null; // Don't render an option for used coupons.
                }

                // For each of the user's coupons, find the corresponding full details
                // from the master 'coupons' array provided in props.
                const foundCoupon = coupons.find(
                  (coupon) => coupon.couponNumber === couponData.couponNumber
                );

                // As a safeguard, if the coupon details aren't found in the master list, don't render it.
                if (!foundCoupon) {
                  return null;
                }

                // If the coupon is not used and its details are found, render the <option> element.
                return (
                  <option
                    className="coupon-option"
                    key={couponData.couponNumber} // Use the unique coupon number as the key.
                    value={couponData.couponNumber} // The value of the option will be the coupon number.
                  >
                    {/* Format the display text to be informative, showing the code and the discount amount. */}
                    {`${couponData.couponNumber} [${
                      // Use a ternary operator to format the discount based on its type (money or percentage).
                      foundCoupon.type === "money"
                        ? `R$ ${foundCoupon.discount.toFixed(2)}`
                        : `${foundCoupon.discount}%`
                    }]`}
                  </option>
                );
              })
            : null}
        </select>
        <button
          type="button"
          className="add-coupon-btn"
          onClick={handleAddCouponClick}
        >
          Adicionar Novo
        </button>
      </div>
    </div>
  );
}

export default CouponSelection;