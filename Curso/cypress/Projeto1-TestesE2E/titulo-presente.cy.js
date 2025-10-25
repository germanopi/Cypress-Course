describe('Test Cases relacionados ao título das páginas', () => {  // Cria um bloco de testes (Test Suite) relacionado aos títulos das páginas
    
    beforeEach(() => { // Bloco que será executado antes de cada teste individual
        cy.visit('https://adopet-frontend-cypress.vercel.app/'); // Acessa a URL da aplicação antes de cada teste
    });

    it('Verificar que o Título da página principal está presente', () => { // Cria um caso de teste (Test Case) específico para verificar títulos
        cy.get('.footer > p').should('be.visible'); // Seleciona o parágrafo dentro do footer e verifica se está visível
        cy.get('.initial > p').should('be.visible'); // Seleciona o parágrafo dentro da classe "initial" e verifica se está visível
    });
});