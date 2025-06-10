import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./CreateCoupon.css";
import SideBar from "../SideBar";
import CustomAlert from "../../utility_elements/CustomAlert";
import { useIMask } from "react-imask";

const AdmCreateCoupon = ({ coupons, setCoupons }) => {
  const [couponAdded, setCouponAdded] = useState(false);
  const [couponMissField, setCouponMissField] = useState(false);
  const [couponInvalidField, setCouponInvalidField] = useState(false);

  const [inputCouponData, setInputCouponData] = useState({
    id: -1,
    couponNumber: "",
    discount: "", // Use an empty string for the initial unmasked value
    type: "percent",
  });

  // UNIFIED CHANGE HANDLER
  const handleInputChange = (name, value) => {
    const formattedValue =
      name === "couponNumber"
        ? value.toUpperCase().trim().replace(" ", "")
        : value;

    setInputCouponData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const maskOptions = {
    mask: Number,
    scale: 2,
    signed: false,
    thousandsSeparator: ",",
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ".",
    mapToRadix: [","],
    min: 0,
  };

  // Use the new handler in the iMask hook
  const { ref } = useIMask(maskOptions, {
    onAccept: (unmaskedValue) => handleInputChange("discount", unmaskedValue),
  });

  const handleCouponCreation = (e) => {
    e.preventDefault();

    console.log("Input Coupon Data:", inputCouponData);

    const newCoupon = {
      ...inputCouponData,
      id: uuidv4(),
      // The conversion is still correct and necessary
      discount: Number(inputCouponData.discount) || 0,
    };

    if (newCoupon.couponNumber === "" || newCoupon.type === "") {
      setCouponMissField(true);
      return;
    }

    if (newCoupon.discount <= 0) {
      setCouponInvalidField(true);
      return;
    }

    if (newCoupon.discount > 100 && newCoupon.type === "percent") {
      setCouponInvalidField(true);
      return;
    }

    const updatedCoupons = [...(coupons || []), newCoupon];
    setCoupons(updatedCoupons);

    setCouponAdded(true);

    setInputCouponData({
      id: -1,
      couponNumber: "",
      discount: "", // Reset to empty string
      type: "percent",
    });
  };

  return (
    <>
      <div className="admin-container">
        <SideBar />
        <div className="interior-container">
          {couponAdded && (
            <CustomAlert
              alertMessage="Cupom adicionado com sucesso!"
              onConfirm={() => setCouponAdded(false)}
              onConfirmMessage={"OK"}
            />
          )}

          {couponMissField && (
            <CustomAlert
              messageHeader="Cupom com campos faltantes!"
              alertMessage="Todos os campos precisam estar preenchidos!"
              onConfirm={() => setCouponMissField(false)}
              onConfirmMessage={"Voltar!"}
            />
          )}

          {couponInvalidField && (
            <CustomAlert
              messageHeader="Cupom com campo inválido!"
              alertMessage="O valor do desconto deve ser um número positivo e, se for porcentagem, não pode ser maior que 100%!"
              onConfirm={() => setCouponInvalidField(false)}
              onConfirmMessage={"Voltar!"}
            />
          )}
          <form id="couponForm">
            <div className="form-header">
              <h2>Cadastro de Cupom</h2>
              <p>Qual será o cupom de desconto adicionado dessa vez?</p>
            </div>

            <div className="form-section">
              <h3>Dados do Cupom</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="couponNumber">Código do Cupom</label>
                  <input
                    type="text"
                    className="input_sek"
                    id="couponNumber"
                    name="couponNumber"
                    placeholder="Digite o código do cupom (ex: NATAL20)"
                    value={inputCouponData.couponNumber}
                    // Use the new handler
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="discount">Valor do Desconto</label>
                  {/* THIS IS THE FULLY CORRECTED INPUT */}
                  <input
                    type="text"
                    inputMode="decimal"
                    className="input_sek"
                    id="discount"
                    name="discount"
                    placeholder="Digite o valor do desconto"
                    ref={ref}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Tipo de Desconto</label>
                  <select
                    id="type"
                    name="type"
                    className="input_sek"
                    value={inputCouponData.type}
                    // Use the new handler
                    onChange={(e) =>
                      handleInputChange(e.target.name, e.target.value)
                    }
                  >
                    <option value="percent">Porcentagem (%)</option>
                    <option value="money">Valor Fixo (R$)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="btn-container">
              <button
                type="submit"
                className="btn"
                onClick={handleCouponCreation}
              >
                <span>Criar Cupom</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdmCreateCoupon;
