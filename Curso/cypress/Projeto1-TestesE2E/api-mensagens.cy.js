describe('Api Adopet', () => { 
    // Descrição do conjunto de testes (Test Suite) relacionado à API Adopet

    // const tempoEsperado = Math.random() * 1000 
    // Comentado: poderia ser usado para testar tempo máximo de resposta, mas atualmente não está ativo

    it("Mensagem da API", () => { 
        // Define um caso de teste que verifica a resposta de uma mensagem da API

        cy.request({ 
            // Faz uma requisição HTTP
            method: 'GET', 
            url: 'https://adopet-api-i8qu.onrender.com/mensagem/11643cd6-7112-415b-95d2-08904b0d1a1c', 
            // Endpoint da API que retorna a mensagem
            headers: Cypress.env() 
            // Passa os headers configurados nas variáveis de ambiente
            // OBS: normalmente você define token no cypress.env.json como { "Authorization": "Bearer ..." }
        }).then((res) => { 
            // Manipula a resposta da requisição

            expect(res.status).to.eq(200); 
            // Verifica se o status da resposta é 200 (OK)

            expect(res.body).to.not.be.empty; 
            // Corrigido: a sintaxe correta para verificar que o corpo não está vazio é 'to.not.be.empty'

            expect(res.body).to.have.property('msg'); 
            // Verifica se a propriedade 'msg' existe no corpo da resposta

            // expect(res.duration).to.be.lte(tempoEsperado) 
            // Comentado: se quiser validar tempo de resposta, descomente e defina 'tempoEsperado'
        })
    })
})
