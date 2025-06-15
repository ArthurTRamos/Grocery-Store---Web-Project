import React from 'react';
import "./SearchComponent.css";
import { Link } from "react-router-dom";


const SearchComponent = ({product}) => {

    console.log(product._id);

    return(
        <>
            <Link to="/product" state={{ID: product._id}} className="product-link">
                <div className="product-container">

                    <p>{product.name}</p>

                    <div className="imagem">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="productInfo">
                        <p>R${product.price.toFixed(2)}</p>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default SearchComponent;