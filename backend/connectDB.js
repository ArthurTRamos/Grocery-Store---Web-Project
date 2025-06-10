import mongoose from "mongoose";

let uri = "mongodb+srv://Riquey:Riquey@cluster0.g42lsub.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('✅ Conectado ao MongoDB Atlas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao conectar no MongoDB Atlas:', error.message);
  }
};

export default connectDB;
