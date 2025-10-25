/* eslint-disable no-unused-vars */ // Desativa a regra do ESLint que marca variáveis declaradas mas não utilizadas como erro.
/* eslint-disable no-undef */ // Desativa a regra do ESLint que marca o uso de variáveis não declaradas (como 'module', 'require') como erro.

const { defineConfig } = require("cypress"); 
// Importa a função 'defineConfig' do Cypress, usada para definir a configuração de forma organizada e validada.

module.exports = defineConfig({ 
  // Exporta o objeto de configuração do Cypress para que ele possa ser lido quando os testes forem executados.
  e2e: { 
    // Define as configurações específicas para testes do tipo "end-to-end" (E2E).
    setupNodeEvents(on, config) { 
      // Função usada para configurar eventos Node.js dentro do Cypress (ex: logs, plugins, relatórios personalizados).
      // 'on' permite ouvir eventos do Cypress; 'config' contém a configuração atual.
      // implement node event listeners here
      // Comentário padrão do Cypress indicando onde implementar ouvintes de eventos, se necessário.
    },
    baseUrl: 'http://localhost:3000/', 
    // Define o endereço base onde a aplicação será carregada durante os testes.
    // Isso permite usar apenas caminhos relativos nos comandos de teste (ex: cy.visit('/login')).

    video: false, 
    // Desativa a gravação de vídeo das execuções de teste (útil para economizar espaço ou acelerar execuções locais).

    reporter: 'mochawesome', 
    // Define o gerador de relatórios de testes como "mochawesome", que cria relatórios HTML e JSON com visual amigável.

    reporterOptions: { 
      // Define as opções de configuração específicas para o reporter 'mochawesome'.
      reportDir: 'cypress/results', 
      // Caminho onde os relatórios serão salvos.
      overwrite: false, 
      // Define se os relatórios antigos devem ser sobrescritos (false = mantém todos).
      html: true, 
      // Gera relatórios em formato HTML.
      json: false, 
      // Define se deve gerar também em JSON (false = não gera).
      timestamp: "mmddyyyy_HHMMss" 
      // Define o formato da data/hora usada no nome do relatório.
    },

    projectId: "8gi3z6", 
    // Identificador único do projeto no Cypress Cloud (usado para integração com o painel online do Cypress).

    defaultCommandTimeout: 60000, 
    // Tempo máximo (em milissegundos) que o Cypress vai esperar por um comando antes de falhar (60 segundos aqui).

    env: { 
      // Define variáveis de ambiente que podem ser usadas dentro dos testes Cypress com 'Cypress.env("chave")'.
      "email": "clinica@gmail.com", 
      // E-mail usado nos testes de autenticação ou login.
      "senha": "4321", 
      // Senha correspondente ao e-mail de teste.
      "api_login": "http://localhost:8080/auth/login", 
      // Endpoint da API usado para autenticação de usuário.
      "api_clinica": "http://localhost:8080/clinica", 
      // Endpoint da API para recursos relacionados à clínica.
      "api_especialista": "http://localhost:8080/especialista", 
      // Endpoint da API para recursos relacionados a especialistas.
      "requestMode": true 
      // Variável de controle — pode ser usada para habilitar/desabilitar testes que envolvem requisições à API.
    }

  },

}); 
// Fecha e exporta a configuração completa para que o Cypress possa utilizá-la durante as execuções.