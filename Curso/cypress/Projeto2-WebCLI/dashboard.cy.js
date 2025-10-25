describe('Usuário logado na página de dashboard', () => {
    // Agrupa todos os testes relacionados ao dashboard de um usuário já logado

    beforeEach(() => {
        cy.login(Cypress.env('email'), Cypress.env('senha')) 
        // Executa antes de cada teste: realiza o login usando o comando customizado 'cy.login'
        // As credenciais são obtidas das variáveis de ambiente do Cypress
    })

    context('Redirecionamento na página de dashboard', () => {
        // Agrupa testes relacionados à navegação e redirecionamento no dashboard

        it('Verifica página de redirecionamento no login com sucesso', () => {
            cy.visit('/dashboard') 
            // Acessa a página do dashboard
            cy.url().should('eq', 'http://localhost:3000/dashboard') 
            // Verifica se a URL atual é exatamente a esperada após login
        })

        it('Com o usuário logado, cadastra um especialista', () => {
            cy.visit('/dashboard') 
            // Acessa a página do dashboard
            cy.url().should('eq', 'http://localhost:3000/dashboard') 
            // Garante que a URL está correta
            cy.contains('Cadastrar especialista').should('be.visible').click() 
            // Localiza o botão/link "Cadastrar especialista", verifica se está visível e clica nele
        })
    })

    context('Modal de cadastro de especialista', () => {
        // Agrupa testes relacionados ao modal de cadastro de especialista

        it('Verifica se o checkbox "Atende por plano?" está desmarcado', () => {
            cy.visit('/dashboard') 
            // Acessa o dashboard
            cy.contains('Cadastrar especialista').should('be.visible').click() 
            // Abre o modal de cadastro
            cy.get('[type="checkbox"]')
              .should('have.attr', 'aria-label', 'Atende por plano?')
              .and('not.be.checked') 
            // Verifica se o checkbox existe, possui o atributo correto e está desmarcado
        })

        it('Seleciona o botão checkbox "Atende por plano?" para visualizar os planos de saúde', () => {
            cy.visit('/dashboard') 
            cy.contains('Cadastrar especialista').should('be.visible').click() 
            // Abre o modal de cadastro
            cy.get('[type="checkbox"]').check() 
            // Marca o checkbox "Atende por plano?"
            cy.get('form').find('input[type="checkbox"]')
              .should('be.checked')
              .and('not.be.disabled') 
            // Verifica se os checkboxes dentro do formulário estão marcados e habilitados
            cy.get('[type="checkbox"]').check(['Sulamerica', 'Unimed', 'Bradesco']) 
            // Seleciona múltiplos planos de saúde
        })

        it('Seleciona o botão checkbox "Atende por plano?" para visualizar os planos de saúde', () => {
            // Repetição do teste anterior (possivelmente desnecessária, mas mantém fluxo)
            cy.visit('/dashboard') 
            cy.contains('Cadastrar especialista').should('be.visible').click() 
            cy.get('[type="checkbox"]').check()
            cy.get('form').find('input[type="checkbox"]').should('be.checked').and('not.be.disabled')
            cy.get('[type="checkbox"]').check(['Sulamerica', 'Unimed', 'Bradesco'])
        })

        it.only('Seleciona o botão checkbox "Atende por plano?" após preenchimento do formulário para visualizar os planos de saúde', () => {
            // Teste isolado para rodar sozinho devido ao '.only'
            cy.get('@especialistas').then((dados) => {
                const especialista = dados.especialistas[0]; 
                // Obtém o primeiro especialista do alias '@especialistas'

                cy.cadastraEspecialista(
                    especialista.nome,
                    especialista.email,
                    especialista.senha,
                    especialista.especialidade,
                    especialista.crm,
                    especialista.imagem,
                    especialista.cep,
                    especialista.rua,
                    especialista.numero,
                    especialista.complemento,
                    especialista.estado
                ); 
                // Usa o comando customizado 'cadastraEspecialista' para preencher o formulário completo

                cy.get('[type="checkbox"]').check() 
                // Marca o checkbox principal
                cy.get('[type="checkbox"]').last().scrollIntoView({ easing: 'linear' }) 
                // Garante que o último checkbox esteja visível na tela

                cy.get('.MuiFormGroup-root').children().each(($checkbox) => {
                    cy.wrap($checkbox).should('be.visible') 
                    // Verifica que todos os checkboxes dentro do container estão visíveis
                })
            })
        })
    })
})