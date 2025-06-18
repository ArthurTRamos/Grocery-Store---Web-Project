import React from 'react';
import "./SearchComponent.css";
import { Link } from "react-router-dom";

const SearchComponent = ({product}) => {

    console.log(product._id); // Logs the product ID for debugging

    return(
        <>
            {/* Link to the product detail page, passing product data via state */}
            <Link to="/product" state={{productData: product}} className="product-link">
                
                {/* Main product container */}
                <div className="product-container">

                    {/* Product name */}
                    <p>{product.name}</p>

                    {/* Product image */}
                    <div className="imagem">
                        <img src={product.image} alt={product.name} />
                    </div>

                    {/* Additional product info (e.g., price) */}
                    <div className="productInfo">
                        <p>R${product.price.toFixed(2)}</p>
                    </div>

                </div>
            </Link>
        </>
    )
}

export default SearchComponent;
