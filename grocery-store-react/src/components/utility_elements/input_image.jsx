import React, {useState} from 'react';
import "./input_image.css";

const Input_image = () => {

    const[imagem, setImagem] = useState(null)
    const[previewImage, setPreviewImage] = useState(null)

    const handleImagemChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
          setImagem(file);
          setPreviewImage(URL.createObjectURL(file)); // cria uma URL para mostrar a imagem
        }
      };

    return(

        <>
            <label htmlFor="imagem">Escolha uma imagem:</label>
            <input
                className='input_imagem_sek'
                type="file"
                id="imagem"
                accept="image/*"
                onChange={handleImagemChange}
            />

            {previewImage && (
                <div style={{ marginTop: '10px' }}>
                <p>Pré-visualização:</p>
                <img
                    src={previewImage}
                    alt="Prévia"
                    style={{ maxWidth: '500px', borderRadius: '8px' }}
                />
                </div>
            )}
        </>
    )
}

export default Input_image;