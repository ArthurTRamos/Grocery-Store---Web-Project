"use client"

import { useState } from "react"
import { ChefHat } from "lucide-react"
import "./RecipePage.css"

// Banco de dados simulado de receitas
const recipeDatabase = {
  "jantar romântico": {
    title: "Risoto de Champagne com Camarões",
    description: "Um risoto cremoso e elegante, perfeito para impressionar em um jantar romântico.",
    ingredients: [
      "1 1/2 xícaras de arroz arbóreo",
      "1 cebola média picada",
      "2 dentes de alho picados",
      "1/2 xícara de champagne ou vinho branco seco",
      "4 xícaras de caldo de legumes quente",
      "400g de camarões limpos",
      "2 colheres de sopa de manteiga",
      "1/2 xícara de queijo parmesão ralado",
      "Sal e pimenta a gosto",
      "Salsinha picada para decorar",
    ],
    instructions: [
      "Em uma panela média, aqueça uma colher de manteiga e refogue a cebola até ficar transparente.",
      "Adicione o alho e refogue por mais 30 segundos.",
      "Acrescente o arroz e mexa por 1-2 minutos até ficar levemente translúcido.",
      "Despeje o champagne e mexa até quase todo o líquido evaporar.",
      "Adicione o caldo de legumes, uma concha por vez, mexendo constantemente e esperando o líquido ser absorvido antes de adicionar mais.",
      "Em uma frigideira separada, salteie os camarões com o restante da manteiga até ficarem rosados. Tempere com sal e pimenta.",
      "Quando o arroz estiver al dente (cerca de 18-20 minutos), adicione os camarões, o queijo parmesão e misture delicadamente.",
      "Ajuste o sal e a pimenta, e sirva imediatamente decorado com salsinha picada.",
    ],
    prepTime: 30,
    cookTime: 25,
    servings: 2,
    difficulty: "Média",
  },
  "almoço de domingo": {
    title: "Costela Assada com Batatas",
    description:
      "Uma costela suculenta e macia que desmancha no garfo, acompanhada de batatas douradas. Perfeita para reunir a família no domingo.",
    ingredients: [
      "1,5kg de costela bovina",
      "1kg de batatas médias",
      "2 cebolas grandes cortadas em quartos",
      "6 dentes de alho amassados",
      "3 colheres de sopa de azeite",
      "2 colheres de sopa de mostarda dijon",
      "2 colheres de sopa de mel",
      "1 colher de sopa de alecrim fresco picado",
      "1 colher de sopa de tomilho fresco",
      "Sal e pimenta a gosto",
    ],
    instructions: [
      "Preaqueça o forno a 160°C.",
      "Em uma tigela pequena, misture o azeite, mostarda, mel, alecrim, tomilho, sal e pimenta para fazer a marinada.",
      "Coloque a costela em uma assadeira grande e esfregue a marinada por toda a carne.",
      "Cubra com papel alumínio e asse por 2 horas e 30 minutos.",
      "Enquanto isso, corte as batatas em pedaços médios e tempere com azeite, sal e pimenta.",
      "Após o tempo inicial, adicione as batatas e cebolas ao redor da costela, aumente a temperatura para 200°C e asse por mais 45 minutos sem o papel alumínio, até que as batatas estejam douradas e a carne esteja macia.",
      "Deixe a carne descansar por 10 minutos antes de servir.",
      "Sirva a costela fatiada com as batatas e cebolas assadas, regando com o molho da assadeira.",
    ],
    prepTime: 20,
    cookTime: 195,
    servings: 6,
    difficulty: "Fácil",
  },
  "comida rápida": {
    title: "Wrap de Frango com Abacate",
    description: "Um wrap saudável e rápido de preparar, perfeito para um almoço ou jantar em dias corridos.",
    ingredients: [
      "2 tortilhas de trigo integral grandes",
      "200g de peito de frango cozido e desfiado",
      "1 abacate maduro",
      "1 tomate médio fatiado",
      "1/4 de cebola roxa fatiada finamente",
      "Folhas de alface a gosto",
      "2 colheres de sopa de iogurte natural",
      "1 colher de chá de suco de limão",
      "Sal e pimenta a gosto",
    ],
    instructions: [
      "Em uma tigela pequena, amasse o abacate com o suco de limão, sal e pimenta.",
      "Espalhe o purê de abacate sobre as tortilhas.",
      "Distribua o frango desfiado, as fatias de tomate, a cebola roxa e as folhas de alface sobre o purê de abacate.",
      "Finalize com uma colher de iogurte natural sobre cada wrap.",
      "Dobre as laterais da tortilha para dentro e enrole firmemente.",
      "Corte ao meio e sirva imediatamente ou embrulhe em papel alumínio para levar como lanche.",
    ],
    prepTime: 10,
    cookTime: 0,
    servings: 2,
    difficulty: "Fácil",
  },
  "lanche da tarde": {
    title: "Muffins de Banana e Aveia",
    description: "Muffins saudáveis e deliciosos, perfeitos para um lanche da tarde energético.",
    ingredients: [
      "2 bananas maduras amassadas",
      "2 ovos",
      "1/4 xícara de mel ou xarope de maple",
      "1/4 xícara de óleo de coco derretido",
      "1 colher de chá de extrato de baunilha",
      "1 1/2 xícara de farinha de aveia (aveia em flocos processada)",
      "1 colher de chá de fermento em pó",
      "1/2 colher de chá de bicarbonato de sódio",
      "1 colher de chá de canela em pó",
      "1/4 colher de chá de sal",
      "1/2 xícara de nozes picadas (opcional)",
    ],
    instructions: [
      "Preaqueça o forno a 180°C e prepare uma forma para 12 muffins com forminhas de papel.",
      "Em uma tigela grande, misture as bananas amassadas, ovos, mel, óleo de coco e extrato de baunilha.",
      "Em outra tigela, combine a farinha de aveia, fermento, bicarbonato, canela e sal.",
      "Adicione os ingredientes secos aos úmidos e misture até incorporar. Não misture demais.",
      "Se estiver usando, adicione as nozes picadas e misture levemente.",
      "Distribua a massa nas forminhas, enchendo cerca de 3/4 de cada uma.",
      "Asse por 18-20 minutos, ou até que um palito inserido no centro saia limpo.",
      "Deixe esfriar na forma por 5 minutos antes de transferir para uma grade para esfriar completamente.",
    ],
    prepTime: 15,
    cookTime: 20,
    servings: 12,
    difficulty: "Fácil",
  },
  "festa infantil": {
    title: "Mini Pizzas Divertidas",
    description: "Mini pizzas coloridas e divertidas que as crianças vão adorar fazer e comer.",
    ingredients: [
      "1 pacote de massa pronta para mini pizzas (ou pães sírios pequenos)",
      "1 xícara de molho de tomate",
      "2 xícaras de queijo mussarela ralado",
      "Coberturas variadas: tomate cereja, milho, ervilha, pedaços de presunto, pepperoni",
      "Azeitonas, pimentões coloridos e outros vegetais para fazer 'carinhas' nas pizzas",
    ],
    instructions: [
      "Preaqueça o forno a 200°C.",
      "Disponha as bases de mini pizza em uma assadeira.",
      "Espalhe uma colher de molho de tomate sobre cada base.",
      "Cubra com queijo mussarela ralado.",
      "Deixe as crianças criarem 'carinhas' ou desenhos nas pizzas usando as coberturas coloridas.",
      "Asse por 8-10 minutos, ou até que o queijo esteja derretido e as bordas douradas.",
      "Deixe esfriar um pouco antes de servir para as crianças.",
    ],
    prepTime: 15,
    cookTime: 10,
    servings: 8,
    difficulty: "Fácil",
  },
}

export default function RecipePage() {
  const [occasion, setOccasion] = useState("")
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Função para gerar receita baseada na ocasião
  const generateRecipe = () => {
    if (!occasion) {
      setError("Por favor, selecione uma ocasião para a receita.")
      return
    }

    setLoading(true)
    setError("")

    // Simulando um delay de API
    setTimeout(() => {
      if (recipeDatabase[occasion]) {
        setRecipe(recipeDatabase[occasion])
        setError("")
      } else {
        setRecipe(null)
        setError("Não encontramos uma receita para essa ocasião. Por favor, selecione outra opção.")
      }

      setLoading(false)
    }, 1500)
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="header">
          <h1 className="main-title">Receitas Personalizadas</h1>
          <p className="main-subtitle">Diga-nos a ocasião e nossa IA irá sugerir a receita perfeita para você</p>
        </div>

        <div className="form-container">
          <div className="form-content">
            <h3 className="form-title">Para qual ocasião você precisa de uma receita?</h3>

            <div className="occasions-grid">
              {Object.keys(recipeDatabase).map((key) => (
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
      </div>
    </div>
  )
}