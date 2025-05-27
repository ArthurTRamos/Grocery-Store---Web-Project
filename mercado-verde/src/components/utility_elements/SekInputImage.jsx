import React from 'react';

const SekInputImage = ({onChangeInputImage}) => {

    const handleImagemChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
            onChangeInputImage("image", URL.createObjectURL(file)); // chama a função de salvar com o arquivo
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
                name='image'
                onChange={handleImagemChange}
            />
        </>
    )
}

export default SekInputImage;