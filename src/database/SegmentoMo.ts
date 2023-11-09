import { deleteSegmento, insertSegmento } from "./SegmentoDao";

const SegmentoModalHelper = (data: any, realm: any,loginData:any) => {
    const type = typeof data;
    const dataNotFound = (data && data.FKN && data.FKN.Processamento && data.FKN.Processamento.codigoRetorno);
    console.log("not found data",dataNotFound , "type of",typeof dataNotFound,"dataNotFound === 2",dataNotFound === 2);
    if (!(dataNotFound === 2)) {
        if (dataNotFound != null && dataNotFound === 22) {
            console.log("type of data 1----", type, data);
            deleteSegmento(realm);
        }
    }
    else {
        console.log("type of data 2", type, data);
        const dataRamo = data && data.FKN && data.FKN.segmentos && data.FKN.segmentos?.[0] && data.FKN.segmentos?.[0].segmento;
        deleteSegmento(realm);
        insertSegmento(dataRamo,realm,loginData);
    }
}

export default SegmentoModalHelper;