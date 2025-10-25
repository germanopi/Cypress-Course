describe('Página de Login', () => {
    // Agrupa todos os testes relacionados à página de login

    beforeEach(() => {
        cy.visit('') 
        // Acessa a URL base da aplicação definida no Cypress (por exemplo, 'http://localhost:3000/')
        
        cy.contains('Entrar').click() 
        // Localiza o botão ou link com o texto "Entrar" e clica nele para abrir o formulário de login
    })

    it('Digita email e senha corretos para efetuar o login', { browser: 'firefox' }, () => {
        // Define um teste individual, especificando que será executado no navegador Firefox

        cy.login(Cypress.env('email'), Cypress.env('senha')); 
        // Usa o comando customizado 'cy.login' para preencher e submeter o formulário com email e senha válidos
        // As credenciais são obtidas das variáveis de ambiente do Cypress

        cy.url().should('eq', 'http://localhost:3000/dashboard'); 
        // Verifica se, após o login, o usuário foi redirecionado corretamente para o dashboard
    })
})