import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./EditUserCoupons.css";

import CouponInfo from "./EditCouponInfo";

import CustomAlert from "../../../utility_elements/CustomAlert";

import { GetUserById, UpdateUser, GetCoupons } from "../../../../services/Fetchs";

function EditUserCoupons() {
  const [newCouponNumber, setNewCouponNumber] = useState("");
  const [couponAlreadyAdded, setCouponAlreadyAdded] = useState(false);
  const [couponNotFound, setCouponNotFound] = useState(false);

  const [userEdit, setUserEdit] = useState("");
  const [coupons, setCoupons] = useState([]);

  const { id } = useParams();
  

  useEffect(() => {
    if (!id) {
      console.warn("ID não encontrado. Redirecionando...");
      return;
    }
    const fetchUserInfos = async() => {
      try {

        console.log(id);

        const userInfos = await GetUserById(id);
        setUserEdit(userInfos);

      }catch(error){
        console.log(error);
      }
    }
    const fetchCouponsInfos = async() => {
      try {

        const couponsInfos = await GetCoupons();
        setCoupons(couponsInfos);

      }catch(error){
        console.log(error);
      }
    }
    fetchUserInfos();
    fetchCouponsInfos();
  }, [id]);




  const handleNewCouponAdd = async () => {
    if (!newCouponNumber.trim()) {
      alert("Digite um código de cupom válido!");
      return;
    }

    if (!userEdit) {
      alert("Erro: dados do usuário não encontrados!");
      return;
    }

    const userCoupons = userEdit.coupons || [];

    const couponExists = userCoupons.find(
      (coupon) => coupon.couponNumber === newCouponNumber
    );

    if (couponExists) {
      setCouponAlreadyAdded(true);
      return;
    }

    const couponData = coupons?.find(
      (coupon) => coupon.couponNumber === newCouponNumber
    );

    if (!couponData) {
      setCouponNotFound(true);
      return;
    }

    const newUserCoupon = {
      couponNumber: newCouponNumber,
      used: false,
    };

    const updatedUser = {
      ...userEdit,
      coupons: [...userCoupons, newUserCoupon],
    };

    setUserEdit(updatedUser);

    try{
      await UpdateUser(id, updatedUser);
      console.log("atualizou");
    }catch(error) {
      console.log(error);
    }

    setNewCouponNumber("");
  };

  if (!userEdit) {
    return <div>Carregando...</div>;
  }

  const userCoupons = userEdit.coupons || [];
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
        <h1>Cupons de {userEdit.name}</h1>
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
