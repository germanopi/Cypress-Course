/* Roteiro de testes 
Funcionalidade: 
  Cadastro de conta 
Cenário: 
  Realizar um cadastro no site com sucesso
Passos: 
  O usuário acessa a página de cadastro.
  O usuário preenche o campo "Nome".
  O usuário preenche o campo "Email" com um e-mail válido.
  O usuário preenche o campo "Senha" com uma senha válida.
  O usuário preenche o campo "Confirmação de Senha" com a mesma senha.
  O usuário clica no botão "Cadastrar".
Resultados Esperados: 
  O sistema exibe uma mensagem de sucesso indicando que o cadastro foi realizado com sucesso.
Regra de Negócio:
  E-mail e senha são campos obrigatórios para o cadastro.
*/ 

describe('Test Cases relacionados à página de login', () => {  
    // Test Suite que agrupa todos os testes relacionados ao cadastro/login

    beforeEach(() => { 
        // Executa antes de cada teste no bloco describe
        cy.visit('https://adopet-frontend-cypress.vercel.app/'); 
        // Visita a página inicial da aplicação
        cy.get('[data-test="register-button"]').click(); 
        // Clica no botão de cadastro para abrir o formulário
    }) 

    it('Carregar a página e preencher o cadastro com um usuário válido', () => { 
        // Test Case que valida o fluxo de cadastro com dados válidos
        cy.cadastro("Pedro Ribero","ribero@gmail.com","Ribero123"); 
        // Utiliza comando customizado para preencher e submeter o formulário de cadastro
        // OBS: esse comando substitui os comandos individuais comentados abaixo
        // Mantê-los comentados é útil como referência de seletores ou para debugging

        /* Comentários sobre os comandos antigos:
        cy.get('[data-test="input-name"]').type("Pedro Ribero");  
        cy.get('[data-test="input-email"]').type("ribero@gmail.com"); 
        cy.get('[data-test="input-password"]').type("Ribero123"); 
        cy.get('[data-test="input-confirm-password"]').type("Ribero123"); 
        cy.get('[data-test="submit-button"]').click(); 
        cy.contains('button',"Cadastrar").click(); 
        */
    })
})

/* Roteiro de testes 
Funcionalidade: 
  Acessar páginas  
Cenário: 
  Verificar as páginas do site
Passos: 
  O usuário acessa a página principal.
  O usuário acessa a página de pets disponíveis para adoção.
  O usuário acessa a página principal ao clicar no título do site. 
  O usuário acessa a página de login. 
  O usuário acessa a página principal ao clicar no título do site.
  O usuário acessa a página de falar com responsável.
Resultados Esperados: 
  Todo o fluxo de troca de páginas deve ocorrer com sucesso.
Regra de Negócio:
  Todas as páginas do site devem estar acessíveis a qualquer usuário.
*/ 

describe('Test Cases relacionados à troca de página', () => {  
    // Test Suite que agrupa todos os testes de navegação entre páginas

    beforeEach(() => { 
        cy.visit('https://adopet-frontend-cypress.vercel.app/'); 
        // Visita a página inicial antes de cada teste
    }) 

    it('Testar o fluxo das páginas do site', () => { 
        // Test Case que verifica a navegação entre diferentes páginas

        cy.contains('a',"Ver pets disponíveis para adoção").click();  
        // Clica no link "Ver pets disponíveis para adoção"

        cy.get('.header__home').click() 
        // Volta para a página inicial clicando no título/home

        cy.wait(1000); 
        // Aguarda 1 segundo (poderia ser substituído por cy.intercept() para esperar carregamento de API)

        cy.get('a[href="/login"]').click(); 
        // Acessa a página de login

        cy.wait(1000); 
        // Aguarda 1 segundo

        cy.get('.header__home').click(); 
        // Retorna à página inicial

        cy.wait(1000); 
        // Aguarda 1 segundo

        cy.get('a[aria-label="Ir para Mensagens"]').click(); 
        // Acessa a página de mensagens ou contato com responsável

        cy.wait(1000); 
        // Aguarda 1 segundo
        // OBS: waits fixos podem ser substituídos por intercepts ou asserts de visibilidade para testes mais estáveis
    })
})
