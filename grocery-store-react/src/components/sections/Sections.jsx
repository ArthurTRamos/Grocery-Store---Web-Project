import React from 'react';
import { useState } from 'react';
import SearchComponent from '../search/SearchComponent';
import { useLocation } from "react-router-dom";
import "./Sections.css";

const Sections = ({products}) => {

    const location = useLocation();
    const [activeSection, setActiveSection] = useState(location.state?.sectionData);

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
    // todos,alimentos,padaria,hortifrutis,bebidas,doces,laticinios,congelados,outros

    const filtered_products = activeSection === "todos"
    ? products 
    : products.filter(product => product.category === activeSection);

    return (
        <>
            <div className="section-container">
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
                        filtered_products.length > 0 ? (
                            filtered_products.map(item => (
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