import Realm from 'realm';
const generatePayload = (data: any, loginData: any) => {
    const Data = [];
    console.log("Generate payload", data);

    if (data && data.length > 0) {
        for (const item of data) {
            try {
                Data.push({
                    idSituacao: item.idSituacao,
                    descricao: String(item.descricao).toString(),
                    ativo: item.ativo ? 1 : 0,
                    cor: String(item.cor).toString(),
                    rejeitaPedido: item.rejeitaPedido ? 1 : 0,
                    rejeitarOrcamento: item.rejeitarOrcamento ? 1 : 0,
                    idEmpresaFK: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa
                })
            } catch (e) {
                console.log("Error from loop", e);
            }
        }
    } else {
        Data.push({
            idSituacao: data.idSituacao,
            descricao: String(data.descricao).toString(),
            ativo: data.ativo ? 1 : 0,
            cor: String(data.cor).toString(),
            rejeitaPedido: data.rejeitaPedido ? 1 : 0,
            rejeitarOrcamento: data.rejeitarOrcamento ? 1 : 0,
            idEmpresaFK: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa
        })
    }
    return Data;
}


const insertSituacao = (data: any, realm: any, loginData: any) => {
    const Data = generatePayload(data, loginData);
    try {
        realm.write(() => {
            for (const item of Data) {
                realm.create('situacao', item);
            }
        })
        return 1
    } catch (error) {
        console.log("Create Situacao error", error);
        return 0
    }
}
const deleteSituacao = (realm: any) => {
    console.log("deleteSituacao called");
    try {
        realm.write(() => {
            const allRamos = realm.objects('situacao');
            realm.delete(allRamos);
        })
        return 1
    } catch (error) {
        console.log("Delete Situacao error", error);
        return 0
    }
}

export {
    insertSituacao,
    deleteSituacao

}