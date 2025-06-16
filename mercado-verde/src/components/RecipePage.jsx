// Recipe Generation and Visualization Page

import {useState, useEffect } from "react"
import { ChefHat } from "lucide-react"

import "./RecipePage.css"
import RecipeDisplay from "./RecipeDisplay"

import localAPIKey from  "../data/key.json"
import {GetProducts} from "../services/Fetchs.js"

// Generates a recipe based on the selected occasion and available products
function RecipePage() {
  const [products, setProducts] = useState([]) // Available products from inventory
  const [occasion, setOccasion] = useState("") // Selected occasion for the recipe
  const [recipe, setRecipe] = useState(null) // Generated recipe object
  const [loading, setLoading] = useState(false) // Loading state for API call
  const [error, setError] = useState("") // Error message state
  const [productsNameQuantity, setProductsNameQuantity] = useState("") // Formatted product names and quantities
  const [apiKey, setApiKey] = useState("") // API key for OpenRouter

  // Available occasion options for recipe generation
  const options = ["Almoço de Domingo", "Jantar Romântico", "Aniversário", "Comida Rápida", "Lanche da Tarde"]

  // Fetch products from the API
  const fetchProducts = async() => {
    const data = await GetProducts()
    setProducts(data)
  }

  // Format product names and quantities for API consumption
  // Creates a string with available products and their stock quantities
  useEffect(() => {
    const productsNameQuantity = products.map((product) => {
      return product.stock > 0 ? product.name + " " + product.stock + "\n" : null
    })
    setProductsNameQuantity(productsNameQuantity)
  }, [products])

  // Load API key locally and fetch products on component mount
  useEffect(() => {
    const getKeyAPI = async () => {
      const data = await Promise.resolve(localAPIKey)
      setApiKey(data[0]["key"])
    }

    fetchProducts()

    getKeyAPI()
  }, [])

  // Parse recipe text from AI response into structured object
  // Extracts title, ingredients, and instructions using regex patterns
  const parseRecipeFromText = (text) => {
    try {
      // Extract recipe title using regex
      const titleMatch = text.match(/(?:título|title|receita):\s*(.+?)(?:\n|$)/i)
      // Extract ingredients section
      const ingredientsMatch = text.match(/ingredientes?:\s*([\s\S]*?)(?=modo de preparo|instruções|preparo)/i)
      // Extract cooking instructions section
      const instructionsMatch = text.match(/(?:modo de preparo|instruções|preparo):\s*([\s\S]*?)$/i)

      // Extract and clean title
      const title = titleMatch ? titleMatch[1].trim() : "Receita Especial"

      // Extract and format ingredients list
      let ingredients = []
      if (ingredientsMatch) {
        ingredients = ingredientsMatch[1]
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item && !item.match(/^(ingredientes?|modo|preparo)/i))
          .map((item) => item.replace(/^[-•*]\s*/, "")) // Remove bullet points
      }

      // Extract and format instructions list
      let instructions = []
      if (instructionsMatch) {
        instructions = instructionsMatch[1]
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item && !item.match(/^(modo|preparo|instruções)/i))
          .map((item) => item.replace(/^\d+\.\s*/, "")) // Remove step numbers
      }

      console.log({title, ingredients, instructions})

      // Return structured recipe object
      return {
        title,
        description: `Uma deliciosa receita para ${occasion.toLowerCase()}.`, // A delicious recipe for [occasion]
        ingredients: ingredients.length > 0 ? ingredients : ["Ingredientes não especificados"], // Ingredients not specified
        instructions: instructions.length > 0 ? instructions : ["Instruções não especificadas"], // Instructions not specified
      }
    } catch (error) {
      console.error("Erro ao parsear receita:", error) // Error parsing recipe
      return null
    }
  }

  // Generate recipe based on selected occasion using OpenRouter AI API
  const generateRecipe = async () => {
    // Validate that an occasion is selected
    if (!occasion) {
      setError("Por favor, selecione uma ocasião para a receita.") // Please select an occasion for the recipe
      return
    }

    // Set loading state and clear previous errors/recipes
    setLoading(true)
    setError("")
    setRecipe(null)

    try {
      console.log(apiKey)
      // Make API call to OpenRouter with DeepSeek model
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ` + apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat:free",
          messages: [
            {
              role: "user",
              content: `Crie uma única receita detalhada para ${occasion}. Considere os seguintes ingredientes disponíveis e suas quantidades: 
              ${productsNameQuantity}.
            
            Formato da resposta:
            Título: [nome da receita]
            
            Ingredientes:
            [ingrediente 1]
            [ingrediente 2]
            [etc...]
            
            Modo de Preparo:
            [passo 1]
            [passo 2]
            [etc...]

            Não insira nada após a última instrução de preparação. No título da receita, dê um nome criativo e que se relacione com os alimentos a serem utilizados
            
            Seja específico com quantidades e tempos. Não use texto em negrito (não use o símbolo *). Não é necessário incluir todos os ingredientes disponíveis no mercado. Siga o modelo de resposta estritamente.            
            `,
            },
          ],
        }),
      })

      const data = await response.json()

      // Process API response
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const recipeText = data.choices[0].message.content
        console.log("Resposta da API:", recipeText) // API Response

        console.log(recipeText)

        // Parse the recipe text into structured format
        const parsedRecipe = parseRecipeFromText(recipeText)

        if (parsedRecipe) {
          setRecipe(parsedRecipe)
        } else {
          setError("Não foi possível processar a receita. Tente novamente.") // Could not process the recipe. Try again.
        }
      } else {
        setError("Resposta inválida da API.") // Invalid API response
      }
    } catch (error) {
      console.error("Erro na API:", error) // API Error
      setError("Erro ao buscar receita. Verifique sua conexão e tente novamente.") // Error fetching recipe. Check your connection and try again.
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">
        {/* Page header section */}
        <div className="headerRecipe">
          <h1 className="main-title">Receitas Personalizadas</h1> {/* Personalized Recipes */}
          <p className="main-subtitle">Diga-nos a ocasião e nossa IA irá sugerir a receita perfeita para você</p> {/* Tell us the occasion and our AI will suggest the perfect recipe for you */}
        </div>

        {/* Recipe generation form */}
        <div className="form-container">
          <div className="form-content">
            <h3 className="form-title">Para qual ocasião você precisa de uma receita?</h3> {/* For which occasion do you need a recipe? */}

            {/* Occasion selection buttons */}
            <div className="occasions-grid">
              {options.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setOccasion(key)}
                  className={`occasion-button ${occasion === key ? "selected" : ""}`}
                >
                  <div className="occasion-text">{key}</div>
                </button>
              ))}
            </div>

            {/* Error message display */}
            {error && <p className="error-message">{error}</p>}

            {/* Recipe generation button */}
            <button
              onClick={generateRecipe}
              className={`generate-button ${loading || !occasion ? "disabled" : ""}`}
              disabled={loading || !occasion}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Preparando sua receita... {/* Preparing your recipe... */}
                </>
              ) : (
                <>
                  <ChefHat className="button-icon" />
                  Encontrar Receita {/* Find Recipe */}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Conditional rendering based on application state */}
        {loading ? (
          // Loading state display
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Nossa IA está preparando a receita perfeita para você...</p> {/* Our AI is preparing the perfect recipe for you... */}
          </div>
        ) : recipe ? (
          // Display generated recipe
          <RecipeDisplay recipe={recipe} />
        ) : (
          // Initial state message
          <div className="no-recipe-container">
            <p className="no-recipe-message">Selecione uma ocasião e clique em 'Encontrar Receita' para começar!</p> {/* Select an occasion and click 'Find Recipe' to start! */}
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipePage;