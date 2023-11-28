import { insertTabelaFaixa } from "./TabelaFaixaDao";

const generatePayload = (data: any,realm:any, loginData: any) => {
    const Data = [];
    if (data && data.length > 0) {
        for (const item of data) {
            Data.push({
                idTabela: item.idTabela,
                nome: item.nome,
                idClienteFK: item.idCliente,
                idEmpresaFK: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                idFilialFK: item.idFilial,
            })
            if(item.fxs && item.fxs[0] && item.fxs[0].fxAnd && item.fxs[0].fxAnd.length > 0 ){
                insertTabelaFaixa(item.fxs[0].fxAnd,realm,loginData,item.idTabela)
            }
        }
    }else{
        console.log("Calling object for Tabela");
        
        Data.push({
            idTabela: data.idTabela,
            nome: data.nome,
            idClienteFK: data.idCliente,
            idEmpresaFK: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
            idFilialFK: data.idFilial,
        })
        if(data.fxs && data.fxs[0] && data.fxs[0].fxAnd && data.fxs[0].fxAnd.length > 0 ){
            insertTabelaFaixa(data.fxs[0].fxAnd,realm,loginData,data.idTabela)
        }
    }
    return Data;
}


const insertTabela = (data: any, realm: any, loginData: any) => {
    const Data = generatePayload(data,realm, loginData);
    try {
        realm.write(() => {
            for (const item of Data) {
                realm.create('tabela', item);
            }
        })
        return 1
    } catch (error) {
        console.log("Create Tabela error", error);
        return 0
    }
}
const deleteTabela = (realm: any) => {
    console.log("deleteContato called");
    try {
        realm.write(() => {
            const all = realm.objects('tabela');
            realm.delete(all);
        })
        return 1
    } catch (error) {
        console.log("Delete Tabela error", error);
        return 0
    }
}

export {
    insertTabela,
    deleteTabela

}