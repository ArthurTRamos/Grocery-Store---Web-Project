import React, { useState, useEffect, useMemo } from "react";
import "./CreateCoupon.css"; // Styles are now correctly imported
import SideBar from "../SideBar";
import CustomAlert from "../../utility_elements/CustomAlert";
import { useIMask } from "react-imask";
import { imaskOptions } from "../../../services/Formatters.js";
import { CreateCoupon, GetCoupons, DeleteCoupon } from "../../../services/Fetchs.js";

import { FaRegTrashAlt } from "react-icons/fa";

const AdmCreateCoupon = () => {
  // === COMPONENT STATE ===
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // === FORM STATE ===
  const [couponAdded, setCouponAdded] = useState(false);
  const [couponMissField, setCouponMissField] = useState(false);
  const [couponInvalidField, setCouponInvalidField] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [inputCouponData, setInputCouponData] = useState({
    couponNumber: "",
    discount: "",
    type: "percent",
  });

  // === SEARCH AND PAGINATION STATE ===
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 20;


  // === DATA FETCHING ===
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setIsLoading(true);
        const data = await GetCoupons();
        setCoupons(data || []);
        setError(null);
      } catch (err) {
        setError("Failed to fetch coupons.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  // === FORM HANDLING ===
  const handleInputChange = (name, value) => {
    const formattedValue =
      name === "couponNumber"
        ? value.toUpperCase().trim().replace(/\s+/g, "")
        : value;
    setInputCouponData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const { ref, setValue } = useIMask(imaskOptions.price, {
    onAccept: (unmaskedValue) => handleInputChange("discount", unmaskedValue),
  });

  const handleCouponCreation = async (e) => {
    e.preventDefault();
    const newCoupon = {
      ...inputCouponData,
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

    try {
      const createdCoupon = await CreateCoupon([newCoupon]);
      if (createdCoupon && createdCoupon.length > 0) {
        setCoupons(prevCoupons => [...prevCoupons, createdCoupon[0]]);
        setCouponAdded(true);
        setInputCouponData({ couponNumber: "", discount: "", type: "percent" });
        setValue("");
      } else {
        throw new Error("Failed to create coupon or received an empty response.");
      }
    } catch (error) {
      console.error("API Error creating coupon:", error);
      setApiError(true);
    }
  };

  const handleDelete = async (id) => {
    try {
      await DeleteCoupon(id);
      setCoupons(coupons.filter((c) => c["_id"] !== id));
    } catch (err) {
      console.error(`Failed to delete coupon with id ${id}:`, err);
      setApiError(true);
    }
  };
  
  // === FILTERING AND PAGINATION LOGIC ===
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const filteredCoupons = useMemo(() => {
    if (!searchTerm) {
      return coupons;
    }
    return coupons.filter(coupon =>
      coupon.couponNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [coupons, searchTerm]);

  const totalPages = Math.ceil(filteredCoupons.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCoupons = filteredCoupons.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  return (
    <>
      <div className="admin-container">
        <SideBar />
        <div className="interior-container">
          {/* --- ALERTS --- */}
          {couponAdded && <CustomAlert alertMessage="Cupom adicionado com sucesso!" onConfirm={() => setCouponAdded(false)} onConfirmMessage={"OK"} />}
          {couponMissField && <CustomAlert messageHeader="Cupom com campos faltantes!" alertMessage="Todos os campos precisam estar preenchidos!" onConfirm={() => setCouponMissField(false)} onConfirmMessage={"Voltar!"} error={true} />}
          {couponInvalidField && <CustomAlert messageHeader="Cupom com campo inválido!" alertMessage="O valor do desconto deve ser um número positivo e, se for porcentagem, não pode ser maior que 100%!" onConfirm={() => setCouponInvalidField(false)} onConfirmMessage={"Voltar!"} error={true} />}
          {apiError && <CustomAlert messageHeader="Erro de Comunicação" alertMessage="Ocorreu um erro na comunicação com o servidor. Tente novamente mais tarde." onConfirm={() => setApiError(false)} onConfirmMessage={"Ok"} error={true} />}

          {/* --- CREATE FORM --- */}
          <form id="couponForm" onSubmit={handleCouponCreation}>
            <div className="form-header">
              <h2>Cadastro de Cupom</h2>
              <p>Qual será o cupom de desconto adicionado dessa vez?</p>
            </div>
            <div className="form-section">
              <h3>Dados do Cupom</h3>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="couponNumber">Código do Cupom</label>
                  <input className="input_sek" type="text" id="couponNumber" name="couponNumber" placeholder="Ex: NATAL20" value={inputCouponData.couponNumber} onChange={(e) => handleInputChange(e.target.name, e.target.value)} required />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="discount">Valor do Desconto</label>
                  <input className="input_sek" type="text" inputMode="decimal" id="discount" name="discount" placeholder="Digite o valor" ref={ref} required />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Tipo de Desconto</label>
                  <select className="input_sek" id="type" name="type" value={inputCouponData.type} onChange={(e) => handleInputChange(e.target.name, e.target.value)}>
                    <option value="percent">Porcentagem (%)</option>
                    <option value="money">Valor Fixo (R$)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="btn-container">
              <button type="submit" className="btn"><span>Criar Cupom</span></button>
            </div>
          </form>

          {/* --- COUPONS TABLE --- */}
          <div className="manage-coupons-container">
             <h2>Cupons Existentes</h2>
            <div className="search-input">
              <input type="text" placeholder="Digite o código do cupom para buscar" onChange={handleSearchChange} value={searchTerm} />
            </div>

            {isLoading && <p className="loading-message">Carregando cupons...</p>}
            {error && <p className="error-message">{error}</p>}
            
            {!isLoading && !error && (
              <>
                <div className="pagination-info">
                  <p>
                    Mostrando {currentCoupons.length > 0 ? startIndex + 1 : 0}-
                    {Math.min(endIndex, filteredCoupons.length)} de {filteredCoupons.length} cupons
                  </p>
                </div>

                <div className="div-table-container">
                  <table className="table-container">
                    <thead>
                      <tr>
                        <th>Código</th>
                        <th>Desconto</th>
                        <th>Tipo</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCoupons.length > 0 ? (
                        currentCoupons.map((coupon) => (
                          <tr key={coupon["_id"]}>
                            <td>{coupon.couponNumber}</td>
                            <td>{coupon.type === 'percent' ? `${coupon.discount}%` : `R$ ${coupon.discount}`}</td>
                            <td>{coupon.type === 'percent' ? 'Porcentagem' : 'Valor Fixo'}</td>
                            <td>
                              <button onClick={() => handleDelete(coupon["_id"])} className="btn-delete">
                                <FaRegTrashAlt />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="loading-message">Nenhum cupom encontrado.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {totalPages > 1 && (
                  <div className="pagination-controls">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1} className="pagination-btn">
                      Anterior
                    </button>
                    <div className="pagination-numbers">
                      {Array.from({ length: totalPages }, (_, index) => (
                        <button key={index + 1} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? "pagination-btn active" : "pagination-btn"}>
                          {index + 1}
                        </button>
                      ))}
                    </div>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages} className="pagination-btn">
                      Próximo
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdmCreateCoupon;
