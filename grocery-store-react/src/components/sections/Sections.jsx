import React from 'react';
import { useState } from 'react';
import SearchComponent from '../search/SearchComponent';
import "./Sections.css"

const Sections = ({products}) => {

    const [activeSection, setActiveSection] = useState("todos");

    const sections = [
        {id: "todos", name: "Todos os produtos"},
        {id: "padaria", name: "Padaria"},
        {id: "hortifruti", name: "Hortifruti"},
        {id: "bebidas", name: "Bebidas"},
        {id: "doce", name: "Doces"},
        {id: "fri_lat", name: "Frios e Laticínios"},
        {id: "congelados", name: "Congelados"},
    ]

    const filtered_products = activeSection === "todos"
    ? products 
    : products.filter(product => product.type === activeSection);

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