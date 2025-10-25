// Adiciona um comando customizado chamado 'login' com parâmetros 'email' e 'senha'
Cypress.Commands.add('login', (email, senha) => {
    // Usa 'cy.session' para armazenar e reutilizar a sessão de login, evitando logins repetitivos em cada teste
    cy.session([email, senha], () => {
        cy.visit('/login') // Acessa a página de login
        cy.get('[data-test="inputLoginEmail"]').type(email) // Preenche o campo de e-mail com o valor passado
        cy.get('[data-test="inputLoginSenha"]').type(senha, { log: false }) // Preenche o campo de senha, ocultando o valor no log do Cypress
        cy.get('[data-test="botaoTeste"]').should('be.visible').click() // Garante que o botão de login esteja visível e clica nele
        cy.location('pathname').should('eq', '/dashboard') // Verifica se o redirecionamento após o login é para '/dashboard'
    })
})

// Adiciona um comando customizado chamado 'cadastraEspecialista' com vários parâmetros para preencher o formulário completo
Cypress.Commands.add('cadastraEspecialista', (nome, email, senha, especialidade, crm, imagem, cep, rua, numero, complemento, estado) => {
    cy.visit('/dashboard') // Acessa a página inicial após o login
    cy.contains('Cadastrar especialista').should('be.visible').click() // Localiza o botão ou link de cadastro e clica nele
    cy.get('[data-test="inputEspecialistaNome"]').type(nome) // Preenche o campo de nome do especialista
    cy.get('[data-test="inputEspecialistaEmail"]').type(email) // Preenche o campo de e-mail
    cy.get('[data-test="inputEspecialistaSenha"]').type(senha) // Preenche o campo de senha
    cy.get('[data-test="inputEspecialistaSenhaVerificada"]').type(senha) // Confirma a senha digitada
    cy.get('[data-test="inputEspecialistaEspecialidade"]').type(especialidade) // Preenche o campo de especialidade
    cy.get('[data-test="inputEspecialistaCRM"]').type(crm) // Preenche o campo de CRM (registro profissional)
    cy.get('[data-test="inputEspecialistaImagem"]').type(imagem) // Preenche o campo de link ou caminho da imagem do especialista
    cy.get('[data-test="inputEspecialistaCEP"]').type(cep) // Preenche o campo de CEP (código postal)
    cy.get('[data-test="inputEspecialistaRua"]').type(rua) // Preenche o campo de rua
    cy.get('[data-test="inputEspecialistaNumero"]').type(numero) // Preenche o número do endereço
    cy.get('[data-test="inputEspecialistaComplemento"]').type(complemento) // Preenche o complemento (ex: sala, bloco)
    cy.get('[data-test="inputEspecialistaEstado"]').type(estado) // Preenche o campo de estado (UF)
})

// Adiciona um comando customizado chamado 'loginApi' com parâmetros 'email' e 'senha'
Cypress.Commands.add('loginApi', (email, senha) => {
    // Faz uma requisição HTTP diretamente para a API de autenticação (sem usar interface gráfica)
    cy.request({
        method: 'POST', // Define o método HTTP como POST
        url: Cypress.env('api_login'), // Usa o endpoint de login definido nas variáveis de ambiente do Cypress
        body: {
            email: email, // Envia o e-mail informado como parte do corpo da requisição
            senha: senha  // Envia a senha correspondente
        }
    }).then(response => { // Após receber a resposta da requisição, executa asserções de validação
        expect(response.status).to.eq(200); // Verifica se o status HTTP retornado é 200 (sucesso)
        expect(response.body.auth).to.be.true; // Garante que o campo 'auth' (autenticação) é verdadeiro
        expect(response.body.rota).to.eq('/clinica'); // Verifica se a rota de redirecionamento da API é '/clinica'
        expect(response.body.token).to.exist; // Confirma que a resposta contém um token JWT válido
        cy.wrap(response.body.token).as('token'); // Armazena o token em um alias chamado 'token' para ser usado em outros testes
    })
})

Cypress.Commands.add('logar', (email, password) => { // Adiciona um comando customizado (método) com nome login e parâmetros email e password que permite refatoração mais facil
    cy.get('[data-test="input-loginEmail"]').type(email); // Comando para selecionar o campo de entrada pelo nome e digitar o email
    cy.get('[data-test="input-loginPassword"]').type(password); // Comando para selecionar o campo de entrada pelo nome e digitar a senha
    cy.get('[data-test="submit-button"]').click(); // Comando para selecionar o botão de envio pelo atributo data-test e clicar nele
  }) 
 Cypress.Commands.add('cadastro', (name, email, password) => { // Adiciona um comando customizado (método) com nome cadastro e parâmetros nome, email e password que permite refatoração mais facil
    cy.get('[data-test="input-name"]').type(name); // Comando para selecionar o campo de entrada pelo nome e digitar o email
    cy.get('[data-test="input-email"]').type(email); // Comando para selecionar o campo de entrada pelo nome e digitar a senha
    cy.get('[data-test="input-password"]').type(password); // Comando para selecionar o campo de entrada pelo nome e digitar a senha
    cy.get('[data-test="input-confirm-password"]').type(password); // Comando para selecionar o campo de entrada pelo nome e digitar a senha
    cy.get('[data-test="submit-button"]').click(); // Comando para selecionar o botão de envio pelo atributo data-test e clicar nele
  }) 
