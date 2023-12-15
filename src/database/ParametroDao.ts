const generatePayload = (item: any) => {
    const portadorData = [];
    // for (const item of data) {
        portadorData.push({
            idParametro: item.idParametro,
            separacao_um: item.nomeSepUm,
            separacao_dois: item.nomeSepDois,
            permItensSemEstoque: item.permItensSemEstoque ? 1 : 0,//boolean
            idSituacao: item.idSituacao,
            tabelaPadrao: item.tabelaPadrao,
            faixaPadrao: item.faixaPadrao ? item.faixaPadrao : 0,
            unicaFaixa: item.unicaFaixa ? 1 : 0,//boolean
            permiteDesconto: item.permiteDesconto ? 1 : 0,//boolean
            permiteAcrescimo: item.permiteAcrescimo ? 1 : 0,//boolean
            percMaxDesconto: item.percMaxDesconto,
            percMaxAcrescimo: item.percMaxAcrescimo,
            valorMinimoPedido: item.valorMinimoPedido,
            bloqPedidosAtraso: item.bloqPedidosAtraso ? 1 : 0,//boolean
            diasAtrasoBloqPed: item.diasAtrasoBloqPed,
            precoFilial: item.precoFilial ? 1 : 0,//boolean
            permiteHistGeralCompra: item.histGeralCompra ? 1 : 0,//boolean
            fazOrcamento: item.fazOrcamento ? 1 : 0,//boolean
            permAltTabela: item.permAltTabela ? 1 : 0,//boolean
            permAltFaixa: item.permAltFaixa ? 1 : 0,//boolean
            margemMaxItemPedido: item.margemMaxItemPedido,
            margemMinItemPedido: item.margemMinItemPedido,
            margemMinTb: item.margemMinTb,
            validadeOrcamento: item.validadeOrcamento,
            idPrazoPadrao: item.idPrazoPadrao,
            idPortadorPadrao: item.idPortadorPadrao,
            maxProgDiasData: item.maxProgDiasData,
            minutaEmbarque: item.minutaEmbarque ? 1 : 0,//boolean
            ocultarSelFaixa: item.ocultarSelFaixa ? 1 : 0,//boolean
            ocultarObsCadCliente: item.ocultarObsCadCliente ? 1 : 0,//boolean
            qtdeInteira: item.qtdeInteira ? 1 : 0,//boolean
            modOrdemServico: item.modOrdemServico ? 1 : 0,//boolean
            ultCompras: item.ultCompras ? 1 : 0,//boolean
            idTransportadoraPadrao: item.idTransportadoraPadrao ? item.idTransportadoraPadrao : 0,
            exibeSitPro: item.exibeSitPro ? 1 : 0,//boolean
            exibeMaxDesc: item.exibeMaxDesc ? 1 : 0,//boolean
            idClassificacaoPadrao: item.idClassificacaoPadrao ? item.idClassificacaoPadrao : 0,
            validaCpfCnpj: item.validaCpfCnpj ? 1 : 0,//boolean
            permViewCusto: item.permViewCusto ? 1 : 0,//boolean
            bloqCadCliente: item.bloqCadCliente ? 1 : 0,//boolean
            limitarDescAcresTab: item.limitarDescAcresTab ? 1 : 0,//boolean
            ambosCabecalho: item.ambosCabecalho ? item.ambosCabecalho : 0,
            considerarVenda: item.considerarVenda ? item.considerarVenda : 0,
            graficoOriginalResponsavel: item.graficoOriginalResponsavel ? item.graficoOriginalResponsavel : 0,
            alertaDuplicata: item.alertaDuplicata ? 1 : 0, // boolean
            permAltSmtp: item.permAltSmtp ? 1 : 0, // boolean
            idSmtp: item.idSmtp ? item.idSmtp : 0,
            situacaoClientesGrafico: item.situacaoClientesGrafico ? item.situacaoClientesGrafico : 0,
            forcarSmtp: item.forcarSmtp ? 1 : 0, // boolean
            permAltPortadorPrazo: item.permAltPortadorPrazo ? 1 : 0, // boolean
            permDescPed: item.permDescPed ? 1 : 0, // boolean
            vlrMaxDescPed: item.vlrMaxDescPed,
            diasNovaSync: item.diasNovaSync,
            verMargem: item.verMargem,
            permMultProd: item.permMultProd ? 1 : 0, // boolean
            sitClienteAlertaPed: item.sitClienteAlertaPed,
            msgClienteAlertaPed: item.msgClienteAlertaPed,
            emailAlertaPed: item.emailAlertaPed ? 1 : 0, // boolean
            viewCliMedias: item.viewCliMedias ? 1 : 0, // boolean
            exibeComplPro: item.exibeComplPro ? 1 : 0, // boolean
            sitAgrupPadrao: item.sitAgrupPadrao ? item.sitAgrupPadrao : 'GERAL',
            exibeCoresIndCliente: item.exibeCoresIndCliente ? 1 : 0, // boolean
            diasToleranciaIndCliente: item.diasToleranciaIndCliente ? item.diasToleranciaIndCliente : 0,
            bloqAtuCliente: item.bloqAtuCliente ? 1 : 0, // boolean
            bloqTransfCliente: item.bloqTransfCliente ? 1 : 0, // boolean
            permAltCfop: item.permAltCfop ? 1 : 0, // boolean
            agrupEstFil: item.agrupEstFil ? 1 : 0, // boolean
            permiteMensagensAlerta: item.permiteAlertaMensagemSif ? 1 : 0, // boolean
            restringeViewSaldoProduto: item.restringeViewSaldoProduto ? 1 : 0, // boolean
            importarPreco: item.importarPreco ? 1 : 0, // boolean
            importarQuantidade: item.importarQuantidade ? 1 : 0, // boolean
        })
    //}
    return portadorData;
}


const insertParametro= (data: any, realm: any) => {
    console.log("Calling insert insertParametro",data);
    
    const portadorData = generatePayload(data);
    console.log("insertParametro",portadorData);
    
    try {
        realm.write(() => {
            for (const item of portadorData) {
                realm.create('parametro', item);
            }
        })
        console.log("Create parametro success");
        return 1
    } catch (error) {
        console.log("Create parametro error", error);
        return 0
    }
}
const deleteParametro = (realm: any) => {
    console.log("deleteParametro called");
    try {
        realm.write(() => {
            const all = realm.objects('parametro');
            realm.delete(all);
        })
        return 1
    } catch (error) {
        console.log("Delete parametro error", error);
        return 0
    }
}

export {
    insertParametro,
    deleteParametro
}