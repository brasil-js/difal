var Money = require('bigmoney.js'),
    icms = require('icms');

function obterAliquotaDePartilha(ano) {
    if(ano < 2016) {
        return null;
    }

    return {
        2016: { origem: 0.6, destino: 0.4 },
        2017: { origem: 0.4, destino: 0.6 },
        2018: { origem: 0.2, destino: 0.8 }
    }[ano] || { origem: 0, destino: 1 };
}

function difal(parametros) {
    var baseDeCalculo = new Money(parametros.baseDeCalculo),
        consumidorFinal = parametros.consumidorFinal,
        eContribuinte = parametros.eContribuinte,
        estadoDeOrigem = parametros.estadoDeOrigem && parametros.estadoDeOrigem.toLowerCase(),
        estadoDeDestino = parametros.estadoDeDestino && parametros.estadoDeDestino.toLowerCase(),
        aliquotaDoFundoDeCombateAPobreza = parametros.aliquotaDoFundoDeCombateAPobreza,
        dataDeEmissao = parametros.dataDeEmissao,
        eOptantePeloSimples = parametros.eOptantePeloSimples,
        produtoEmRegimeDeSt = parametros.produtoEmRegimeDeSt,
        produtoImportado = parametros.produtoImportado;

    if(!consumidorFinal || eContribuinte || estadoDeOrigem === estadoDeDestino) {
        return null;
    }

    var aliquotaInterestadual = icms(estadoDeOrigem, estadoDeDestino) / 100,
        aliquotaInternaDestino = icms(estadoDeDestino) / 100,
        partilha = obterAliquotaDePartilha(dataDeEmissao.getFullYear());

    if(!partilha) {
        return null;
    }

    var icmsOrigem = baseDeCalculo.times(aliquotaInterestadual),
        difal = baseDeCalculo.times(aliquotaInternaDestino).minus(icmsOrigem);

    return {
        icmsOrigem: icmsOrigem.valueOf(),
        icmsDifalOrigem: difal.times(partilha.origem).valueOf(),
        icmsDifalDestino: difal.times(partilha.destino).valueOf(),
        fundoDeCombateAPobreza: baseDeCalculo.times(aliquotaDoFundoDeCombateAPobreza).valueOf()
    };
}

module.exports = difal;