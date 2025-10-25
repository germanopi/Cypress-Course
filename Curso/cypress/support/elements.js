// Exporta um objeto constante chamado 'PARAMETERS' para ser importado em outros arquivos de teste
export const PARAMETERS = {
    // Cada propriedade aqui representa um seletor CSS associado a um elemento da interface (HTML)

    registerButton: '[data-test="register-button"]', 
    // Seletor do botão de registro/cadastro na tela (geralmente um botão "Cadastrar" ou "Registrar")

    nome: '[data-test="input-name"]', 
    // Seletor do campo de entrada onde o usuário digita o nome

    email: '[data-test="input-email"]', 
    // Seletor do campo de entrada onde o usuário digita o e-mail

    inputPassword: '[data-test="input-password"]', 
    // Seletor do campo onde o usuário digita a senha

    confirmPassword: '[data-test="input-confirm-password"]', 
    // Seletor do campo onde o usuário confirma a senha digitada anteriormente

    submitButton: '[data-test="submit-button"]'
    // Seletor do botão de envio do formulário (geralmente "Cadastrar" ou "Enviar")
}