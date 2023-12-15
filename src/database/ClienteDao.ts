import moment from 'moment';
import Realm from 'realm';
const generateClientePayload = (data: any, loginData: any) => {
    const Data = [];
    if (data && data.length) {
        for (const item of data) {
            Data.push({
                _id: new Realm.BSON.ObjectId(),
                idClienteWeb: item.idClienteWeb,
                idCliente: item.idCliente,
                razaoSocial: item.razaoSocial,
                fantasia: item.fantasia,
                tipo: item.tipo.toString(),
                cpfCnpj: item.cpfCnpj,
                rgIe: item.rgIe.toString(),
                atualizado: item.atualizado ? 1 : 0,
                telefone: item.telefone ? item.telefone.toString() : null,
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
                idPrazoPagamentoFK: item.idPrazo ? item.idPrazo : 0,
                idVendedor: item.idVendedorWeb ? item.idVendedorWeb : 0,
                idEmpresaFK: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
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
    } else {
        Data.push({
            _id: new Realm.BSON.ObjectId(),
            idClienteWeb: data.idClienteWeb,
            idCliente: data.idCliente,
            razaoSocial: data.razaoSocial,
            fantasia: data.fantasia,
            tipo: data.tipo.toString(),
            cpfCnpj: data.cpfCnpj,
            rgIe: data.rgIe.toString(),
            atualizado: data.atualizado ? 1 : 0,
            telefone: data.telefone ? data.telefone.toString() : null,
            celular: data.celular,
            fax: data.fax ? data.fax.toString() : null,
            email: data.email,
            emailNfe: data.emailNfe,
            obsCadastral: data.obsCadastral ? data.obsCadastral : null,
            dtCadastro: data.dtCadastro,
            cnae: data.cnae.toString(),
            permiteAltPortador: data.permiteAltPortador ? 1 : 0,
            permiteAltPrazoPgto: data.permiteAltPrazoPgto ? 1 : 0,
            novoCadastro: data.novoCadastro ? 1 : 0,
            idRamoFK: data.idRamo ? data.idRamo : 0,
            idRegiaoFK: data.idRegiao ? data.idRegiao : 0,
            idSituacaoFK: data.idSituacao,
            idPortadorFK: data.idPortador ? data.idPortador : 0,
            idPrazoPagamentoFK: data.idPrazo ? data.idPrazo : 0,
            idVendedor: data.idVendedorWeb ? data.idVendedorWeb : 0,
            idEmpresaFK: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
            tabelaPadrao: data.tabelaPadrao ? data.tabelaPadrao : null,
            enviado: data.enviar ? 1 : 0,
            idTransportadoraFK: data.idTransportadora ? data.idTransportadora : 0,
            idSegmentoFK: data.idSegmento ? data.idSegmento : 0,
            idClassificacaoFK: data.idClassificacaoFK ? data.idClassificacaoFK : 0,
            dtFundacao: data.dtFundacao ? data.dtFundacao : null,
            dtUltOrc: data.dtUltOrc ? moment(data.dtUltOrc).format('yyyy-MM-DD HH:mm:ss') : null,
            dtUltVen: data.dtUltVen ? moment(data.dtUltVen).format('yyyy-MM-DD HH:mm:ss') : null,
            dtUltCon: data.dtUltCon ? moment(data.dtUltCon).format('yyyy-MM-DD HH:mm:ss') : null,
            idProspeccaoFK: data.idProspeccaoFK ? data.idProspeccaoFK : 0,
        })
    }
    return Data;
}


const insertCliente = (data: any, realm: any, loginData: any) => {
    const clientData = generateClientePayload(data, loginData);
    try {
        realm.write(() => {
            for (const item of clientData) {
                realm.create('cliente', item);
            }
        })
        return 1
    } catch (error) {
        return 0
    }
}
const insertSingleCliente = (item: any, realm: any, loginData: any) => {
    console.log("insertSingleCliente1", item);
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
        telefone: item.telefone ? item.telefone.toString() : null,
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
        idPrazoPagamentoFK: item.idPrazo ? item.idPrazo : 0,
        idVendedor: item.idVendedorWeb ? item.idVendedorWeb : 0,
        idEmpresaFK: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
        tabelaPadrao: item.tabelaPadrao ? item.tabelaPadrao : null,
        enviado: item.enviar ? 1 : 0,
        idTransportadoraFK: item.idTransportadora ? item.idTransportadora : 0,
        idSegmentoFK: item.idSegmento ? item.idSegmento : 0,
        idClassificacaoFK: item.idClassificacaoFK ? item.idClassificacaoFK : 0,
        dtFundacao: item.dtFundacao ? item.dtFundacao : null,
        dtUltOrc: item.dtUltOrc ? moment(item.dtUltOrc).format('yyyy-MM-DD HH:mm:ss') : null,
        dtUltVen: item.dtUltVen ? moment(item.dtUltVen).format('yyyy-MM-DD HH:mm:ss') : null,
        dtUltCon: item.dtUltCon ? moment(item.dtUltCon).format('yyyy-MM-DD HH:mm:ss') : null,
        idProspeccaoFK: item.idProspeccaoFK ? item.idProspeccaoFK : 0,
    }
    try {
        realm.write(() => {
            realm.create('cliente', data);
        })
        return 1
    } catch (error) {
        return 0
    }
}
const updateCliente = (data: any, realm: any, loginData: any) => {
    const results: any = realm.objects('cliente')
        .filtered('idEmpresaFK = $0 AND idClienteWeb = $1', data.idEmpresa, data.idClienteWeb);
    const Data: any = generateClientePayload(data, loginData);
    if (results.length > 0) {
        try {
            realm.write(() => {
                //results[idClienteWeb]: item.idClienteWeb,
                //idCliente: item.idCliente,
                results[0].razaoSocial = Data[0].razaoSocial;
                results[0].fantasia = Data[0].fantasia;
                //results[0].tipo= Data[0].tipo.toString();
                //results[0].cpfCnpj= Data[0].cpfCnpj;
                results[0].rgIe = Data[0].rgIe.toString();
                results[0].atualizado = Data[0].atualizado ? 1 : 0;
                results[0].telefone = Data[0].telefone ? Data[0].telefone.toString() : null;
                results[0].celular = Data[0].celular;
                results[0].fax = Data[0].fax ? Data[0].fax.toString() : null;
                results[0].email = Data[0].email;
                results[0].emailNfe = Data[0].emailNfe;
                results[0].obsCadastral = Data[0].obsCadastral ? Data[0].obsCadastral : null;
                results[0].dtCadastro = Data[0].dtCadastro;
                results[0].cnae = Data[0].cnae.toString();
                results[0].permiteAltPortador = Data[0].permiteAltPortador ? 1 : 0;
                results[0].permiteAltPrazoPgto = Data[0].permiteAltPrazoPgto ? 1 : 0;
                results[0].novoCadastro = Data[0].novoCadastro ? 1 : 0;
                results[0].idRamoFK = Data[0].idRamoFK ? Data[0].idRamoFK : 0;
                results[0].idRegiaoFK = Data[0].idRegiaoFK ? Data[0].idRegiaoFK : 0;
                results[0].idSituacaoFK = Data[0].idSituacaoFK;
                results[0].idPortadorFK = Data[0].idPortadorFK ? Data[0].idPortadorFK : 0;
                results[0].idPrazoPagamentoFK = Data[0].idPrazoPagamentoFK ? Data[0].idPrazoPagamentoFK : 0;
                results[0].idVendedor = Data[0].idVendedor ? Data[0].idVendedor : 0;
                //results[0].idEmpresaFK= loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa;
                results[0].tabelaPadrao = Data[0].tabelaPadrao ? Data[0].tabelaPadrao : null;
                results[0].enviado = Data[0].enviado ? 1 : 0;
                results[0].idTransportadoraFK = Data[0].idTransportadoraFK ? Data[0].idTransportadoraFK : 0;
                results[0].idSegmentoFK = Data[0].idSegmentoFK ? Data[0].idSegmentoFK : 0;
                results[0].idClassificacaoFK = Data[0].idClassificacaoFK ? Data[0].idClassificacaoFK : 0;
                results[0].dtFundacao = Data[0].dtFundacao ? Data[0].dtFundacao : null;
                results[0].dtUltOrc = Data[0].dtUltOrc ? moment(Data[0].dtUltOrc).format('yyyy-MM-DD HH:mm:ss') : null;
                results[0].dtUltVen = Data[0].dtUltVen ? moment(Data[0].dtUltVen).format('yyyy-MM-DD HH:mm:ss') : null;
                results[0].dtUltCon = Data[0].dtUltCon ? moment(Data[0].dtUltCon).format('yyyy-MM-DD HH:mm:ss') : null;
                results[0].idProspeccaoFK = Data[0].idProspeccaoFK ? Data[0].idProspeccaoFK : 0;
            })
            return 1
        } catch (error) {
            console.log("Error while updating cliente", error);
            return 0
        }
    }
    return 0;
}
const deleteCliente = (realm: any) => {
    try {
        realm.write(() => {
            const allClientes = realm.objects('cliente');
            realm.delete(allClientes);
        })
        return 1
    } catch (error) {
        return 0
    }
}

const cpfCnpjExists = (realm: any, cpfCnpj: any, idEmpresa: any) => {
    const results: any = realm.objects('cliente')
        .filtered('idEmpresaFK = $0 AND cpfCnpj = $1', idEmpresa, cpfCnpj);
    console.log("cpfCnpjExists---",results);
    if(results.length){
        return 1;
    }else{
        return 0
    }
}

export {
    insertCliente,
    deleteCliente,
    insertSingleCliente,
    updateCliente,
    cpfCnpjExists
}