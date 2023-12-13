import { deleteSituacao, insertSituacao } from "./SituacaoDao";

const SituacaoModalHelper = (data: any, realm: any,loginData:any) => {
    const type = typeof data;
    const dataNotFound = (data && data.FKN && data.FKN.Processamento && data.FKN.Processamento.codigoRetorno);
    console.log("not found data",dataNotFound , "type of",typeof dataNotFound,"dataNotFound === 2",dataNotFound === 2);
    if (!(dataNotFound === 2)) {
        if (dataNotFound != null && dataNotFound === 22) {
            deleteSituacao(realm);
        }
    }
    else {
        const dataSituacao = data && data.FKN && data.FKN.situacoes && data.FKN.situacoes?.[0] && data.FKN.situacoes?.[0].situacao;
        deleteSituacao(realm);
        const returnValue = insertSituacao(dataSituacao,realm,loginData);
        console.log("type of data-----return value",returnValue);
    }
    console.log("type of data", type, data);
}

export default SituacaoModalHelper;