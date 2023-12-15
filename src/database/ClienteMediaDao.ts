const generatePayload = (data: any, loginData: any) => {
    const Data = [];
    if (data && data.length) {
        for (const item of data) {
            Data.push({
                _id: new Realm.BSON.ObjectId(),
                idClienteFK: item.idCliente,
                pm: item.pm,
                diffPmUv: item.diffPmUv ? item.diffPmUv : 0,
                idEmpresaFK: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa
            })
        }
    } else {
        console.log("Calling only on object", data);
        Data.push({
            _id: new Realm.BSON.ObjectId(),
            idClienteFK: data.idCliente,
            pm: data.pm,
            diffPmUv: data.diffPmUv ? data.diffPmUv : 0,
            idEmpresaFK: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa
        })
    }
    return Data;
}


const insertClienteMedia = (data: any, realm: any, loginData: any) => {
    const Data = generatePayload(data, loginData);
    try {
        realm.write(() => {
            for (const item of Data) {
                realm.create('cliente_media', item);
            }
        })
        return 1
    } catch (error) {
        console.log("Create ClienteMedia error", error);
        return 0
    }
}

const deleteClienteMedia = (realm: any) => {
    console.log("deleteClienteMedia called");
    try {
        realm.write(() => {
            const all = realm.objects('cliente_media');
            realm.delete(all);
        })
        return 1
    } catch (error) {
        console.log("Delete ClienteMedia error", error);
        return 0
    }
}

export {
    insertClienteMedia,
    deleteClienteMedia
}