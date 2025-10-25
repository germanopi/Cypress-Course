/* Roteiro de testes 
Funcionalidade: 
  Cadastro de conta 
Cenário: 
  Exibir mensagens de erro ao tentar cadastrar com campos obrigatórios vazios
Passos: 
  O usuário acessa a página de cadastro.
  O usuário clica diretamente no botão "Cadastrar" sem preencher os campos.
Resultados Esperados: 
  O sistema exibe mensagens de erro para todos os campos obrigatórios.
Regra de Negócio:
  E-mail e senha são campos obrigatórios para o cadastro.
*/ 

describe('Testes relacionados à página de cadastro', () => {  
    // Test Suite que agrupa todos os testes relacionados à página de cadastro

    beforeEach(() => { 
        // Executa antes de cada teste
        cy.visit('https://adopet-frontend-cypress.vercel.app/'); 
        // Visita a página inicial
        cy.get('[data-test="register-button"]').click(); 
        // Clica no botão "Cadastrar" para abrir o formulário
    }); 

    it('Exibe mensagens de erro quando campos obrigatórios estão vazios', () => { 
        // Test Case que valida mensagens de erro do formulário vazio

        cy.get('[data-test="submit-button"]').click(); 
        // Clica no botão de submit sem preencher os campos

        // Validações das mensagens de erro
        cy.contains('É necessário informar um endereço de email')
          .should('be.visible'); 
        // Verifica se a mensagem de erro de email obrigatório aparece

        cy.contains('Crie uma senha')
          .should('be.visible'); 
        // Verifica se a mensagem de erro de senha obrigatória aparece

        cy.contains('Repita a senha criada acima')
          .should('be.visible'); 
        // Verifica se a mensagem de erro de confirmação de senha obrigatória aparece

    });
});
