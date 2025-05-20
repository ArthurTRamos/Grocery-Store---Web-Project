import React from 'react';
import "./botao.css"

const Botao = ({texto}) => {

    return (

        <>
            <div className="btn-container">
                <button type="submit" className="btn">
                    <span>{texto}</span>
                </button>
            </div>
        </>
    )
}

export default Botao;