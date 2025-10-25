describe('Testes em API', () => {
    // Agrupa todos os testes relacionados à API da aplicação

    // Caminho feliz: testes com usuário autorizado
    context('Testes em rotas com usuário autorizado', () => {
        beforeEach(() => {
            cy.loginApi(Cypress.env('email'), Cypress.env('senha')) 
            // Realiza login via API antes de cada teste, usando comando customizado 'loginApi'
            // Salva o token em '@token' para uso nos testes
        })

        it('GET via url front para teste em resposta da home', () => {
            cy.request("GET", "/").should((response) => {
                expect(response.status).to.eq(200); 
                // Faz uma requisição GET na raiz da aplicação e verifica se o status HTTP é 200
            });
        });

        it('Deve verificar se o token de autenticação é retornado após login via POST na API', () => {
            cy.get('@token').should('exist'); 
            // Confirma que o token de autenticação foi criado e está disponível no alias '@token'
        })

        it('Deve verificar se o usuário está autenticado corretamente via POST na API', () => {
            // Valida se o token existe no contexto da aplicação
            cy.get('@token').then(token => {
                expect(token).to.exist; 
                // Garante que o token retornado na autenticação é válido
            });
        });
    });

    // Contexto para validação de respostas da API
    context('Validações em respostas da API', () => {
        beforeEach(() => {
            cy.loginApi(Cypress.env('email'), Cypress.env('senha')) 
            // Executa login via API antes de cada teste
        })

        it('POST em especialistas', () => {
            // Criação de um especialista usando dados fictícios
            cy.get('@especialistas').then((dados) => {
                const especialista = dados.especialistas[0]; 
                // Obtém o primeiro especialista do alias '@especialistas'

                cy.request({
                    method: 'POST', 
                    url: Cypress.env('api_clinica'), 
                    // Endpoint da API para criação de clínica/especialista
                    body: { 
                        nome: especialista.nome,
                        email: especialista.email,
                        senha: especialista.senha,
                        endereco: {
                            cep: especialista.cep,
                            rua: especialista.rua,
                            numero: especialista.numero,
                            complemento: especialista.complemento,
                            estado: especialista.estado
                        }
                    },
                }).then((response) => {
                    // Validações da resposta
                    if (response.status !== 201) {
                        cy.log(`O status ${response.status} não é o padrão 201`) 
                        // Registra no log se o status não é 201 (criação bem-sucedida)
                    }

                    expect(response.body).to.have.property('id') 
                    // Verifica se a resposta possui a propriedade "id"
                    expect(response.body).to.have.property('nome') 
                    expect(response.body).to.have.property('email') 
                    // Verifica se as propriedades 'nome' e 'email' existem na resposta
                })
            })
        })

        it('Requisição incorreta em criação de especialista', () => {
            // Testa envio de dados incompletos ou incorretos
            cy.request({
                method: 'POST',
                url: Cypress.env('api_clinica'), 
                body: {
                    nome: 'Camila',
                    email: 'camila123@exemplo', 
                    // Email inválido para gerar erro
                },
                failOnStatusCode: false 
                // Permite capturar resposta de erro sem quebrar o teste
            }).then((response) => {
                expect(response.status).to.eq(500) 
                // Espera que a API retorne erro 500
                expect(response.body).to.have.property('message') 
                // Verifica se o corpo da resposta contém a propriedade 'message' informando o erro
            })
        })
    })
});
