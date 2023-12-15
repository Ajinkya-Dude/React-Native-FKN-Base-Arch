import { deleteParametro, insertParametro } from "./ParametroDao";

const ParametroModalHelper = (data: any, realm: any) => {
    const dataNotFound = (data && data.FKN && data.FKN.Processamento && data.FKN.Processamento.codigoRetorno);
    if (!(dataNotFound === 2)) {
        if (dataNotFound != null && dataNotFound === 22) {
            deleteParametro(realm);
        }
    }
    else {
        const Data = data && data.FKN && data.FKN.parametros && data.FKN.parametros?.[0] && data.FKN.parametros?.[0].parametro;
        deleteParametro(realm);
        insertParametro(Data,realm);
    }
}

export default ParametroModalHelper;