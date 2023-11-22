import Realm from 'realm';
const generateClientePayload = (data: any) => {
    const clienteData = [];
    for (const item of data) {
        clienteData.push({
            _id: new Realm.BSON.ObjectId(),
            idClienteWeb: item.idClienteWeb,
            idCliente: item.idCliente,
            razaoSocial: item.razaoSocial,
            fantasia: item.fantasia,
            tipo: item.tipo.toString(),
            cpfCnpj: item.cpfCnpj,
            rgIe: item.rgIe.toString(),
            atualizado: item.atualizado ? 1 : 0,
            telefone: item.telefone ? item.telefone.toString():null,
            celular: item.celular,
            fax: item.fax ? item.fax.toString() : null,
            email: item.email,
            emailNfe: item.emailNfe,
            obsCadastral: item.obsCadastral,
            dtCadastro: item.dtCadastro,
            cnae: item.cnae.toString(),
            permiteAltPortador: item.permiteAltPortador ? 1 : 0,
            permiteAltPrazoPgto: item.permiteAltPrazoPgto ? 1 : 0,
            novoCadastro: item.novoCadastro ? 1 : 0,
            idRamoFK: item.idRamo ? item.idRamo : 0,
            idRegiaoFK: item.idRegiao ? item.idRegiao : 0,
            idSituacaoFK: item.idSituacao,
            idPortadorFK: item.idPortador ? item.idPortador : 0,
            idPrazoPagamentoFK: item.idPrazoPagamento ? item.idPrazoPagamento : 0,
            idVendedor: item.idVendedorWeb ? item.idVendedorWeb : 0,
            idEmpresaFK: item.idEmpresa,
            tabelaPadrao: item.tabelaPadrao ? item.tabelaPadrao : null,
            enviado: 1,
            idTransportadoraFK: item.idTransportadora ? item.idTransportadora : 0,
            idSegmentoFK: item.idSegmento ? item.idSegmento : 0,
            idClassificacaoFK: item.idClassificacaoFK ? item.idClassificacaoFK : 0,
            dtFundacao: item.dtFundacao,
            dtUltOrc: item.dtUltOrc,
            dtUltVen: item.dtUltVen,
            dtUltCon: item.dtUltCon,
            idProspeccaoFK: item.idProspeccaoFK ? item.idProspeccaoFK : 0,
        })
    }
    return clienteData;
}


const insertCliente = (data: any, realm: any) => {
    const clientData = generateClientePayload(data);
    try {
        realm.write(() => {
            for (const item of clientData) {
                realm.create('cliente', item);
            }
        })
        return 1
    } catch (error) {
        console.log("Create Cliente error", error);
        return 0
    }
}
const insertSingleCliente = (item: any, realm: any) => {
    console.log("insertSingleCliente payload",item);
    
    const data = {
        _id: new Realm.BSON.ObjectId(),
        idClienteWeb: item.idClienteWeb,
        idCliente: item.idCliente,
        razaoSocial: item.razaoSocial,
        fantasia: item.fantasia,
        tipo: item.tipo.toString(),
        cpfCnpj: item.cpfCnpj,
        rgIe: item.rgIe.toString(),
        atualizado: item.atualizado ? 1 : 0,
        telefone: item.telefone ? item.telefone.toString():null,
        celular: item.celular,
        fax: item.fax ? item.fax.toString() : null,
        email: item.email,
        emailNfe: item.emailNfe,
        obsCadastral: item.obsCadastral ? item.obsCadastral : null,
        dtCadastro: item.dtCadastro,
        cnae: item.cnae.toString(),
        permiteAltPortador: item.permiteAltPortador ? 1 : 0,
        permiteAltPrazoPgto: item.permiteAltPrazoPgto ? 1 : 0,
        novoCadastro: item.novoCadastro ? 1 : 0,
        idRamoFK: item.idRamo ? item.idRamo : 0,
        idRegiaoFK: item.idRegiao ? item.idRegiao : 0,
        idSituacaoFK: item.idSituacao,
        idPortadorFK: item.idPortador ? item.idPortador : 0,
        idPrazoPagamentoFK: item.idPrazoPagamento ? item.idPrazoPagamento : 0,
        idVendedor: item.idVendedorWeb ? item.idVendedorWeb : 0,
        idEmpresaFK: item.idEmpresa,
        tabelaPadrao: item.tabelaPadrao ? item.tabelaPadrao : null,
        enviado: item.enviar ? 1 : 0,
        idTransportadoraFK: item.idTransportadora ? item.idTransportadora : 0,
        idSegmentoFK: item.idSegmento ? item.idSegmento : 0,
        idClassificacaoFK: item.idClassificacaoFK ? item.idClassificacaoFK : 0,
        dtFundacao: item.dtFundacao ?item.dtFundacao : null,
        dtUltOrc: item.dtUltOrc ?item.dtUltOrc : null,
        dtUltVen: item.dtUltVen ? item.dtUltVen : null,
        dtUltCon: item.dtUltCon ? item.dtUltCon : null,
        idProspeccaoFK: item.idProspeccaoFK ? item.idProspeccaoFK : 0,
    }
    console.log("AFter processing payload for cliente",data);
    
    try {
        realm.write(() => {
                realm.create('cliente', data);
        })
        return 1
    } catch (error) {
        console.log("Create Cliente error", error);
        return 0
    }
}
const deleteCliente = (realm: any) => {
    console.log("deleteCliente called");
    try {
        realm.write(() => {
            const allClientes = realm.objects('cliente');
            realm.delete(allClientes);
        })
        return 1
    } catch (error) {
        console.log("Delete Cliente error", error);
        return 0
    }
}

export {
    insertCliente,
    deleteCliente,
    insertSingleCliente
}