const generatePayload = (data: any) => {
    const Data = [];
    if(data && data.length){
        for (const item of data) {
            Data.push({
                idSaldoFilial: new Realm.BSON.ObjectId(),
                saldo: item.saldo,
                custo: item.custo,
                idProdutoFK: item.idProdutoFK,
                idFilialFK: item.idFilialFK,
                idEmpresaFK: item.idEmpresaFK,
            })
        }
    }else{
        Data.push({
            idSaldoFilial: new Realm.BSON.ObjectId(),
            saldo: data.saldo,
            custo: data.custo,
            idProdutoFK: data.idProdutoFK,
            idFilialFK: data.idFilialFK,
            idEmpresaFK: data.idEmpresaFK,
        })
    }
    
    return Data;
}

const insertSaldoFilial = (data: any, realm: any) => {
    console.log("Calling insert saldo filial");
    const Data = generatePayload(data);
    try {
        realm.write(() => {
            for (const item of Data) {
                realm.create('saldoFilial', item);
            }
        })
        return 1
    } catch (error) {
        console.log("Create SaldoFilial error", error);
        return 0
    }
}
const deleteSaldoFilial = (realm: any) => {
    console.log("deleteSaldoFilial called");
    try {
        realm.write(() => {
            const all = realm.objects('saldoFilial');
            realm.delete(all);
        })
        return 1
    } catch (error) {
        console.log("Delete SaldoFilial error", error);
        return 0
    }
}

export {
    insertSaldoFilial,
    deleteSaldoFilial
}