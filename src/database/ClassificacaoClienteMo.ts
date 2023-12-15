import { deleteClassificacoCliente, insertClassificacaoCliente } from "./ClassificacaoClienteDao";

const ClassificacaoClienteModalHelper = (data: any, realm: any,loginData:any) => {
    
    const type = typeof data;
    const dataNotFound = (data && data.FKN && data.FKN.Processamento && data.FKN.Processamento.codigoRetorno);
    if (!(dataNotFound === 2)) {
        if (dataNotFound != null && dataNotFound === 22) {
            deleteClassificacoCliente(realm);
        }
    }
    else {
        const Data = data && data.FKN && data.FKN.classificacoesClientes && data.FKN.classificacoesClientes?.[0] && data.FKN.classificacoesClientes?.[0].classificacaoCliente;
        deleteClassificacoCliente(realm);
        insertClassificacaoCliente(Data,realm,loginData);
    }
}

export default ClassificacaoClienteModalHelper;