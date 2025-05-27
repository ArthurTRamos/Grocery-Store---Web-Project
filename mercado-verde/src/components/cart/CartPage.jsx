import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CardSelection from "./CardSelection";
import CartItem from "./CartItem";
import CouponSelection from "./CouponSelection";
import CustomAlert from "../utility_elements/CustomAlert";

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
  const [avaliableBuy, setAvaliableBuy] = useState(true);
  //alert
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

    const checkStockAvailability = () => {
      let isAvailable = true;
      cartData.forEach((cartItem) => {
        const product = productData.find(
          (product) => product.id === cartItem.id
        );
        if (product && product.stock < cartItem.amount) {
          isAvailable = false;
        }
      });
      setAvaliableBuy(isAvailable);
    };

    calculateSubtotalDiscount();
    checkStockAvailability();
    setEmptyCartError("");
  }, [cartData, coupons, productData, selectedCoupon, userCoupons]);

  const handleFinish = () => {
    if (!subtotal) {
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

    if (!avaliableBuy) {
      setEmptyCartError("Alguns produtos não possuem estoque suficiente!");
      return;
    }

    const updatedProductData = productData.map((product) => {
      const cartItem = cartData.find((item) => item.id === product.id);
      if (cartItem) {
        return {
          ...product,
          stock: product.stock - cartItem.amount,
          sold: product.sold + cartItem.amount,
        };
      }
      return product;
    });

    setProductData(updatedProductData);
    setCartData([{ price: 0, id: -1, amount: 0 }]); // Clear cart after purchase
    setShowSuccessModal(true);

    const selectedCouponUserData = userCoupons.find(
      (coupon) => coupon.couponNumber === selectedCoupon
    );

    if (selectedCouponUserData) {
      selectedCouponUserData.used = true;
    }

    setSelectedCoupon("");
    setSelectedCard("");
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setSelectedCoupon(""); // Clear coupon after confirmation
    setSelectedCard(""); // Clear card after confirmation
    setCartData([]); // Clear cart after confirmation
    navigate("/"); // Navigate after closing the modal
  };

  const handleAuthRedirect = () => {
    navigate("/auth");
  };
  const handleHomeRedirect = () => {
    navigate("/");
  };
  const handleRecipeRedirect = () => {
    navigate("/recipe");
  };

  return (
    <div className="cart-page-container">
      {cartData && cartData.length > 0 ? (
        <>
          <div className="cart-page-left-container">
            {" "}
            <div className="left-header">
              <h1>Itens do Carrinho</h1>
            </div>
            <div className="cart-items-list">
              {cartData.map((cartItem) => {
                const product = productData.find(
                  (product) => product.id === cartItem.id
                );

                if (cartItem.id === -1) {
                  if (!showSuccessModal) {
                    setCartData((prevCartData) =>
                      prevCartData.filter((item) => item.id !== -1)
                    ); // Remove the dummy item used to clear the cart
                  }
                  return null; // Skip the dummy item used to clear the cart
                }
                
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
                      setCartData((prev) =>
                        prev.filter((item) => item.id !== id)
                      );
                    }}
                  />
                );
              })}
            </div>{" "}
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
                userCoupons={userCoupons}
                coupons={coupons}
                onCouponSelect={setSelectedCoupon}
              />
            ) : null}
            {userCoupons && paymentMethods ? (
              <div className="cart-page-button">
                <button onClick={handleFinish}>Finalizar Compra</button>
                {emptyCartError && (
                  <p className="empty-cart-error">{emptyCartError}</p>
                )}
              </div>
            ) : (
              <div className="cart-page-button">
                <button onClick={handleAuthRedirect}>
                  Entre ou Cadastre-se para Finalizar a Compra
                </button>
              </div>
            )}
          </div>
          {showSuccessModal && (
            <CustomAlert
              messageHeader="Compra finalizada com sucesso!"
              onConfirm={handleCloseSuccessModal}
              onConfirmMessage={"Fechar"}
            />
          )}
        </>
      ) : (
        <>
          <div className="no-items-cart-container">
            <h1>Seu carrinho está vazio</h1>
            <p>Adicione itens ao carrinho para continuar.</p>
            <button onClick={handleHomeRedirect}>Voltar às Compras</button>
            <button onClick={handleRecipeRedirect}>Ver Receitas</button>
          </div>
        </>
      )}{" "}
    </div>
  );
}

export default CartPage;
