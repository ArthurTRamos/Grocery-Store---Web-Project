import React from 'react';
import "./CategorySelection.css";

const CategorySelection = ({value, onChangeCategory}) => {

    return (

        <>
            <div className="category-container">
                <label htmlFor="categoria">Categoria</label>
                <select name="category" id="categoria" value={value} onChange={onChangeCategory} className='select_sek_category' required>
                    <option value="">Selecione...</option>
                    <option value="alimentos">Alimentos Básicos</option>
                    <option value="padaria">Padaria</option>
                    <option value="hortifrutis">Hortifruti</option>
                    <option value="bebidas">Bebidas</option>
                    <option value="doces">Doces</option>
                    <option value="laticinios">Frios e Laticínios</option>
                    <option value="congelados">Congelados</option>
                    <option value="outros">Outros</option>
                </select>
            </div>
        </>
    )
}

export default CategorySelection;