import { useMemo } from "react";
import { useState } from "react";
import React from 'react';

import SearchComponent from "./SearchComponent";


const UserSearch = ({productsData}) => {

    const[inputData, setInputData] = useState("");

    const setSearchTerm = (e) => {
        let value = e.target.value;
        setInputData(value);
    }

    const filteredItems = useMemo(() => {
        let filteredData = productsData.filter( item => {
            const match = item.name.toLowerCase().includes(inputData.toLowerCase());
            return match;

        })

        return filteredData;

    }, [inputData, productsData]);


    return (

        <>

            <div className="search-container">

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

                <div className="product-search-container">
                    {filteredItems.length > 0 ? (
                        filteredItems.map( item => (
                            <SearchComponent product={item}/>
                        ))

                    ):(
                        <p>Nenhum item encontrado!</p>
                    )}


                </div>

            </div>

        </>
    )

}

export default UserSearch;