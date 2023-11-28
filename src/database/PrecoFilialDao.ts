const generatePayload = (data: any) => {
    const Data = [];
    if (data && data.length) {
        for (const item of data) {
            Data.push({
                idPrecoFilial: new Realm.BSON.ObjectId(),
                preco: item.preco,
                custo: item.custo,
                idProdutoFK: item.idProdutoFK,
                idFilialFK: item.idFilialFK,
                idEmpresaFK: item.idEmpresaFK,
            })
        }
    } else {
        Data.push({
            idPrecoFilial: new Realm.BSON.ObjectId(),
            preco: data.preco,
            custo: data.custo,
            idProdutoFK: data.idProdutoFK,
            idFilialFK: data.idFilialFK,
            idEmpresaFK: data.idEmpresaFK,
        })
    }

    return Data;
}

const insertPrecoFilial = (data: any, realm: any) => {
    console.log("Calling insert preco filial");
    const Data = generatePayload(data);
    try {
        realm.write(() => {
            for (const item of Data) {
                realm.create('precoFilial', item);
            }
        })
        return 1
    } catch (error) {
        console.log("Create PrecoFilial error", error);
        return 0
    }
}
const deletePrecoFilial = (realm: any) => {
    console.log("deletePrecoFilial called");
    try {
        realm.write(() => {
            const all = realm.objects('precoFilial');
            realm.delete(all);
        })
        return 1
    } catch (error) {
        console.log("Delete PrecoFilial error", error);
        return 0
    }
}

export {
    insertPrecoFilial,
    deletePrecoFilial
}