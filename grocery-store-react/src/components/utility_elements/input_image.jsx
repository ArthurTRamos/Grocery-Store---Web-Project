
import "./input_image.css";

const Input_image = ({handleSave, field, initialValue}) => {

    const[imagem, setImagem] = useState(null)
    const[previewImage, setPreviewImage] = useState(null)

    const handleImagemChange = (e) => {
        const file = e.target.files[0];
    
        if (file) {
            setImagem(file);

            handleSave(field, URL.createObjectURL(file)); // chama a função de salvar com o arquivo
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
                value={value}
                name='image'
                onChange={onChangeImage}
            />
        </>
    )
}

export default Input_image;