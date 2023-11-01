import { deleteCliente, insertCliente } from "./ClienteDao";

const ClienteModalHelper = (data: any, realm: any) => {
    const type = typeof data;
    const dataNotFound = (data && data.FKN && data.FKN.Processamento && data.FKN.Processamento.codigoRetorno);
    console.log("not found data",dataNotFound , "type of",typeof dataNotFound,"dataNotFound === 2",dataNotFound === 2);
    if (!(dataNotFound === 2)) {
        if (dataNotFound != null && dataNotFound === 22) {
            deleteCliente(realm);
        }
    }
    else {
        const dataCliente = data && data.FKN && data.FKN.clientes && data.FKN.clientes?.[0] && data.FKN.clientes?.[0].cliente;
        deleteCliente(realm);
        insertCliente(dataCliente,realm);
    }
    console.log("type of data", type, data);
}

export default ClienteModalHelper;