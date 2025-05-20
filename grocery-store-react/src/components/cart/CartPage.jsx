import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CardSelection from "./CardSelection";
import CartItem from "./CartItem";
import CouponSelection from "./CouponSelection";

import "./CartPage.css";

function CartPage({
  cartData,
  paymentMethods,
  userCoupons,
  coupons,
  productData,
  setCartData,
  setProductData,
}) {
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState("");
  //Errors
  const [cardError, setCardError] = useState("");
  const [emptyCartError, setEmptyCartError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const calculateSubtotalDiscount = () => {
      // Calculate subtotal
      let subtotalValue = 0;
      cartData.forEach((cartItem) => {
        const product = productData.find(
          (product) => product.id === cartItem.id
        );
        if (product) {
          subtotalValue += product.price * cartItem.amount;
        }
      });
      setSubtotal(subtotalValue);

      // Calculate discount
      let discountValue = 0;
      if (userCoupons) {
        const selectedCouponUserData = userCoupons.find(
          (coupon) => coupon.couponNumber === selectedCoupon
        );

        if (selectedCouponUserData && !selectedCouponUserData.used) {
          const couponData = coupons.find(
            (coupon) => coupon.couponNumber === selectedCoupon
          );
          if (couponData) {
            discountValue =
              couponData.type === "money"
                ? -Math.min(couponData.discount, subtotalValue)
                : (-subtotalValue * couponData.discount) / 100;
          }
        }
      }

      setDiscount(discountValue);
      setTotal(Math.max(subtotalValue + discountValue, 0));
    };

    calculateSubtotalDiscount();
    setEmptyCartError("");
  }, [cartData, coupons, productData, selectedCoupon, userCoupons]);

  const handleFinish = () => {
    if (!total) {
      setEmptyCartError(
        "Por favor, adicione ao menos um item antes de finalizar a compra!"
      );
      return;
    }
    setEmptyCartError(""); // Clear error when items are present

    if (!selectedCard) {
      setCardError(
        "Por favor, selecione um cartão antes de finalizar a compra!"
      );
      return;
    }
    setCardError(""); // Clear error when card is selected

    const updatedProductData = productData.map((product) => {
      const cartItem = cartData.find((item) => item.id === product.id);
      if (cartItem) {
        return {
          ...product,
          stock: product.stock - cartItem.amount,
        };
      }
      return product;
    });

    setProductData(updatedProductData);
    setCartData([]);
    alert("Compra finalizada com sucesso!");

    const selectedCouponUserData = userCoupons.find(
      (coupon) => coupon.couponNumber === selectedCoupon
    );

    if (selectedCouponUserData) {
      selectedCouponUserData.used = true;
    }

    setSelectedCoupon("");
    setSelectedCard("");

    // Redirect to home page after purchase
    navigate("/");
  };

  const handleRedirect = () => {
    navigate("/auth");
  }

  return (
    <div className="cart-page-container">
      <div className="cart-page-left-container">
        <div className="left-header">
          <h1>Itens do Carrinho</h1>
        </div>
        <div className="cart-items-list">
          {cartData.map((cartItem) => {
            const product = productData.find(
              (product) => product.id === cartItem.id
            );
            return (
              <CartItem
                key={cartItem.id}
                cartItemData={{
                  ...product,
                  amount: cartItem.amount,
                }}
                changeAmount={(id, newAmount) => {
                  // prev = previous state of the cartData
                  setCartData((prev) =>
                    // Iterates through the previous state and compared id
                    // If the id matches, it updates the amount
                    prev.map((item) =>
                      // ...item = other properties of the item
                      // amount: newAmount = replaces the amount property
                      // else it keeps the item unchanged
                      item.id === id ? { ...item, amount: newAmount } : item
                    )
                  );
                }}
                removeItem={(id) => {
                  // filter only lets through itens with an id different from the one passed
                  setCartData((prev) => prev.filter((item) => item.id !== id));
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="cart-page-right-container">
        <div className="cart-summary">
          <h3>Resumo do pedido</h3>
          <div className="cart-summary-subtotal">
            <p>Subtotal</p>
            <p>R$ {subtotal.toFixed(2)}</p>
          </div>
          <div className="cart-summary-discount">
            <p>Desconto</p>
            <p>R$ {discount.toFixed(2)}</p>
          </div>
          <div className="cart-summary-total">
            <p>Total</p>
            <p>R$ {total.toFixed(2)}</p>
          </div>
        </div>
        {paymentMethods ? (
          <CardSelection
            paymentMethods={paymentMethods}
            onCardSelect={(card) => {
              setSelectedCard(card);
              setCardError(""); // Clear error when card is selected
            }}
            cardError={cardError}
          />
        ) : null}

        {userCoupons ? (
          <CouponSelection
            coupons={userCoupons}
            onCouponSelect={setSelectedCoupon}
          />
        ) : null}
        {userCoupons && paymentMethods ? (
          <div className="cart-page-button">
            <button
              onClick={handleFinish}
            >
              Finalizar Compra
            </button>
            {emptyCartError && (
              <p className="empty-cart-error">{emptyCartError}</p>
            )}
          </div>
        ) : (
          <div className="cart-page-button"> 
          <button
              onClick={handleRedirect}
            >
              Entre ou Cadastre-se para Finalizar a Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
