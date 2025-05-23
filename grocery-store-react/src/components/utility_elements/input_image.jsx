
import "./input_image.css";

const Input_image = ({value, onChangeImage}) => {

    return(

        <>
            <label htmlFor="imagem">Escolha uma imagem:</label>
            <input
                className='input_imagem_sek'
                type="file"
                id="imagem"
                accept="image/*"
                value={value}
                name='image'
                onChange={onChangeImage}
            />
        </>
    )
}

export default Input_image;