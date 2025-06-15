import React from 'react';
import { useState } from 'react';
import { useEffect, useMemo } from "react";
import SearchComponent from '../search/SearchComponent';
import { useLocation } from "react-router-dom";
import "./Sections.css";

import { GetProducts } from '../../services/Fetchs';

const Sections = ({products}) => {

    const location = useLocation();
    const [activeSection, setActiveSection] = useState(location.state?.sectionData);
    const[inputData, setInputData] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [productsVector, setProductsVector] = useState([]);

    const ITEMS_PER_PAGE = 16;

    const sections = [
        {id: "todos", name: "Todos os produtos"},
        {id: "alimentos", name: "Alimentos Básicos"},
        {id: "padaria", name: "Padaria"},
        {id: "hortifrutis", name: "Hortifruti"},
        {id: "bebidas", name: "Bebidas"},
        {id: "doces", name: "Doces"},
        {id: "laticinios", name: "Frios e Laticínios"},
        {id: "congelados", name: "Congelados"},
        {id: "outros", name: "Outros"},
    ]

    const setSearchTerm = (e) => {
        let value = e.target.value;
        setInputData(value);
        setCurrentPage(1);
    }
    
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await GetProducts();
                setProductsVector(data);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };
        
        fetchUsers();
    }, []);
    
    
    // todos,alimentos,padaria,hortifrutis,bebidas,doces,laticinios,congelados,outros
    const sections_products = activeSection === "todos"
    ? productsVector 
    : productsVector.filter(product => product.category === activeSection);
    
    
    const filteredItems = useMemo(() => {
        let filteredData = sections_products.filter( item => {
            const match = item.name.toLowerCase().includes(inputData.toLowerCase());
            return match;

        })

        return filteredData;

    }, [inputData, sections_products]);





    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = filteredItems.slice(startIndex, endIndex);

    const handleSectionChange = (sectionId) => {
        setActiveSection(sectionId);
        setCurrentPage(1); // Reset para primeira página ao trocar seção
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handlePreviousPage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
    }

    return (
        <>
            <div className="section-container">

                <div>
                    <h1>Busca de produtos</h1>
                </div>

                <div className="search-input">

                    <input type="text"
                    placeholder='Digite o nome do produto a ser buscado'
                    onChange={setSearchTerm}
                    value={inputData}
                    />
                </div>


                <div className="choose-section">
                    {sections.map(section => (
                        <button 
                            key={section.id}
                            onClick={() => handleSectionChange(section.id)}
                            className={activeSection === section.id ? "button-active" : "button-inactive"}
                        >
                            {section.name}
                        </button>
                    ))
                    }
                </div>

                {/* Informações da paginação */}
                {currentItems.length > 0 && (
                <div className="pagination-info">
                    <p>
                    Mostrando {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} de {filteredItems.length} produtos
                    </p>
                </div>
                )}

                <div className="products-section-container">
                    {
                        currentItems.length > 0 ? (
                            currentItems.map(item => (
                                <SearchComponent product={item}/>
                            ))
                        ):(
                            <p>Nenhum item encontrado!</p>
                        )
                    }

                </div>

                {totalPages > 1 && (
                <div className="pagination-controls">
                    <button 
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="pagination-btn"
                    >
                    Anterior
                    </button>
                    
                    <div className="pagination-numbers">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? "pagination-btn active" : "pagination-btn"}
                        >
                        {index + 1}
                        </button>
                    ))}
                    </div>
                    
                    <button 
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                    >
                    Próximo
                    </button>
                </div>
                )}
            </div>
        </>
    )
}

export default Sections;