import {useState, useEffect } from "react"
import { ChefHat } from "lucide-react"
import "./RecipePage.css"
import RecipeDisplay from "./RecipeDisplay"

import localAPIKey from  "../data/key.json"

function RecipePage({products}) {
  const [occasion, setOccasion] = useState("")
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [productsNameQuantity, setProductsNameQuantity] = useState("")
  const [apiKey, setApiKey] = useState("")

  const options = ["Almoço de Domingo", "Jantar Romântico", "Aniversário", "Comida Rápida", "Lanche da Tarde"]

  // Obtém os nomes e quantiades dos produtos disponíveis
  useEffect(() => {
    const productsNameQuantity = products.map((product) => {
      return product.stock > 0 ? product.name + " " + product.stock + "\n" : null
    })
    setProductsNameQuantity(productsNameQuantity)
  }, [products])

  useEffect(() => {
    const getKeyAPI = async () => {
      const data = await Promise.resolve(localAPIKey)
      setApiKey(data[0]["key"])
    }

    getKeyAPI()
  }, [])


  const parseRecipeFromText = (text) => {
    try {
      const titleMatch = text.match(/(?:título|title|receita):\s*(.+?)(?:\n|$)/i)
      const ingredientsMatch = text.match(/ingredientes?:\s*([\s\S]*?)(?=modo de preparo|instruções|preparo)/i)
      const instructionsMatch = text.match(/(?:modo de preparo|instruções|preparo):\s*([\s\S]*?)$/i)

      // Extrair título
      const title = titleMatch ? titleMatch[1].trim() : "Receita Especial"

      // Extrair ingredientes
      let ingredients = []
      if (ingredientsMatch) {
        ingredients = ingredientsMatch[1]
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item && !item.match(/^(ingredientes?|modo|preparo)/i))
          .map((item) => item.replace(/^[-•*]\s*/, ""))
      }

      // Extrair instruções
      let instructions = []
      if (instructionsMatch) {
        instructions = instructionsMatch[1]
          .split("\n")
          .map((item) => item.trim())
          .filter((item) => item && !item.match(/^(modo|preparo|instruções)/i))
          .map((item, index) => item.replace(/^\d+\.\s*/, ""))
      }

      console.log({title, ingredients, instructions})

      return {
        title,
        description: `Uma deliciosa receita para ${occasion.toLowerCase()}.`,
        ingredients: ingredients.length > 0 ? ingredients : ["Ingredientes não especificados"],
        instructions: instructions.length > 0 ? instructions : ["Instruções não especificadas"],
      }
    } catch (error) {
      console.error("Erro ao parsear receita:", error)
      return null
    }
  }


  // Função para gerar receita baseada na ocasião
  const generateRecipe = async () => {
    if (!occasion) {
      setError("Por favor, selecione uma ocasião para a receita.")
      return
    }

    setLoading(true)
    setError("")
    setRecipe(null)

    try {
      console.log(apiKey)
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
              content: `Crie uma receita detalhada para ${occasion}. Considere os seguintes ingredientes disponíveis: 
              ${productsNameQuantity}. Gere uma única receita
            
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

            Não insera mais nada após a última instrução de preparação.
            
            Seja específico com quantidades e tempos. Não use texto em negrito (não use o símbolo *) (somente coloque texto tradicional).
            
            Gere sempre receitas diferentes das já geradas
            `,
            },
          ],
        }),
      })

      const data = await response.json()

      if (data.choices && data.choices[0] && data.choices[0].message) {
        const recipeText = data.choices[0].message.content
        console.log("Resposta da API:", recipeText)

        const parsedRecipe = parseRecipeFromText(recipeText)

        if (parsedRecipe) {
          setRecipe(parsedRecipe)
        } else {
          setError("Não foi possível processar a receita. Tente novamente.")
        }
      } else {
        setError("Resposta inválida da API.")
      }
    } catch (error) {
      console.error("Erro na API:", error)
      setError("Erro ao buscar receita. Verifique sua conexão e tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="headerRecipe">
          <h1 className="main-title">Receitas Personalizadas</h1>
          <p className="main-subtitle">Diga-nos a ocasião e nossa IA irá sugerir a receita perfeita para você</p>
        </div>

        <div className="form-container">
          <div className="form-content">
            <h3 className="form-title">Para qual ocasião você precisa de uma receita?</h3>

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

            {error && <p className="error-message">{error}</p>}

            <button
              onClick={generateRecipe}
              className={`generate-button ${loading || !occasion ? "disabled" : ""}`}
              disabled={loading || !occasion}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Preparando sua receita...
                </>
              ) : (
                <>
                  <ChefHat className="button-icon" />
                  Encontrar Receita
                </>
              )}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Nossa IA está preparando a receita perfeita para você...</p>
          </div>
        ) : recipe ? (
          <RecipeDisplay recipe={recipe} />
        ) : (
          <div className="no-recipe-container">
            <p className="no-recipe-message">Selecione uma ocasião e clique em 'Encontrar Receita' para começar!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default RecipePage