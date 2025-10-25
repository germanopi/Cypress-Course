/* 
Funcionalidade: Login no site Adopet
Cenário: Falha no login do sistema
Passos:
  - O usuário acessa a página de login.
  - O usuário insere um e-mail e senha fora do padrão aceito.
  - O usuário clica no botão "Entrar".
Resultados Esperados:
  - O sistema valida as credenciais.
  - O sistema exibe mensagens de erro específicas para o e-mail e senha.
Regra de Negócio:
  - O e-mail deve ter um formato válido.
  - A senha deve conter pelo menos uma letra maiúscula, um número e ter entre 6 e 15 caracteres.
*/

describe('Testes relacionados à falha de login', () => { // Cria um bloco de testes agrupando todos os casos relacionados à falha de login
    
    beforeEach(() => { // Executa este bloco antes de cada teste individual
        cy.visit('https://adopet-frontend-cypress.vercel.app/'); // Acessa a URL inicial do site
        cy.get('[data-test="login-button"]').click(); // Clica no botão de login para abrir o formulário
        cy.intercept('POST', 'https://adopet-api-i8qu.onrender.com/adotante/login', { // Intercepta requisições POST para a rota de login
            statusCode: 400 // Simula um erro de requisição (Bad Request)
        }).as('stubPost'); // Cria um alias 'stubPost' para poder usar em cy.wait()
    });

    it('Exibe mensagens de erro ao preencher login com dados inválidos', () => { // Caso de teste para login inválido
        cy.get('[data-test="input-loginEmail"]').type("email"); // Seleciona o campo de email e digita um valor inválido
        cy.get('[data-test="input-loginPassword"]').type("1"); // Seleciona o campo de senha e digita um valor inválido
        cy.get('[data-test="submit-button"]').click(); // Clica no botão de enviar login
        cy.contains('Por favor, verifique o email digitado').should('be.visible'); // Verifica se a mensagem de erro do email aparece
        cy.contains('A senha deve conter pelo menos uma letra maiúscula, um número e ter entre 6 e 15 caracteres').should('be.visible'); // Verifica se a mensagem de erro da senha aparece
    });

    it('Exibe mensagens de erro ao enviar login com campos vazios', () => { // Caso de teste para envio sem preencher os campos
        cy.get('[data-test="submit-button"]').click(); // Clica no botão de login sem preencher nenhum campo
        cy.contains('É necessário informar um endereço de email').should('be.visible'); // Verifica mensagem de email obrigatório
        cy.contains('Insira sua senha').should('be.visible'); // Verifica mensagem de senha obrigatória
    });

    it('Simula falha de login mesmo com dados corretos usando stub', () => { // Caso de teste usando stub para falhar mesmo com dados válidos
        cy.logar("ribero@gmail.com","Ribero123"); // Usa o comando customizado de login para preencher email e senha
        cy.wait('@stubPost'); // Aguarda a requisição interceptada ser chamada
        cy.contains("Falha no login. Consulte suas credenciais.").should('be.visible'); // Verifica se a mensagem de erro do stub aparece
    });
});