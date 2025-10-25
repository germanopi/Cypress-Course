describe('Testes relacionados à página de login', () => {  
    // Test Suite que agrupa todos os testes relacionados à página de login

    beforeEach(() => { 
        // Executa antes de cada teste
        cy.visit('https://adopet-frontend-cypress.vercel.app/'); 
        // Visita a página inicial
    });

    it('Carregar a página de login e efetuar login com usuário válido', () => { 
        // Test Case: valida login via botão principal da página
        cy.get('[data-test="login-button"]').click(); 
        // Clica no botão de login para abrir o formulário

        cy.get('[data-test="input-loginEmail"]').type("ribero@gmail.com"); 
        // Preenche o campo de email
        cy.get('[data-test="input-loginPassword"]').type("Ribero123"); 
        // Preenche o campo de senha
        cy.get('[data-test="submit-button"]').click(); 
        // Clica no botão de submit para efetuar login

    });

    it('Carregar a página de login pela seção de mensagens e efetuar login', () => { 
        // Test Case: valida login via redirecionamento da seção de mensagens
        cy.get('.header__message').click(); 
        // Clica no ícone de mensagens, que redireciona para a página de login

        cy.logar("ribero@gmail.com","Ribero123"); 
        // Usa o comando customizado para login, substituindo os comandos individuais de digitação
        // o método cy.login(email, password) é chamado substituindo os comandos individuais abaixo
        // cy.get('[data-test="input-loginEmail"]').type(""); // Comando para selecionar o campo de entrada pelo nome e digitar "
        // cy.get('[data-test="input-loginPassword"]').type("Ribero123"); // Comando para selecionar o campo de entrada pelo nome e digitar "123"
        // cy.get('[data-test="submit-button"]').click(); // Comando para selecionar o botão de envio pelo atributo data-test e clicar nele
    });
});
