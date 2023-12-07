import { deleteDepartmento, insertDepartmento } from "./DepartmentoDao";

const DepartmentoModalHelper = (data: any, realm: any,loginData:any) => {
    const type = typeof data;
    const dataNotFound = (data && data.FKN && data.FKN.Processamento && data.FKN.Processamento.codigoRetorno);
    console.log("not found data",dataNotFound , "type of",typeof dataNotFound,"dataNotFound === 2",dataNotFound === 2);
    if (!(dataNotFound === 2)) {
        if (dataNotFound != null && dataNotFound === 22) {
            deleteDepartmento(realm);
        }
    }
    else {
        const dataCliente = data && data.FKN && data.FKN.departamentos && data.FKN.departamentos?.[0] && data.FKN.departamentos?.[0].departamento;
        deleteDepartmento(realm);
        insertDepartmento(dataCliente,realm,loginData);
    }
    console.log("type of data", type, data);
}

export default DepartmentoModalHelper;