import { deleteTabela, insertTabela } from "./TabelaDao";
import { deleteTabelaFaixa } from "./TabelaFaixaDao";

const TabelaModalHelper = (data: any, realm: any,loginData:any) => {
    const type = typeof data;
    const dataNotFound = (data && data.FKN && data.FKN.Processamento && data.FKN.Processamento.codigoRetorno);
    console.log("not found data",dataNotFound , "type of",typeof dataNotFound,"dataNotFound === 2",dataNotFound === 2);
    if (!(dataNotFound === 2)) {
        if (dataNotFound != null && dataNotFound === 22) {
            deleteTabela(realm);
        }
    }
    else {
        const dataRamo = data && data.FKN && data.FKN.tabelas && data.FKN.tabelas?.[0] && data.FKN.tabelas?.[0].tabela;
        deleteTabela(realm);
        deleteTabelaFaixa(realm);
        insertTabela(dataRamo,realm,loginData);
    }
    console.log("type of data", type, data);
}

export default TabelaModalHelper;