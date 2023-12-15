import moment from "moment";
import { dateFormat } from "../../../../utils/globalFunctions";

export const SetPayload = ({
    fknIdCliente,
    razaoSocial,
    fantasia,
    tipo,
    cpfCnpj,
    rgIe,
    telefone,
    celular,
    fax,
    email,
    emailNfe,
    idFundacao,
    cnae,
    idRamo,
    idRegiao,
    idPortador,
    idPrazo,
    idTransportadora,
    idSegmento,
    idClienteWeb,
    idCliente,
    atualizado,
    obsCadastro,
    dataCadastro,
    permiteAltPortador,
    permiteAltPrazoPgto,
    idSituacao,
    idProspeccaoFK,
    idEmpresa,
    vendedor,
    classificacao
}: any) => {

    // Extract day, month, and year
    //const dateFormat = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const [_, day, month, year] = idFundacao && idFundacao.match(dateFormat);

    let payload = {
        idClienteWeb:fknIdCliente,
        idCliente:fknIdCliente,
        razaoSocial: razaoSocial,
        fantasia: fantasia,
        tipo: tipo,
        cpfCnpj: cpfCnpj,
        telefone: telefone,
        celular: celular,
        fax: fax ? fax : '',
        email: email,
        emailNfe: emailNfe,
        obsCadastro: obsCadastro ? obsCadastro : '',
        dtCadastro: dataCadastro ? dataCadastro : moment(new Date()).format('yyyy-MM-DD HH:mm:ss'),
        atualizado: atualizado === true ? 1 : 0,
        cnae: cnae,
        permiteAltPortador: permiteAltPortador ? 1 : 0,
        permiteAltPrazoPgto: permiteAltPrazoPgto  ? 1 : 0,
        idRamo: idRamo ? idRamo : 0,
        idRegiao: idRegiao ? idRegiao : 0,
        idSituacao: idSituacao ? idSituacao : 1,
        idPortador: idPortador ? idPortador.idPortador : 0,
        idPrazo: idPrazo ? idPrazo.idPrazoPagamento : 0,
        idTransportadora: idTransportadora ? idTransportadora.idTransportadora : 0,
        idSegmento: idSegmento ? idSegmento.idSegmento : 0,
        idProspeccaoFK: idProspeccaoFK ? idProspeccaoFK : 0,
        idEmpresa: idEmpresa ? idEmpresa : null,
        vendedores: vendedor ? vendedor : 0,
        rgIe:rgIe,
        idClassificacaoFK:classificacao ? classificacao.idClassificacao : 0
    }
    // if(idClienteWeb){
    //     Object.assign(payload,{idClienteWeb:idClienteWeb})
    // }
    // if(idCliente){
    //     Object.assign(payload,{idCliente:idCliente})
    // }
    if (idFundacao) {
        Object.assign(payload, { dtFundacao: moment(new Date(year, month - 1, day)).format('yyyy-MM-DD HH:mm:ss') })
    }
    console.log("Payload under payload builder", payload);

    return payload;
}
