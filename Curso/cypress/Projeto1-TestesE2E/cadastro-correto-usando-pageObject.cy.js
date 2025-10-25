import Cadastro from '../support/pages/cadastro/pagina-cadastro'; 
// Importa a classe Cadastro do arquivo pagina-cadastro.js
// Essa classe encapsula métodos para interagir com a página de cadastro (Page Object)

describe('Página de cadastro', () => { 
    // Agrupa todos os testes relacionados à página de cadastro (Test Suite)

    beforeEach(() => { 
        // Executa antes de cada teste dentro deste bloco describe
        cy.visit('https://adopet-frontend-iota.vercel.app/'); 
        // Visita a URL da aplicação, garantindo que cada teste comece na página inicial
    })

    it('Deve preencher os campos do formulário corretamente para cadastrar um novo usuário', () => { 
        // Define um teste individual (Test Case)
        // Verifica se é possível preencher e submeter o formulário de cadastro corretamente

        Cadastro.acessarPaginaDeCadastro(); 
        // Chama o método da classe Cadastro que clica no link/botão para acessar a página de cadastro

        Cadastro.preencherFormulario(); 
        // Chama o método que preenche todos os campos do formulário com dados de teste

        Cadastro.submeterCadastro(); 
        // Chama o método que clica no botão de submissão do formulário
        // OBS: para tornar o teste mais robusto, você poderia adicionar validações após o submit
        // Ex: verificar se houve redirecionamento ou mensagem de sucesso
    })
})
