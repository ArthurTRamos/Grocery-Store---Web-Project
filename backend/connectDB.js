// Import the Mongoose library, which is used to interact with the MongoDB database.
import mongoose from "mongoose";

// -- Database Credentials and Connection String --

// Hardcoded username for the MongoDB Atlas database.
const userName = "henriquedrago";
// Hardcoded password for the MongoDB Atlas database.
const password = "Yvb5N5vI3FyMMSOo";
// The MongoDB connection string (URI) is constructed using the credentials.
let uri = `mongodb+srv://${userName}:${password}@mercado-verde.9jc6rf2.mongodb.net/?retryWrites=true&w=majority&appName=Mercado-Verde`;

/**
 * An asynchronous function that connects to the MongoDB database using Mongoose.
 * It includes error handling for the connection attempt.
 */
const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB Atlas cluster using the constructed URI.
    // The 'await' keyword pauses the function until the connection is established or fails.
    await mongoose.connect(uri);
    // If the connection is successful, log a success message to the console.
    console.log('✅ Conectado ao MongoDB Atlas com sucesso!');
  } catch (error) {
    // If an error occurs during the connection attempt, this block will be executed.
    // Log a detailed error message to the console.
    console.error('❌ Erro ao conectar no MongoDB Atlas:', error.message);
  }
};

// Export the connectDB function as the default export of this module,
// making it available to be imported and used in other files (like the main server file).
export default connectDB;