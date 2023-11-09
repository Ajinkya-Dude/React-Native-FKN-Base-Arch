import { deleteTransportador, insertTransportador } from "./TransportadoraDao";


const TransportadorModalHelper = (data: any, realm: any,loginData:any) => {
    const type = typeof data;
    const dataNotFound = (data && data.FKN && data.FKN.Processamento && data.FKN.Processamento.codigoRetorno);
    console.log("not found data",dataNotFound , "type of",typeof dataNotFound,"dataNotFound === 2",dataNotFound === 2);
    if (!(dataNotFound === 2)) {
        if (dataNotFound != null && dataNotFound === 22) {
            deleteTransportador(realm);
        }
    }
    else {
        const dataRamo = data && data.FKN && data.FKN.transportadoras && data.FKN.transportadoras?.[0] && data.FKN.transportadoras?.[0].transportadora;
        deleteTransportador(realm);
        insertTransportador(dataRamo,realm,loginData);
    }
    console.log("type of data", type, data);
}

export default TransportadorModalHelper;