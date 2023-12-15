import Realm, { ObjectSchema } from 'realm';

class ParametroSchema extends Realm.Object<ParametroSchema> {
    idParametro!:number;
    separacao_um?: string;
    separacao_dois?: string;
    permItensSemEstoque?: number;//boolean
    idSituacao?: number;
    tabelaPadrao?: string;
    faixaPadrao?: number;
    unicaFaixa?: number;//boolean
    permiteDesconto?: number;//boolean
    permiteAcrescimo?: number;//boolean
    percMaxDesconto?: number;
    percMaxAcrescimo?: number;
    valorMinimoPedido?: number;
    bloqPedidosAtraso?: number;//boolean
    diasAtrasoBloqPed?: number;
    precoFilial?: number;//boolean
    permiteHistGeralCompra?: number;//boolean
    fazOrcamento?: number;//boolean
    permAltTabela?: number;//boolean
    permAltFaixa?: number;//boolean
    margemMaxItemPedido?: number;
    margemMinItemPedido?: number;
    margemMinTb?: number;
    validadeOrcamento?: number;
    idPrazoPadrao?: number;
    idPortadorPadrao?: number;
    maxProgDiasData?: number;
    minutaEmbarque?: number;//boolean
    ocultarSelFaixa?: number;//boolean
    ocultarObsCadCliente?: number;//boolean
    qtdeInteira?: number;//boolean
    modOrdemServico?: number;//boolean
    ultCompras?: number;//boolean
    idTransportadoraPadrao?: number;
    exibeSitPro?: number;//boolean
    exibeMaxDesc?: number;//boolean
    idClassificacaoPadrao?: number;
    validaCpfCnpj?: number;//boolean
    permViewCusto?: number;//boolean
    bloqCadCliente?: number;//boolean
    limitarDescAcresTab?: number;//boolean
    ambosCabecalho?: number;
    considerarVenda?: number;
    graficoOriginalResponsavel?: number;
    alertaDuplicata?: number; // boolean
    permAltSmtp?: number; // boolean
    idSmtp?: number;
    situacaoClientesGrafico?: number;
    forcarSmtp?: number; // boolean
    permAltPortadorPrazo?: number; // boolean
    permDescPed?: number; // boolean
    vlrMaxDescPed?: number;
    diasNovaSync?: number;
    verMargem?: number;
    permMultProd?: number; // boolean
    sitClienteAlertaPed?: number;
    msgClienteAlertaPed?: string;
    emailAlertaPed?: number; // boolean
    viewCliMedias?: number; // boolean
    exibeComplPro?: number; // boolean
    sitAgrupPadrao?: string;
    exibeCoresIndCliente?: number; // boolean
    diasToleranciaIndCliente?: number;
    bloqAtuCliente?: number; // boolean
    bloqTransfCliente?: number; // boolean
    permAltCfop?: number; // boolean
    agrupEstFil?: number; // boolean
    permiteMensagensAlerta?: number; // boolean
    restringeViewSaldoProduto?: number; // boolean
    importarPreco?: number; // boolean
    importarQuantidade?: number; // boolean

    static schema: ObjectSchema = {
        name: 'parametro',
        primaryKey: 'idParametro',
        properties: {
            idParametro:{type:'int',indexed:true},
            separacao_um: { type: 'string', optional: true },
            separacao_dois: { type: 'string', optional: true },
            permItensSemEstoque: { type: 'int', optional: true },
            idSituacao: { type: 'int', optional: true },
            tabelaPadrao: { type: 'string', optional: true },
            faixaPadrao: { type: 'int', optional: true },
            unicaFaixa: { type: 'int', optional: true },
            permiteDesconto: { type: 'int', optional: true },
            permiteAcrescimo: { type: 'int', optional: true },
            percMaxDesconto: { type: 'float', optional: true },
            percMaxAcrescimo: { type: 'float', optional: true },
            valorMinimoPedido: { type: 'float', optional: true },
            bloqPedidosAtraso: { type: 'int', optional: true },
            diasAtrasoBloqPed: { type: 'int', optional: true },
            precoFilial: { type: 'int', optional: true },
            permiteHistGeralCompra: { type: 'int', optional: true },
            fazOrcamento: { type: 'int', optional: true },
            permAltTabela: { type: 'int', optional: true },
            permAltFaixa: { type: 'int', optional: true },
            margemMaxItemPedido: { type: 'float', optional: true },
            margemMinItemPedido: { type: 'float', optional: true },
            margemMinTb: { type: 'float', optional: true },
            validadeOrcamento: { type: 'int', optional: true },
            idPrazoPadrao: { type: 'int', optional: true },
            idPortadorPadrao: { type: 'int', optional: true },
            maxProgDiasData: { type: 'int', optional: true },
            minutaEmbarque: { type: 'int', optional: true },
            ocultarSelFaixa: { type: 'int', optional: true },
            ocultarObsCadCliente: { type: 'int', optional: true },
            qtdeInteira: { type: 'int', optional: true },
            modOrdemServico: { type: 'int', optional: true },
            ultCompras: { type: 'int', optional: true },
            idTransportadoraPadrao: { type: 'int', optional: true },
            exibeSitPro: { type: 'int', optional: true },
            exibeMaxDesc: { type: 'int', optional: true },
            idClassificacaoPadrao: { type: 'int', optional: true },
            validaCpfCnpj: { type: 'int', optional: true },
            permViewCusto: { type: 'int', optional: true },
            bloqCadCliente: { type: 'int', optional: true },
            limitarDescAcresTab: { type: 'int', optional: true },
            ambosCabecalho: { type: 'int', optional: true },
            considerarVenda: { type: 'int', optional: true },
            graficoOriginalResponsavel: { type: 'int', optional: true },
            alertaDuplicata: { type: 'int', optional: true },
            permAltSmtp: { type: 'int', optional: true },
            idSmtp: { type: 'int', optional: true },
            situacaoClientesGrafico: { type: 'int', optional: true },
            forcarSmtp: { type: 'int', optional: true },
            permAltPortadorPrazo: { type: 'int', optional: true },
            permDescPed: { type: 'int', optional: true },
            vlrMaxDescPed: { type: 'float', optional: true },
            diasNovaSync: { type: 'int', optional: true },
            verMargem: { type: 'int', optional: true },
            permMultProd: { type: 'int', optional: true },
            sitClienteAlertaPed: { type: 'int', optional: true },
            msgClienteAlertaPed: { type: 'string', optional: true },
            emailAlertaPed: { type: 'int', optional: true },
            viewCliMedias: { type: 'int', optional: true },
            exibeComplPro: { type: 'int', optional: true },
            sitAgrupPadrao: { type: 'string', optional: true },
            exibeCoresIndCliente: { type: 'int', optional: true },
            diasToleranciaIndCliente: { type: 'int', optional: true },
            bloqAtuCliente: { type: 'int', optional: true },
            bloqTransfCliente: { type: 'int', optional: true },
            permAltCfop: { type: 'int', optional: true },
            agrupEstFil: { type: 'int', optional: true },
            permiteMensagensAlerta: { type: 'int', optional: true },
            restringeViewSaldoProduto: { type: 'int', optional: true },
            importarPreco: { type: 'int', optional: true },
            importarQuantidade: { type: 'int', optional: true },
        },
    };
}

export default ParametroSchema;
