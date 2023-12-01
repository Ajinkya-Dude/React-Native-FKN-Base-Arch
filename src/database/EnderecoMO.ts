import { deleteEndereco, insertEndereco } from "./EnderecoDao";

const EnderecoModalHelper = (data: any, realm: any,loginData:any) => {
    const type = typeof data;
    const dataNotFound = (data && data.FKN && data.FKN.Processamento && data.FKN.Processamento.codigoRetorno);
    console.log("not found data",dataNotFound , "type of",typeof dataNotFound,"dataNotFound === 2",dataNotFound === 2);
    if (!(dataNotFound === 2)) {
        if (dataNotFound != null && dataNotFound === 22) {
            deleteEndereco(realm);
        }
    }
    else {
        const Data = data && data.FKN && data.FKN.enderecos && data.FKN.enderecos?.[0] && data.FKN.enderecos?.[0].endereco;
        deleteEndereco(realm);
        insertEndereco(Data,realm,loginData);
    }
    console.log("type of data", type, data);
}

export default EnderecoModalHelper;