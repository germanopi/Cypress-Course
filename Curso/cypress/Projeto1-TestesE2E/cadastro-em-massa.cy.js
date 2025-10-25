import { usuarios } from '../fixturesProjeto1/usuarios.json'; 
// Importa o array de usuários do arquivo JSON para usar nos testes

describe("Página de cadastro", () => { 
    // Test Suite que agrupa todos os testes relacionados à página de cadastro

    beforeEach(() => { 
        // Executa antes de cada teste dentro deste bloco describe
        cy.visit('https://adopet-frontend-cypress.vercel.app/'); 
        // Visita a página inicial da aplicação
        cy.get('[data-test="register-button"]').click(); 
        // Clica no botão "Cadastrar" para abrir o formulário de cadastro
    });

    usuarios.forEach(usuario => { 
        // Itera sobre cada usuário do arquivo JSON, criando um teste individual para cada

        it(`Preencher o formulário corretamente para cadastrar o usuário ${usuario.name}`, 
            // Descrição do teste individual (agora incluindo o nome do usuário para melhor rastreabilidade)
            () => {
                cy.get('[data-test="input-name"]')
                  .clear()
                  .type(usuario.name); 
                // Seleciona o campo "Nome", limpa qualquer valor anterior e digita o nome do usuário

                cy.get('[data-test="input-email"]')
                  .clear()
                  .type(usuario.email); 
                // Seleciona o campo "Email", limpa e digita o email do usuário

                cy.get('[data-test="input-password"]')
                  .clear()
                  .type(usuario.password); 
                // Seleciona o campo "Senha", limpa e digita a senha

                cy.get('[data-test="input-confirm-password"]')
                  .clear()
                  .type(usuario.password); 
                // Seleciona o campo "Confirmação de Senha", limpa e digita a mesma senha

                cy.get('[data-test="submit-button"]').click(); 
                // Clica no botão "Cadastrar" para submeter o formulário

                // Sugestão de melhoria:
                // Adicionar validação pós-submit para garantir que o cadastro foi realizado
                // Exemplo:
                // cy.contains('Cadastro realizado com sucesso').should('be.visible');
            });
    });
});
