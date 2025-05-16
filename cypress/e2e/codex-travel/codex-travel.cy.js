describe('Codex Travel - Testes Funcionais', () => {
  context('Cenário 1: Formulário de Contato', () => {
    it('Deve exibir alerta de sucesso ao enviar dados válidos (Cenário de sucesso)', () => { 
      cy.visit('./index.html'); // Acessa o arquivo index.html, página que será usada como base para os testes
      cy.get("#nome").type("Rafael"); // Seleciona o selector de nome e insere o nome "Rafael"
      cy.get("#email").type("reunioesrez75@gmail.com"); // Seleciona o selector de email e insere o email "reunioesrez75@gmail.com"
      cy.get("#mensagem").type("Gostaria de obter mais informações"); // Define no campo de id "mensagem" a mensagem "Gostaria de obter mais informações"
      cy.get('#contatoForm > button').click(); // Clica no botão de envio do contato
      cy.on('window:alert', (alertText) => { // Cy.on cria um event listener, para esperar o alerta aparecer e manipulá-lo
        expect(alertText).to.equal('Mensagem enviada com sucesso!'); //A validação é feita para saber se ao desejar entrar em contato, o alerta é aberto com a mensagem certa
      });
    });
  });

  context('Cenário 2: Calculadora de Orçamento', () => {
    it('Deve retornar R$ 0.00 quando todos os campos são 0 (Cenário de erro)', () => {
    const dayjs = require('dayjs');
    const dataNascimentoMenosVinte = dayjs().subtract(20, 'years').format('YYYY-MM-DD');
    // É adicionado à variável "dataNascimentoValida" uma data no formato YYYY-MM-DD, 
    // com base na data atual menos 20 anos, subtração dada pelo método subtract, presente na biblioteca dayjs

    cy.visit('./index.html'); // Acessa o arquivo index.html,  página que será usada como base para os testes
    cy.get("#valorPassagem").type(0); // Define o valor da passagem no campo de id "valorPassagem", está sendo definido como 0
    cy.get("#numeroPessoas").type(0); // Define o número de pessoas no campo de id "numeroPessoas", está sendo definido como 0
    cy.get("#diasHospedagem").type(0); // Define a quantidade de dias de hospedagem no campo de id "diasHospedagem", está sendo definido como 0
    cy.get("#dataNascimento").type(dataNascimentoMenosVinte); // Define a data de nascimento no campo de id "dataNascimento" (deve ser acima de 18 anos, no caso, 20 anos)
    cy.get("#orcamentoForm > button").click(); // Clica no botão para executar o cálculo de orçamento
    cy.get('#resultadoOrcamento').should('have.text', 'Orçamento total: R$ 0.00'); // Com os campos acima zerados, o resultado obtido pelo id "resultadoOrcamento" deveria ser zerado, mas retorna 1000.00
    
    });
  });
});