import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import child components for UI composition
import CardSelection from "./CardSelection";
import CartItem from "./CartItem";
import CouponSelection from "./CouponSelection";
import CustomAlert from "../utility_elements/CustomAlert";

// Import API functions
import {
  GetProducts,
  GetCoupons,
  GetUserById,
  UpdateProduct,
  UpdateUser,
} from "../../services/Fetchs";

import "./CartPage.css";

/**
 * The main component for the shopping cart page. It handles displaying cart items,
 * calculating totals, applying coupons, selecting payment, and finalizing the purchase.
 */
function CartPage({ cartData, setCartData, loggedUser }) {
  // State for data fetched from APIs
  const [productData, setProductData] = useState([]); // Master list of all products
  const [coupons, setCoupons] = useState([]); // Master list of all coupons
  const [userCoupons, setUserCoupons] = useState([]); // Coupons specific to the logged-in user
  const [paymentMethods, setPaymentMethods] = useState([]); // Payment methods for the user

  // State for calculated values
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  // State for user selections in the UI
  const [selectedCard, setSelectedCard] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState("");

  // State for form errors and validation
  const [cardError, setCardError] = useState("");
  const [emptyCartError, setEmptyCartError] = useState("");
  const [avaliableBuy, setAvaliableBuy] = useState(true); // Tracks if all items are in stock

  // State for UI modals/alerts
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // State for API call status
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiError, setApiError] = useState(false);

  const navigate = useNavigate();

  // Effect to fetch all necessary data when the component loads or the user changes.
  useEffect(() => {
    console.log("Cart Data:", cartData);
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Fetch all required data concurrently for better performance.
        const productPromise = GetProducts();
        const couponPromise = GetCoupons();
        const userPromise = loggedUser
          ? GetUserById(loggedUser) // Only fetch user data if a user is logged in.
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

  // Effect to recalculate totals and check stock whenever the cart or selections change.
  useEffect(() => {
    // Calculates the subtotal and applies any selected coupon discount.
    const calculateSubtotalDiscount = () => {
      // Calculate subtotal from cart items and product data.
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

      // Calculate discount based on the selected coupon.
      let discountValue = 0;
      if (userCoupons) {
        // Find the selected coupon in the user's list of coupons.
        const selectedCouponUserData = userCoupons.find(
          (coupon) => coupon.couponNumber === selectedCoupon
        );

        // Check if the user's coupon exists and has not been used.
        if (selectedCouponUserData && !selectedCouponUserData.used) {
          // Find the coupon's full details from the master list.
          const couponData = coupons.find(
            (coupon) => coupon.couponNumber === selectedCoupon
          );
          if (couponData) {
            // Apply discount based on type (fixed money or percentage).
            discountValue =
              couponData.type === "money"
                ? -Math.min(couponData.discount, subtotalValue)
                : (-subtotalValue * couponData.discount) / 100;
          }
        }
      }

      setDiscount(discountValue);
      // Calculate final total, ensuring it doesn't go below zero.
      setTotal(Math.max(subtotalValue + discountValue, 0));
    };

    // Checks if the amount of each item in the cart exceeds the available stock.
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
    setEmptyCartError(""); // Clear any previous empty cart error.
  }, [cartData, coupons, productData, selectedCoupon, userCoupons]);

  // Handles the entire checkout process when the "Finalizar Compra" button is clicked.
  const handleFinish = async () => {
    // --- Validation Checks ---
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

    // Re-fetch product data to get the latest stock information before finalizing.
    try {
      const products = await GetProducts();
      setProductData(products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // Perform a final stock availability check with the latest data.
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

    // --- API Updates ---
    try {
      // 1. Update stock for each product in the cart.
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

      // 2. Mark the coupon as used in the user's data.
      const userData = await GetUserById(loggedUser);
      const updatedUserData = { ...userData };

      if (selectedCoupon) {
        const couponIndex = updatedUserData.coupons.findIndex(
          (c) => c.couponNumber === selectedCoupon
        );
        if (couponIndex !== -1) {
          updatedUserData.coupons[couponIndex].used = true;
        }
      }

      await UpdateUser(loggedUser, updatedUserData);

      // --- Post-Purchase UI Update ---
      // Use a dummy item to reset the cart. This prevents the "empty cart" UI
      // from flashing before the success modal appears and navigation occurs.
      setCartData([{ id: -1, amount: 0 }]);
      setShowSuccessModal(true); // Show success message.
      setSelectedCoupon(""); // Reset selections.
      setSelectedCard("");
    } catch (error) {
      console.error("Error finishing purchase:", error);
      setApiError(true);
    }
  };

  // Closes the success modal and navigates the user away.
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setCartData([]); // Fully clear the cart data.
    navigate("/"); // Navigate after closing the modal.
  };

  // --- Simple Navigation Handlers ---
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
      {/* Ternary to show either the cart content or the "empty cart" message. */}
      {cartData && cartData.length > 0 ? (
        <>
          {/* Conditionally rendered modals for success or API errors. */}
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
          {/* Display loading/error messages during the initial data fetch. */}
          {isLoading && <p className="loading-message">Carregando Perfil...</p>}
          {error && <p className="error-message">{error}</p>}
          {/* Render main content only after data is successfully loaded. */}
          {!isLoading && !error && (
            <>
              {/* Left Column: Cart Items */}
              <div className="cart-page-left-container">
                {" "}
                <div className="left-header">
                  <h1>Itens do Carrinho</h1>
                </div>
                <div className="cart-items-list">
                  {cartData.map((cartItem) => {
                    // This check prevents the dummy item from being rendered.
                    if (cartItem.id === -1) {
                      return null;
                    }

                    // Find full product details for each item in the cart.
                    const product = productData.find(
                      (product) => product["_id"] === cartItem.id
                    );

                    return (
                      <CartItem
                        key={cartItem.id}
                        cartItemData={{
                          ...product,
                          id: cartItem.id,
                          amount: cartItem.amount,
                        }}
                        // Handlers passed to the child to modify the cart state in this parent component.
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
              {/* Right Column: Summary and Actions */}
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
                {/* Show payment/coupon options only if a user is logged in. */}
                {loggedUser ? (
                  <>
                    <CardSelection
                      paymentMethods={paymentMethods}
                      onCardSelect={(card) => {
                        setSelectedCard(card);
                        setCardError(""); // Clear error when card is selected.
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

                {/* Show either the "Finalizar" button or a prompt to log in. */}
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
        // View for when the cart is empty.
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