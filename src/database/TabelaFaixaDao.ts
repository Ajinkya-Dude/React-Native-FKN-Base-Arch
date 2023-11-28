const generatePayload = (data: any, loginData: any,idTabela:any) => {
    const Data = [];
    for (const item of data) {
        Data.push({
            idTabelaFx: new Realm.BSON.ObjectId(),
            sequencia: item.seq,
            nome: item.nom,
            percentual: item.pec,
            personalizado: item.pes,
            idProdutoFK: item.idP,
            idTabelaFK: idTabela,
            idEmpresaFK: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
        })
    }
    return Data;
}


const insertTabelaFaixa = (data: any, realm: any, loginData: any,idTabela:any) => {
    console.log("Calling insertTabelaFaixa ",idTabela);
    const Data = generatePayload(data, loginData,idTabela);
    try {
        realm.write(() => {
            for (const item of Data) {
                realm.create('tabelaFaixa', item);
            }
        })
        return 1
    } catch (error) {
        console.log("Create TabelaFaixa error", error);
        return 0
    }
}
const deleteTabelaFaixa = (realm: any) => {
    console.log("deleteTabelaFaixa called");
    try {
        realm.write(() => {
            const all = realm.objects('tabelaFaixa');
            realm.delete(all);
        })
        return 1
    } catch (error) {
        console.log("Delete TabelaFaixa error", error);
        return 0
    }
}

export {
    insertTabelaFaixa,
    deleteTabelaFaixa

}