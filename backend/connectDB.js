import mongoose from "mongoose";

let uri = "mongodb+srv://henriquedrago:Yvb5N5vI3FyMMSOo@mercado-verde.9jc6rf2.mongodb.net/?retryWrites=true&w=majority&appName=Mercado-Verde";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('✅ Conectado ao MongoDB Atlas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar no MongoDB Atlas:', error.message);
  }
};

export default connectDB;
