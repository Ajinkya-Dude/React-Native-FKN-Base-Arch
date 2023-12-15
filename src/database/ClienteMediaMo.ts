import { deleteClienteMedia, insertClienteMedia } from "./ClienteMediaDao";

const ClienteMediaModalHelper = (data: any, realm: any,loginData:any) => {
    const type = typeof data;
    const dataNotFound = (data && data.FKN && data.FKN.Processamento && data.FKN.Processamento.codigoRetorno);
    if (!(dataNotFound === 2)) {
        if (dataNotFound != null && dataNotFound === 22) {
            deleteClienteMedia(realm);
        }
    }
    else {
        const dataCliente = data && data.FKN && data.FKN.clienteMedias && data.FKN.clienteMedias?.[0] && data.FKN.clienteMedias?.[0].clienteMedia;
        deleteClienteMedia(realm);
        insertClienteMedia(dataCliente,realm,loginData);
    }
}

export default ClienteMediaModalHelper;