describe('Teste de requisição da API para listar clínicas', () => {
    // Agrupa testes relacionados à API que lista clínicas

    it('Deve retornar uma lista de clínicas', () => {
        // Define um teste individual que verifica se a API retorna a lista corretamente

        cy.request('GET', Cypress.env('api_clinica'))
        // Faz uma requisição GET para o endpoint de clínicas, usando a variável de ambiente 'api_clinica'

            .then((response) => {
                // Executa ações após receber a resposta da API

                expect(response.status).to.eq(200);
                // Verifica se o status HTTP da resposta é 200 (OK)

                expect(response.body).to.be.an('array');
                // Verifica se o corpo da resposta é um array

                expect(response.body.length).to.be.greaterThan(0);
                // Verifica se o array contém pelo menos um elemento (há clínicas cadastradas)

                // Aqui você pode adicionar mais verificações conforme necessário
            });
    });
});


describe('Teste de logout no frontend', () => {
    // Agrupa testes relacionados ao logout no frontend

    it('Deve desautenticar o usuário após o logout', () => {
        cy.login(Cypress.env('email'), Cypress.env('senha'))
        // Realiza login com comando customizado 'cy.login' antes de testar o logout

        cy.visit('/dashboard');
        // Visita a página do dashboard, onde se encontra o botão de logout

        cy.get('.sc-fLcnxK').click();
        // Localiza o botão de logout pelo seletor e clica nele
        // Obs.: substituir pelo seletor correto do botão na aplicação real

        cy.window().its('localStorage.authToken').should('not.exist');
        // Verifica se o token de autenticação foi removido do localStorage, confirmando o logout

        cy.url().should('include', '/');
        // Verifica se o usuário foi redirecionado para a página de login
        // Geralmente, a URL inicial ou root da aplicação

        // Adicione mais verificações conforme necessário
        // Por exemplo, mensagens de sucesso, elementos escondidos/visíveis, etc.
    });
});