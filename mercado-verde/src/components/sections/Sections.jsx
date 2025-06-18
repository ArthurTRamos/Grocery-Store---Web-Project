import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useLocation } from "react-router-dom";

import "./Sections.css";

import SearchComponent from '../search/SearchComponent';

import { GetProducts } from '../../services/Fetchs';

const Sections = () => {

    // Access router state (passed via Link navigation)
    const location = useLocation();

    // Currently active section (e.g. "alimentos", "padaria", etc.)
    const [activeSection, setActiveSection] = useState(location.state?.sectionData);

    // Text input for search
    const [inputData, setInputData] = useState("");

    // Current page number for pagination
    const [currentPage, setCurrentPage] = useState(1);

    // All fetched products
    const [productsVector, setProductsVector] = useState([]);

    const ITEMS_PER_PAGE = 16;

    // Section list to be displayed as filter buttons
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

    // Handle search input change
    const setSearchTerm = (e) => {
        let value = e.target.value;
        setInputData(value);
        setCurrentPage(1); // Reset to first page when search changes
        console.log(currentItems[1]); // Debug log
    }
    
    // Fetch products from backend when component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await GetProducts();
                setProductsVector(data);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };
        
        fetchProducts();
    }, []);
    
    // Filter products by selected section
    const sections_products = activeSection === "todos"
        ? productsVector 
        : productsVector.filter(product => product.category === activeSection);
    
    // Filter products by search term
    const filteredItems = useMemo(() => {
        let filteredData = sections_products.filter(item => {
            const match = item.name.toLowerCase().includes(inputData.toLowerCase());
            return match;
        });

        return filteredData;
    }, [inputData, sections_products]);

    // Pagination logic
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = filteredItems.slice(startIndex, endIndex);

    // Handle section button click
    const handleSectionChange = (sectionId) => {
        setActiveSection(sectionId);
        setCurrentPage(1); // Reset to first page when section changes
    }

    // Handle page number click
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    // Navigate to previous page
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    // Navigate to next page
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <>
            <div className="section-container">

                {/* Title */}
                <div>
                    <h1>Busca de produtos</h1>
                </div>

                {/* Search input field */}
                <div className="search-input">
                    <input 
                        type="text"
                        placeholder='Digite o nome do produto a ser buscado'
                        onChange={setSearchTerm}
                        value={inputData}
                    />
                </div>

                {/* Section buttons */}
                <div className="choose-section">
                    {sections.map(section => (
                        <button 
                            key={section.id}
                            onClick={() => handleSectionChange(section.id)}
                            className={activeSection === section.id ? "button-active" : "button-inactive"}
                        >
                            {section.name}
                        </button>
                    ))}
                </div>

                {/* Pagination info display */}
                {currentItems.length > 0 && (
                    <div className="pagination-info">
                        <p>
                            Mostrando {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} de {filteredItems.length} produtos
                        </p>
                    </div>
                )}

                {/* Products grid or empty message */}
                <div className="products-section-container">
                    {
                        currentItems.length > 0 ? (
                            currentItems.map(item => (
                                <SearchComponent product={item}/>
                            ))
                        ) : (
                            <p>Nenhum item encontrado!</p>
                        )
                    }
                </div>

                {/* Pagination controls */}
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
