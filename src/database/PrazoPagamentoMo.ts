import { deletePrazoPagamento, insertPrazoPagamento } from "./PrazoPagamentoDao";

const PrazoPagamentoModalHelper = (data: any, realm: any,loginData:any) => {
    const type = typeof data;
    const dataNotFound = (data && data.FKN && data.FKN.Processamento && data.FKN.Processamento.codigoRetorno);
    console.log("not found data",dataNotFound , "type of",typeof dataNotFound,"dataNotFound === 2",dataNotFound === 2);
    if (!(dataNotFound === 2)) {
        if (dataNotFound != null && dataNotFound === 22) {
            deletePrazoPagamento(realm);
        }
    }
    else {
        const dataRamo = data && data.FKN && data.FKN.prazos && data.FKN.prazos?.[0] && data.FKN.prazos?.[0].prazo;
        deletePrazoPagamento(realm);
        insertPrazoPagamento(dataRamo,realm,loginData);
    }
    console.log("type of data", type, data);
}

export default PrazoPagamentoModalHelper;