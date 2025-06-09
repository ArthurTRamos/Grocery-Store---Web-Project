import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./EditUserCoupons.css";
import CouponInfo from "./EditCouponInfo";

import CustomAlert from "../../../utility_elements/CustomAlert";

function EditUserCoupons({
  coupons,
  userToBeEdited,
  setUserToBeEdited,
  setUsers,
}) {
  const [newCouponNumber, setNewCouponNumber] = useState("");
  const [couponAlreadyAdded, setCouponAlreadyAdded] = useState(false);
  const [couponNotFound, setCouponNotFound] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const randomUser = location.state?.userToBeEdited;
    if (
      randomUser &&
      (!userToBeEdited || userToBeEdited.id !== randomUser.id)
    ) {
      setUserToBeEdited(randomUser);
    }
  }, [location.state?.userToBeEdited, setUserToBeEdited, userToBeEdited]);

  const handleNewCouponAdd = () => {
    if (!newCouponNumber.trim()) {
      alert("Digite um código de cupom válido!");
      return;
    }

    if (!userToBeEdited) {
      alert("Erro: dados do usuário não encontrados!");
      return;
    }

    const userCoupons = userToBeEdited.coupons || [];

    const couponExists = userCoupons.find(
      (coupon) => coupon.couponNumber === newCouponNumber
    );

    if (couponExists) {
      // alert("Cupom já adicionado!");
      setCouponAlreadyAdded(true);
      return;
    }

    const couponData = coupons?.find(
      (coupon) => coupon.couponNumber === newCouponNumber
    );

    if (!couponData) {
      // alert("Cupom inválido!");
      setCouponNotFound(true);
      return;
    }

    const newUserCoupon = {
      couponNumber: newCouponNumber,
      used: false,
    };

    const updatedUser = {
      ...userToBeEdited,
      coupons: [...userCoupons, newUserCoupon],
    };

    setUserToBeEdited(updatedUser);

    if (setUsers) {
      setUsers((prevUsers) => {
        return prevUsers.map((user) => {
          return user.id === updatedUser.id ? updatedUser : user;
        });
      });
    }

    setNewCouponNumber("");
  };

  if (!userToBeEdited) {
    return <div>Carregando...</div>;
  }

  const userCoupons = userToBeEdited.coupons || [];
  const availableCoupons = userCoupons.filter((userCoupon) => !userCoupon.used);
  const usedCoupons = userCoupons.filter((userCoupon) => userCoupon.used);

  return (
    <div className="user-coupons-container">
      {couponAlreadyAdded && (
        <CustomAlert
          alertMessage="Cupom já adicionado!"
          onConfirm={() => setCouponAlreadyAdded(false)}
          onConfirmMessage="OK"
        />
      )}
      {couponNotFound && (
        <CustomAlert
          alertMessage="Cupom inválido!"
          onConfirm={() => setCouponNotFound(false)}
          onConfirmMessage="OK"
        />
      )}
      <div className="user-coupons-header">
        <h1>Cupons de {userToBeEdited.name}</h1>
      </div>

      <div className="user-coupons-add">
        <h2>Adicionar Novo Cupom</h2>
        <div className="user-coupons-add-actions">
          <input
            type="text"
            placeholder="Digite o código do cupom"
            value={newCouponNumber}
            onChange={(e) => setNewCouponNumber(e.target.value.toUpperCase())}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleNewCouponAdd();
              }
            }}
          />
          <button onClick={handleNewCouponAdd}>Adicionar</button>
        </div>
      </div>

      <div className="user-coupons-list">
        <h2>Cupons Disponíveis ({availableCoupons.length})</h2>
        <div className="non-used-coupons-exhibition-container">
          {availableCoupons.length === 0 ? (
            <p>Nenhum cupom disponível.</p>
          ) : (
            availableCoupons.map((userCoupon) => {
              const couponData = coupons?.find(
                (coupon) => coupon.couponNumber === userCoupon.couponNumber
              );
              return couponData ? (
                <CouponInfo
                  key={couponData.couponNumber}
                  couponData={couponData}
                  used={userCoupon.used}
                />
              ) : null;
            })
          )}
        </div>

        <h2>Cupons Usados ({usedCoupons.length})</h2>
        <div className="used-coupons-exhibition-container">
          {usedCoupons.length === 0 ? (
            <p>Nenhum cupom usado.</p>
          ) : (
            usedCoupons.map((userCoupon) => {
              const couponData = coupons?.find(
                (coupon) => coupon.couponNumber === userCoupon.couponNumber
              );
              return couponData ? (
                <CouponInfo
                  key={couponData.couponNumber}
                  couponData={couponData}
                  used={userCoupon.used}
                />
              ) : null;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default EditUserCoupons;
