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

    // TODO: Descobrir a respeito da aliquota de 4% para produtos importados (se aplica a não contribuinte)

    if(!consumidorFinal || eContribuinte || estadoDeOrigem === estadoDeDestino) {
        return null;
    }

    var aliquotaInterestadual = icms(estadoDeOrigem, estadoDeDestino),
        aliquotaInternaNoDestino = icms(estadoDeDestino),
        partilha = obterAliquotaDePartilha(dataDeEmissao.getFullYear());

    if(!partilha) {
        return null;
    }

    var icmsOrigem = baseDeCalculo.times(aliquotaInterestadual / 100),
        difal = baseDeCalculo.times(aliquotaInternaNoDestino / 100).minus(icmsOrigem);

    return {
        baseDeCalculo: baseDeCalculo,
        icmsOrigem: icmsOrigem.valueOf(),
        icmsDifalOrigem: difal.times(partilha.origem).valueOf(),
        icmsDifalDestino: difal.times(partilha.destino).valueOf(),
        aliquotaDoFundoDeCombateAPobreza: aliquotaDoFundoDeCombateAPobreza * 100,
        fundoDeCombateAPobreza: baseDeCalculo.times(aliquotaDoFundoDeCombateAPobreza).valueOf(),
        aliquotaInternaNoDestino: aliquotaInternaNoDestino,
        aliquotaInterestadual: aliquotaInterestadual,
        partilha: {
            origem: partilha.origem * 100,
            destino: partilha.destino * 100
        }
    };
}

module.exports = difal;