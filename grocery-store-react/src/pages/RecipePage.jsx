import React, {useState} from 'react';
import "./RecipePage.css";
import { useLocation } from "react-router-dom";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs"
import Button from "../utility_elements/botao"

function RecipePage() {
    const [recipes, samaisvarejo] = useState();
    const location = useLocation();

    return(
        <div>
            <div>
                <h1>Receitas Inteligentes</h1>
                <p>Escolha o tipo de refeição que deseja preparar e nossa IA irá sugerir uma receita deliciosa com os ingredientes disponíveis em nossa loja</p>
            </div>

            <div>
                <Tabs>
                    <TabList>
                        <Tab>Almoço de Domingo</Tab>
                        <Tab>Receita para a Criançada</Tab>
                        <Tab>Jantar de Luxo</Tab>
                    </TabList>

                    <TabPanel>
                        <p>Receitas para reunir a família</p>
                        <Button>Gerar Receita</Button>
                    </TabPanel>
                    <TabPanel>
                        <p>Pronto rápido para a correria do dia a dia</p>
                        <Button>Gerar Receita</Button>
                    </TabPanel>
                    <TabPanel>
                        <p>Impressione seus convidados</p>
                        
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
}

export default RecipePage;