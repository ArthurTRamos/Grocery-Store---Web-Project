import React from 'react';
import "./CategorySelection.css"; // Import CSS styles for the component

/**
 * CategorySelection Component
 * Props:
 * - value: current selected category value (string)
 * - onChangeCategory: callback to handle category selection change (function)
 */
const CategorySelection = ({ value, onChangeCategory }) => {

    return (
        <>
            {/* Container for the category dropdown */}
            <div className="category-container">
                {/* Label linked to the select dropdown */}
                <label htmlFor="categoria">Categoria</label>

                {/* Select dropdown for category choices */}
                <select 
                    name="category" 
                    id="categoria" 
                    value={value} 
                    onChange={onChangeCategory} 
                    className='select_sek_category' 
                    required
                >
                    {/* Default option prompting selection */}
                    <option value="">Selecione...</option>

                    {/* Category options */}
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
