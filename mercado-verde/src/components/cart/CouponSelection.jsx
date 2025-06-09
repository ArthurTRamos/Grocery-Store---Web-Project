import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./CouponSelection.css";

function CouponSelection({ onCouponSelect, coupons, userCoupons }) {
  const navigate = useNavigate(); // Initialize the navigate function

  // Handler to navigate to the add new coupon page
  const handleAddCouponClick = () => {
    navigate("/user/coupons");
  };

  return (
    <div className="coupon-selection-container">
      <h3>Adicionar Cupom</h3>
      <div className="coupon-controls">
        {" "}
        {/* Wrapper for dropdown and button */}
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

                // If the coupon is not used AND its details are found, render the option.
                // NOTE: <option> tags cannot contain other elements like <p>.
                // The text content has been combined into a single valid string.
                return (
                  <option
                    className="coupon-option"
                    key={couponData.couponNumber}
                    value={couponData.couponNumber}
                  >
                    {`${couponData.couponNumber} [${
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