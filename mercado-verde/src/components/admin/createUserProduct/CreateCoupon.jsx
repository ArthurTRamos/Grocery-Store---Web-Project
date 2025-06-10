import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./CreateCoupon.css";
import SideBar from "../SideBar";
import CustomAlert from "../../utility_elements/CustomAlert";

const AdmCreateCoupon = ({ coupons, setCoupons }) => {
  const [couponAdded, setCouponAdded] = useState(false);
  const [couponMissField, setCouponMissField] = useState(false);
  const [couponInvalidField, setCouponInvalidField] = useState(false);

  const [inputCouponData, setInputCouponData] = useState({
    id: -1,
    couponNumber: "",
    discount: 0,
    type: "percent", // Valor padrão
  });

  const handleInputDataChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;
    if (name === "couponNumber") {
      formattedValue = value.toUpperCase().trim().replace(" ", "");
    }

    if (name === "discount") {
      formattedValue = value.replace(/[^0-9.]/g, "").replace(",", ".");
    }

    setInputCouponData((prev) => ({
      ...prev,
      [name]: formattedValue,
    }));
  };

  const handleCouponCreation = (e) => {
    e.preventDefault();

    const newCoupon = {
      ...inputCouponData,
      id: uuidv4(),
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
    console.log({ newCoupon });

    // Limpar formulário
    setInputCouponData({
      id: -1,
      couponNumber: "",
      discount: 0,
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
              alertMessage="O valor do desconto não pode ser zero ou negativo, nem maior que cem caso seja porcentagem."
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
                    onChange={handleInputDataChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="discount">Valor do Desconto</label>
                  <input
                    type="text"
                    inputMode="decimal" // Melhora a experiência em teclados de celular
                    className="input_sek"
                    id="discount"
                    name="discount"
                    placeholder="Digite o valor do desconto"
                    value={inputCouponData.discount}
                    onChange={handleInputDataChange}
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
                    onChange={handleInputDataChange}
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
