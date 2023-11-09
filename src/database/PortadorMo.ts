import { deletePortador, insertPortador } from "./PortadorDao";

const PortadorModalHelper = (data: any, realm: any,loginData:any) => {
    const type = typeof data;
    const dataNotFound = (data && data.FKN && data.FKN.Processamento && data.FKN.Processamento.codigoRetorno);
    console.log("not found data",dataNotFound , "type of",typeof dataNotFound,"dataNotFound === 2",dataNotFound === 2);
    if (!(dataNotFound === 2)) {
        if (dataNotFound != null && dataNotFound === 22) {
            deletePortador(realm);
        }
    }
    else {
        const dataRamo = data && data.FKN && data.FKN.portadores && data.FKN.portadores?.[0] && data.FKN.portadores?.[0].portador;
        deletePortador(realm);
        insertPortador(dataRamo,realm,loginData);
    }
    console.log("type of data", type, data);
}

export default PortadorModalHelper;