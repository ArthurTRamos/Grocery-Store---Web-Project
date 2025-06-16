import React, { useState } from 'react';
import "./input_image.css";

const Input_image = ({handleSave, field, initialValue}) => {
    const [imageUrl, setImageUrl] = useState(initialValue || '');
    const [previewImage, setPreviewImage] = useState(initialValue || null);

    const handleUrlChange = (e) => {
        const url = e.target.value;
        setImageUrl(url);
        
        if (url.trim() !== '') {
            setPreviewImage(url);
        } else {
            setPreviewImage(null);
        }
    };

    const handleSaveImage = () => {
        if (imageUrl.trim() !== '') {
            handleSave(field, imageUrl.trim());
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSaveImage();
        }
    };

    return (
        <div className="input-image-container">
            <label htmlFor="imageUrl">URL da Imagem:</label>
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
                        onError={() => setPreviewImage(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default Input_image;