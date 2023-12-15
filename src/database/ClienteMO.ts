import { deleteCliente, insertCliente } from "./ClienteDao";

const ClienteModalHelper = (data: any, realm: any,loginData:any) => {
    const type = typeof data;
    const dataNotFound = (data && data.FKN && data.FKN.Processamento && data.FKN.Processamento.codigoRetorno);
    if (!(dataNotFound === 2)) {
        if (dataNotFound != null && dataNotFound === 22) {
            deleteCliente(realm);
        }
    }
    else {
        const dataCliente = data && data.FKN && data.FKN.clientes && data.FKN.clientes?.[0] && data.FKN.clientes?.[0].cliente;
        deleteCliente(realm);
        insertCliente(dataCliente,realm,loginData);
    }
}

export default ClienteModalHelper;