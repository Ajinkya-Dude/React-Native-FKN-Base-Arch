import { deletePrecoFilial } from "./PrecoFilialDao";
import { deleteProduto, insertProduto } from "./ProdutoDao";
import { deleteSaldoFilial } from "./SaldoFilialDao";

const ProdutoModalHelper = (data: any, realm: any,loginData:any) => {
    const type = typeof data;
    const dataNotFound = (data && data.FKN && data.FKN.Processamento && data.FKN.Processamento.codigoRetorno);
    console.log("not found data",dataNotFound , "type of",typeof dataNotFound,"dataNotFound === 2",dataNotFound === 2);
    if (!(dataNotFound === 2)) {
        if (dataNotFound != null && dataNotFound === 22) {
            deleteProduto(realm);
        }
    }
    else {
        const dataRamo = data && data.FKN && data.FKN.produtos && data.FKN.produtos?.[0] && data.FKN.produtos?.[0].produto;
        deleteProduto(realm);
        deletePrecoFilial(realm);
        deleteSaldoFilial(realm);
        insertProduto(dataRamo,realm,loginData);
    }
    console.log("type of data", type, data);
}

export default ProdutoModalHelper;