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
                    <p>R${product.price}</p>
                    <div className="insert_remove_in_cart">
                        <ChangeQtdCart/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchComponent;