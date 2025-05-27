import React, {useState} from 'react';
import "./RecipeDisplay.css";

function RecipeDisplay({recipe}) {
    return(
        <>
            <div className='displayRecipe-box'>
                <h2 className='titleRecipe'>{recipe.title}</h2>
                <p className='descriptionRecipe'>{recipe.description}</p>
                
                <div className='ingredientesRecipe-div'>
                    <h3 className='ingredientsTitle'>Ingredientes</h3>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) =>
                            <li>
                                {ingredient}
                            </li>
                        )}
                    </ul>
                </div>

                <div className='instructionsRecipe'>
                    <ol>
                        {recipe.instructions.map((instruction, index) =>
                        <li>
                            {instruction}
                        </li>
                        )}
                    </ol>
                </div>
            </div>
        </>
    )
}

export default RecipeDisplay;