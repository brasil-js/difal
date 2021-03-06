var difal = require('./index');

module.exports = {
    'Executa o cálculo corretamente': function(test) {
        // Exemplo retirado de:
        // https://www.youtube.com/watch?v=SUxbEKP9tXM aos 29:41 minutos

        var resultado = difal({
            baseDeCalculo: 100,
            consumidorFinal: true,
            eContribuinte: false,
            estadoDeOrigem: 'sp',
            estadoDeDestino: 'rj',
            aliquotaDoFundoDeCombateAPobreza: 0.01,
            dataDeEmissao: new Date(2016, 0, 1),
            eOptantePeloSimples: false,
            produtoEmRegimeDeSt: false,
            produtoImportado: false
        });

        test.equal(resultado.icmsOrigem, 12);
        test.equal(resultado.icmsDifalOrigem, 3.60);
        test.equal(resultado.icmsDifalDestino, 2.40);
        test.equal(resultado.fundoDeCombateAPobreza, 1);
        test.done();
    },

    'Executa o cálculo corretamente 2': function(test) {
        var resultado = difal({
            baseDeCalculo: 1000,
            consumidorFinal: true,
            eContribuinte: false,
            estadoDeOrigem: 'mg',
            estadoDeDestino: 'go',
            aliquotaDoFundoDeCombateAPobreza: 0.02,
            dataDeEmissao: new Date(2016, 0, 1),
            eOptantePeloSimples: false,
            produtoEmRegimeDeSt: false,
            produtoImportado: false
        });

        test.equal(resultado.icmsOrigem, 70);
        test.equal(resultado.icmsDifalOrigem, 60);
        test.equal(resultado.icmsDifalDestino, 40);
        test.equal(resultado.fundoDeCombateAPobreza, 20);
        test.done();
    },

    'Calcula a partilha corretamente em 2017': function(test) {
        var resultado = difal({
            baseDeCalculo: 100,
            consumidorFinal: true,
            eContribuinte: false,
            estadoDeOrigem: 'sp',
            estadoDeDestino: 'rj',
            aliquotaDoFundoDeCombateAPobreza: 0.01,
            dataDeEmissao: new Date(2017, 0, 1),
            eOptantePeloSimples: false,
            produtoEmRegimeDeSt: false,
            produtoImportado: false
        });

        test.equal(resultado.icmsOrigem, 12);
        test.equal(resultado.icmsDifalOrigem, 2.40);
        test.equal(resultado.icmsDifalDestino, 3.60);
        test.equal(resultado.fundoDeCombateAPobreza, 1);
        test.done();
    },

    'Calcula a partilha corretamente em 2018': function(test) {
        var resultado = difal({
            baseDeCalculo: 100,
            consumidorFinal: true,
            eContribuinte: false,
            estadoDeOrigem: 'sp',
            estadoDeDestino: 'rj',
            aliquotaDoFundoDeCombateAPobreza: 0.01,
            dataDeEmissao: new Date(2018, 0, 1),
            eOptantePeloSimples: false,
            produtoEmRegimeDeSt: false,
            produtoImportado: false
        });

        test.equal(resultado.icmsOrigem, 12);
        test.equal(resultado.icmsDifalOrigem, 1.20);
        test.equal(resultado.icmsDifalDestino, 4.80);
        test.equal(resultado.fundoDeCombateAPobreza, 1);
        test.done();
    },

    'Calcula a partilha corretamente em 2019': function(test) {
        var resultado = difal({
            baseDeCalculo: 100,
            consumidorFinal: true,
            eContribuinte: false,
            estadoDeOrigem: 'sp',
            estadoDeDestino: 'rj',
            aliquotaDoFundoDeCombateAPobreza: 0.01,
            dataDeEmissao: new Date(2019, 0, 1),
            eOptantePeloSimples: false,
            produtoEmRegimeDeSt: false,
            produtoImportado: false
        });

        test.equal(resultado.icmsOrigem, 12);
        test.equal(resultado.icmsDifalOrigem, 0);
        test.equal(resultado.icmsDifalDestino, 6);
        test.equal(resultado.fundoDeCombateAPobreza, 1);
        test.done();
    },

    'Retorna alguns dados passados como parametro': function(test) {
        var resultado = difal({
            baseDeCalculo: 100,
            consumidorFinal: true,
            eContribuinte: false,
            estadoDeOrigem: 'sp',
            estadoDeDestino: 'rj',
            aliquotaDoFundoDeCombateAPobreza: 0.01,
            dataDeEmissao: new Date(2019, 0, 1),
            eOptantePeloSimples: false,
            produtoEmRegimeDeSt: false,
            produtoImportado: false
        });

        test.equal(resultado.baseDeCalculo, 100);
        test.equal(resultado.aliquotaDoFundoDeCombateAPobreza, 1);
        test.done();
    },

    'Retorna a aliquota interestadual e a aliquota interna do destino': function(test) {
        var resultado = difal({
            baseDeCalculo: 100,
            consumidorFinal: true,
            eContribuinte: false,
            estadoDeOrigem: 'sp',
            estadoDeDestino: 'rj',
            aliquotaDoFundoDeCombateAPobreza: 0.01,
            dataDeEmissao: new Date(2019, 0, 1),
            eOptantePeloSimples: false,
            produtoEmRegimeDeSt: false,
            produtoImportado: false
        });

        test.equal(resultado.aliquotaInternaNoDestino, 18);
        test.equal(resultado.aliquotaInterestadual, 12);
        test.done();
    },

    'Retorna o percentual de partilha corretamente 1': function(test) {
        var resultado = difal({
            baseDeCalculo: 100,
            consumidorFinal: true,
            eContribuinte: false,
            estadoDeOrigem: 'sp',
            estadoDeDestino: 'rj',
            aliquotaDoFundoDeCombateAPobreza: 0.01,
            dataDeEmissao: new Date(2016, 0, 1),
            eOptantePeloSimples: false,
            produtoEmRegimeDeSt: false,
            produtoImportado: false
        });

        test.equal(resultado.partilha.origem, 60);
        test.equal(resultado.partilha.destino, 40);
        test.done();
    },

    'Retorna o percentual de partilha corretamente 2': function(test) {
        var resultado = difal({
            baseDeCalculo: 100,
            consumidorFinal: true,
            eContribuinte: false,
            estadoDeOrigem: 'sp',
            estadoDeDestino: 'rj',
            aliquotaDoFundoDeCombateAPobreza: 0.01,
            dataDeEmissao: new Date(2017, 0, 1),
            eOptantePeloSimples: false,
            produtoEmRegimeDeSt: false,
            produtoImportado: false
        });

        test.equal(resultado.partilha.origem, 40);
        test.equal(resultado.partilha.destino, 60);
        test.done();
    },

    'Retorna o percentual de partilha corretamente 3': function(test) {
        var resultado = difal({
            baseDeCalculo: 100,
            consumidorFinal: true,
            eContribuinte: false,
            estadoDeOrigem: 'sp',
            estadoDeDestino: 'rj',
            aliquotaDoFundoDeCombateAPobreza: 0.01,
            dataDeEmissao: new Date(2018, 0, 1),
            eOptantePeloSimples: false,
            produtoEmRegimeDeSt: false,
            produtoImportado: false
        });

        test.equal(resultado.partilha.origem, 20);
        test.equal(resultado.partilha.destino, 80);
        test.done();
    },

    'Retorna o percentual de partilha corretamente 4': function(test) {
        var resultado = difal({
            baseDeCalculo: 100,
            consumidorFinal: true,
            eContribuinte: false,
            estadoDeOrigem: 'sp',
            estadoDeDestino: 'rj',
            aliquotaDoFundoDeCombateAPobreza: 0.01,
            dataDeEmissao: new Date(2019, 0, 1),
            eOptantePeloSimples: false,
            produtoEmRegimeDeSt: false,
            produtoImportado: false
        });

        test.equal(resultado.partilha.origem, 0);
        test.equal(resultado.partilha.destino, 100);
        test.done();
    },

    'Retorna o percentual de partilha corretamente 5': function(test) {
        var resultado = difal({
            baseDeCalculo: 100,
            consumidorFinal: true,
            eContribuinte: false,
            estadoDeOrigem: 'sp',
            estadoDeDestino: 'rj',
            aliquotaDoFundoDeCombateAPobreza: 0.01,
            dataDeEmissao: new Date(2020, 0, 1),
            eOptantePeloSimples: false,
            produtoEmRegimeDeSt: false,
            produtoImportado: false
        });

        test.equal(resultado.partilha.origem, 0);
        test.equal(resultado.partilha.destino, 100);
        test.done();
    },

    'Retorna nulo caso destinatario não seja consumidor final': function(test) {
       var resultado = difal({
            baseDeCalculo: 100,
            consumidorFinal: false,
            eContribuinte: false,
            estadoDeOrigem: 'sp',
            estadoDeDestino: 'rj',
            aliquotaDoFundoDeCombateAPobreza: 0.01,
            dataDeEmissao: new Date(2019, 0, 1),
            eOptantePeloSimples: false,
            produtoEmRegimeDeSt: false,
            produtoImportado: false
        });

        test.equal(resultado, null);
        test.done();
    },

    'Retorna nulo caso destinatario seja contribuinte': function(test) {
       var resultado = difal({
            baseDeCalculo: 100,
            consumidorFinal: true,
            eContribuinte: true,
            estadoDeOrigem: 'sp',
            estadoDeDestino: 'rj',
            aliquotaDoFundoDeCombateAPobreza: 0.01,
            dataDeEmissao: new Date(2019, 0, 1),
            eOptantePeloSimples: false,
            produtoEmRegimeDeSt: false,
            produtoImportado: false
        });

        test.equal(resultado, null);
        test.done();
    },

    'Retorna nulo caso seja operacao intraestadual': function(test) {
       var resultado = difal({
            baseDeCalculo: 100,
            consumidorFinal: true,
            eContribuinte: false,
            estadoDeOrigem: 'sp',
            estadoDeDestino: 'sp',
            aliquotaDoFundoDeCombateAPobreza: 0.01,
            dataDeEmissao: new Date(2019, 0, 1),
            eOptantePeloSimples: false,
            produtoEmRegimeDeSt: false,
            produtoImportado: false
        });

        test.equal(resultado, null);
        test.done();
    },

    'Retorna nulo caso seja operacao anterior a 2016': function(test) {
       var resultado = difal({
            baseDeCalculo: 100,
            consumidorFinal: true,
            eContribuinte: false,
            estadoDeOrigem: 'sp',
            estadoDeDestino: 'sp',
            aliquotaDoFundoDeCombateAPobreza: 0.01,
            dataDeEmissao: new Date(2015, 0, 1),
            eOptantePeloSimples: false,
            produtoEmRegimeDeSt: false,
            produtoImportado: false
        });

        test.equal(resultado, null);
        test.done();
    },
};