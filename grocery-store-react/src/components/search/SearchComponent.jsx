import React from 'react';
import ChangeQtdCart from './ChangeQtdCart';
import "./SearchComponent.css";

const SearchComponent = ({product}) => {

    return(
        <>
            <div className="product-container">

                <p>{product.name}</p>

                <div className="imagem">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="productInfo">
                    <p>R${product.price.toFixed(2)}</p>
                </div>
            </div>
        </>
    )
}

export default SearchComponent;