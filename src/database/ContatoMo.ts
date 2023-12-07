import { deleteContato, insertContato } from "./ContatoDao";

const ContatoModalHelper = (data: any, realm: any,loginData:any) => {
    const type = typeof data;
    const dataNotFound = (data && data.FKN && data.FKN.Processamento && data.FKN.Processamento.codigoRetorno);
    if (!(dataNotFound === 2)) {
        if (dataNotFound != null && dataNotFound === 22) {
            deleteContato(realm);
        }
    }
    else {
        const dataRamo = data && data.FKN && data.FKN.contatos && data.FKN.contatos?.[0] && data.FKN.contatos?.[0].contato;
        deleteContato(realm);
        insertContato(dataRamo,realm,loginData);
    }
}

export default ContatoModalHelper;