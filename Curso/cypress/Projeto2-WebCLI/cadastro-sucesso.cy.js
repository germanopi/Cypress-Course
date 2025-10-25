import { fakerPT_BR as faker } from '@faker-js/faker'; 
// Importa o módulo Faker em português do Brasil para gerar dados falsos aleatórios (nomes, emails, telefones, etc.)

describe('Página de cadastro', () => { 
    // Define um conjunto de testes agrupados com o título "Página de cadastro"

    beforeEach(() => {
        cy.visit('/'); 
        // Executa antes de cada teste: abre a página inicial da aplicação
    })

    context('Testes na página de cadastro', () => { 
        // Agrupa testes relacionados apenas à navegação inicial para a página de cadastro

        it('Clica no link "Cadastra-se" e redireciona para a página de cadastro da clínica', () => { 
            // Define um teste individual com a descrição do comportamento esperado
            cy.get('[href="/cadastro"]').click(); 
            // Localiza o link com href="/cadastro" e clica nele
            cy.location('pathname').should('equal', '/cadastro') 
            // Verifica se a URL após o clique mudou para "/cadastro"
        })
    })

    context('Primeira parte da sessão de cadastro', () => { 
        // Agrupa testes relacionados à primeira etapa do formulário de cadastro

        it('Digita dados da clínica e exibe a área para inserção de dados técnicos', () => { 
            cy.get('[href="/cadastro"]').click(); 
            // Navega para a página de cadastro
            cy.get('[data-test="inputNome"]').type('Catarina P'); 
            // Preenche o campo nome
            cy.get('[data-test="inputCNPJ"]').type('12598432'); 
            // Preenche o campo CNPJ
            cy.get('[data-test="inputEmail"]').type('catarina@email.com'); 
            // Preenche o campo email
            cy.get('[data-test="inputSenha"]').type('Senha123'); 
            // Preenche o campo senha
            cy.get('[data-test="inputSenhaVerificada"]').type('Senha123'); 
            // Confirma a senha
            cy.get('.sc-bcXHqe').click(); 
            // Clica no botão para avançar para a próxima etapa
            cy.contains('h2', 'Agora, os dados técnicos:').should('be.visible'); 
            // Verifica se o cabeçalho da próxima seção está visível
            cy.get('.sc-laZRCg').should('exist').should('be.visible'); 
            // Verifica se o contêiner da seção técnica existe e está visível
        })
    })

    context('Sessão de cadastro completa', () => { 
        // Agrupa testes da etapa completa do cadastro, incluindo dados técnicos

        const senha = faker.internet.password({ length: 8, memorable: true }); 
        // Gera uma senha aleatória de 8 caracteres, fácil de lembrar

        it('Cadastra uma clínica', () => { 
            // Teste que preenche e envia todo o formulário de cadastro
            cy.get('[href="/cadastro"]').click(); 
            // Navega para a página de cadastro
            cy.get('[data-test="inputNome"]').type(faker.internet.userName()); 
            // Preenche o nome com um nome aleatório
            cy.get('[data-test="inputCNPJ"]').type(faker.string.numeric(14)); 
            // Preenche o CNPJ com 14 números aleatórios
            cy.get('[data-test="inputEmail"]').type(faker.internet.email()); 
            // Preenche o e-mail com um e-mail aleatório
            cy.get('[data-test="inputSenha"]').type(senha); 
            // Preenche a senha gerada
            cy.get('[data-test="inputSenhaVerificada"]').type(senha); 
            // Confirma a senha
            cy.get('.sc-bcXHqe').click(); 
            // Avança para a seção técnica
            cy.get('[data-test="inputTelefone"]').type(faker.phone.number()); 
            // Preenche o telefone aleatório
            cy.get('[data-test="inputCEP"]').type(faker.location.zipCode()); 
            // Preenche o CEP aleatório
            cy.get('[data-test="inputRua"]').type(faker.location.street()); 
            // Preenche a rua aleatória
            cy.get('[data-test="inputNumero"]').type(faker.location.buildingNumber()); 
            // Preenche o número do endereço aleatório
            cy.get('[data-test="inputComplemento"]').type(faker.location.secondaryAddress()); 
            // Preenche o complemento aleatório
            cy.get('[data-test="inputEstado"]').type(faker.location.state({ abbreviated: true })); 
            // Preenche o estado (abreviado)
            cy.contains('Cadastrar').click(); 
            // Clica no botão "Cadastrar" para enviar o formulário
            cy.location('pathname').should('equal', '/login'); 
            // Verifica se o redirecionamento após cadastro foi para a página de login
        })
    })
})