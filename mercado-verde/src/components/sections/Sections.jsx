import React from 'react';
import { useState } from 'react';
import { useMemo } from "react";
import SearchComponent from '../search/SearchComponent';
import { useLocation } from "react-router-dom";
import "./Sections.css";

const Sections = ({products}) => {

    const location = useLocation();
    const [activeSection, setActiveSection] = useState(location.state?.sectionData);
    const[inputData, setInputData] = useState("");

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
    }
    // todos,alimentos,padaria,hortifrutis,bebidas,doces,laticinios,congelados,outros

    const sections_products = activeSection === "todos"
    ? products 
    : products.filter(product => product.category === activeSection);

    const filteredItems = useMemo(() => {
        let filteredData = sections_products.filter( item => {
            const match = item.name.toLowerCase().includes(inputData.toLowerCase());
            return match;

        })

        return filteredData;

    }, [inputData, sections_products]);

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
                        <button key={section.id} onClick={() => setActiveSection(section.id)}>
                            {section.name}
                        </button>
                    ))
                    }
                </div>

                <div className="products-section-container">
                    {
                        filteredItems.length > 0 ? (
                            filteredItems.map(item => (
                                <SearchComponent product={item}/>
                            ))
                        ):(
                            <p>Nenhum item encontrado!</p>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default Sections;