import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CardSelection from "./CardSelection";
import CartItem from "./CartItem";
import CouponSelection from "./CouponSelection";
import CustomAlert from "../utility_elements/CustomAlert";

import {
  GetProducts,
  GetCoupons,
  GetUserById,
  UpdateProduct,
  UpdateUser,
} from "../../services/Fetchs";

import "./CartPage.css";

function CartPage({ cartData, setCartData, loggedUser }) {
  const [productData, setProductData] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [userCoupons, setUserCoupons] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
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
  //api
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiError, setApiError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch all required data concurrently for better performance
        const productPromise = GetProducts();
        const couponPromise = GetCoupons();
        const userPromise = loggedUser
          ? GetUserById(loggedUser)
          : Promise.resolve(null);

        const [products, allCoupons, userData] = await Promise.all([
          productPromise,
          couponPromise,
          userPromise,
        ]);

        setProductData(products);
        setCoupons(allCoupons);

        if (userData) {
          setUserCoupons(userData.coupons);
          setPaymentMethods(userData.paymentMethods);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(
          "Falha ao carregar os dados do carrinho. Tente novamente mais tarde."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [loggedUser]);

  useEffect(() => {
    const calculateSubtotalDiscount = () => {
      // Calculate subtotal
      let subtotalValue = 0;
      cartData.forEach((cartItem) => {
        const product = productData.find(
          (product) => product["_id"] === cartItem.id
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
          (product) => product["_id"] === cartItem.id
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

  const handleFinish = async () => {
    if (!subtotal) {
      setEmptyCartError(
        "Por favor, adicione ao menos um item antes de finalizar a compra!"
      );
      return;
    }
    setEmptyCartError(""); // Clear error when items are present

    if (!selectedCard) {
      setCardError(
        `Por favor, ${
          paymentMethods.length > 0 ? "selecione" : "adicione"
        } um cartão antes de finalizar a compra!`
      );
      return;
    }
    setCardError(""); // Clear error when card is selected

    try {
      const products = await GetProducts();
      setProductData(products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    const checkStockAvailability = () => {
      let isAvailable = true;
      cartData.forEach((cartItem) => {
        const product = productData.find(
          (product) => product["_id"] === cartItem.id
        );
        if (product && product.stock < cartItem.amount) {
          isAvailable = false;
        }
      });
      setAvaliableBuy(isAvailable);
    };

    checkStockAvailability();

    if (!avaliableBuy) {
      setEmptyCartError("Alguns produtos não possuem estoque suficiente!");
      return;
    }

    try {
      // Update product stock and sold count
      for (const cartItem of cartData) {
        const product = productData.find((p) => p["_id"] === cartItem.id);
        if (product) {
          const updatedProduct = {
            stock: product.stock - cartItem.amount,
            sold: product.sold + cartItem.amount,
          };
          await UpdateProduct(product["_id"], updatedProduct);
        }
      }

      const userData = await GetUserById(loggedUser);
      const updatedUserData = { ...userData };

      // Mark coupon as used
      if (selectedCoupon) {
        const couponIndex = updatedUserData.coupons.findIndex(
          (c) => c.couponNumber === selectedCoupon
        );
        if (couponIndex !== -1) {
          updatedUserData.coupons[couponIndex].used = true;
        }
      }

      await UpdateUser(loggedUser, updatedUserData);

      // Use a dummy item to reset the cart
      // This is to avoid the re-rendering of the UI with an empty cart
      setCartData([{ id: -1, amount: 0 }]);
      setShowSuccessModal(true);
      setSelectedCoupon("");
      setSelectedCard("");
    } catch (error) {
      console.error("Error finishing purchase:", error);
      setApiError(true);
    }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setCartData([]);
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
          {showSuccessModal && (
            <CustomAlert
              messageHeader="Compra finalizada com sucesso!"
              onConfirm={handleCloseSuccessModal}
              onConfirmMessage={"Fechar"}
            />
          )}
          {apiError && (
            <CustomAlert
              messageHeader="Erro de Comunicação"
              alertMessage="Ocorreu um erro na comunicação com o servidor. Tente novamente mais tarde."
              onConfirm={() => setApiError(false)}
              onConfirmMessage={"Ok"}
              error={true}
            />
          )}
          {isLoading && <p className="loading-message">Carregando Perfil...</p>}
          {error && <p className="error-message">{error}</p>}
          {!isLoading && !error && (
            <>
              <div className="cart-page-left-container">
                {" "}
                <div className="left-header">
                  <h1>Itens do Carrinho</h1>
                </div>
                <div className="cart-items-list">
                  {cartData.map((cartItem) => {
                    if (cartItem.id === -1) {
                      return null;
                    }

                    const product = productData.find(
                      (product) => product["_id"] === cartItem.id
                    );

                    return (
                      <CartItem
                        key={cartItem.id}
                        cartItemData={{
                          ...product,
                          amount: cartItem.amount,
                        }}
                        changeAmount={(id, newAmount) => {
                          setCartData((prev) =>
                            prev.map((item) =>
                              item.id === id
                                ? { ...item, amount: newAmount }
                                : item
                            )
                          );
                        }}
                        removeItem={(id) => {
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
                {loggedUser ? (
                  <>
                    <CardSelection
                      paymentMethods={paymentMethods}
                      onCardSelect={(card) => {
                        setSelectedCard(card);
                        setCardError(""); // Clear error when card is selected
                      }}
                      cardError={cardError}
                    />

                    <CouponSelection
                      userCoupons={userCoupons}
                      coupons={coupons}
                      onCouponSelect={setSelectedCoupon}
                    />
                  </>
                ) : null}

                {loggedUser ? (
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
              </div>{" "}
            </>
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
