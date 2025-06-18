import React, { useState } from 'react';
import "./input_image.css";

/**
 * Componente Input_image
 * Props:
 * - handleSave: função de callback para salvar a URL da imagem
 * - field: identificador do campo (string)
 * - initialValue: valor inicial da URL (string)
 */
const Input_image = ({ handleSave, field, initialValue }) => {
    // Estado da URL digitada e da pré-visualização
    const [imageUrl, setImageUrl] = useState(initialValue || '');
    const [previewImage, setPreviewImage] = useState(initialValue || null);

    // Atualiza a URL da imagem e define o preview
    const handleUrlChange = (e) => {
        const url = e.target.value;
        setImageUrl(url);
        
        if (url.trim() !== '') {
            setPreviewImage(url);
        } else {
            setPreviewImage(null);
        }
    };

    // Salva a URL se estiver preenchida
    const handleSaveImage = () => {
        if (imageUrl.trim() !== '') {
            handleSave(field, imageUrl.trim());
        }
    };

    // Permite salvar pressionando Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveImage();
        }
    };

    return (
        <div className="input-image-container">
            {/* Rótulo do campo */}
            <label htmlFor="imageUrl">URL da Imagem:</label>

            {/* Campo de entrada e botão de salvar */}
            <div className="input-group">
                <input
                    className='input_imagem_url'
                    type="url"
                    id="imageUrl"
                    placeholder="https://exemplo.com/imagem.jpg"
                    value={imageUrl}
                    onChange={handleUrlChange}
                    onKeyPress={handleKeyPress}
                />
                <button 
                    type="button" 
                    onClick={handleSaveImage}
                    className="save-image-btn"
                >
                    Salvar
                </button>
            </div>

            {/* Pré-visualização da imagem */}
            {previewImage && (
                <div className="image-preview">
                    <p>Preview:</p>
                    <img 
                        src={previewImage} 
                        alt="Preview da imagem" 
                        style={{
                            maxWidth: '200px',
                            maxHeight: '200px',
                            objectFit: 'contain',
                            border: '1px solid #ddd',
                            borderRadius: '4px'
                        }}
                        onError={() => setPreviewImage(null)} // Remove preview se a imagem não carregar
                    />
                </div>
            )}
        </div>
    );
};

export default Input_image;
