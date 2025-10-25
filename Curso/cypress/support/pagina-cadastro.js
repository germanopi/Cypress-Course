import { ELEMENTS } from "./elements"; 
// Importa o objeto ELEMENTS do arquivo elements.js, que contém todos os seletores dos elementos da interface

const elementos = ELEMENTS; 
// Cria uma constante 'elementos' para facilitar o acesso aos seletores, evitando escrever ELEMENTS toda vez

class Cadastro { 
    // Define uma classe chamada 'Cadastro' que encapsula todas as ações relacionadas à página de cadastro

    acessarPaginaDeCadastro() { 
        // Método que abre a página principal e navega até o formulário de cadastro
        cy.visit('https://adopet-frontend-iota.vercel.app/'); 
        // Abre a URL da aplicação no navegador de teste

        cy.get(elementos.registerButton).click(); 
        // Localiza o botão de registro usando o seletor do arquivo elements.js e clica nele
    }

    preencherFormulario() { 
        // Método que preenche o formulário de cadastro com dados de exemplo
        cy.get(elementos.nome).type('Carolinda'); 
        // Preenche o campo de nome

        cy.get(elementos.email).type('carolina@email.com'); 
        // Preenche o campo de e-mail

        cy.get(elementos.inputPassword).type('Senha123'); 
        // Preenche o campo de senha

        cy.get(elementos.confirmPassword).type('Senha123'); 
        // Preenche o campo de confirmação de senha
    }

    submeterCadastro() { 
        // Método que envia o formulário de cadastro
        cy.get(elementos.submitButton).click(); 
        // Localiza e clica no botão de envio usando o seletor definido em elements.js
    }
}

export default new Cadastro(); 
// Exporta uma **instância** da classe Cadastro para que possa ser usada diretamente nos testes, sem precisar instanciá-la manualmente