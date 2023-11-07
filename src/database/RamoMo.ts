import { deleteRamo, insertRamo } from "./RamoDao";

const RamoModalHelper = (data: any, realm: any,loginData:any) => {
    const type = typeof data;
    const dataNotFound = (data && data.FKN && data.FKN.Processamento && data.FKN.Processamento.codigoRetorno);
    console.log("not found data",dataNotFound , "type of",typeof dataNotFound,"dataNotFound === 2",dataNotFound === 2);
    if (!(dataNotFound === 2)) {
        if (dataNotFound != null && dataNotFound === 22) {
            deleteRamo(realm);
        }
    }
    else {
        const dataRamo = data && data.FKN && data.FKN.ramos && data.FKN.ramos?.[0] && data.FKN.ramos?.[0].ramo;
        deleteRamo(realm);
        insertRamo(dataRamo,realm,loginData);
    }
    console.log("type of data", type, data);
}

export default RamoModalHelper;