const generateTransportadoraPayload = (data: any,loginData:any) => {
    const Data = [];
    for (const item of data) {
        Data.push({
            idTransportadora:item.idTransportadora,
            descricao:item.descricao,
            situacao:item.situacao ? 1: 0,
            idEmpresaFK:loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa
        })
    }
    return Data;
}


const insertTransportador = (data: any, realm: any,loginData:any) => {
    const Data = generateTransportadoraPayload(data,loginData);
    try {
        realm.write(() => {
            for (const item of Data) {
                realm.create('transportadora', item);
            }
        })
        return 1
    } catch (error) {
        console.log("Create Transportadora error", error);
        return 0
    }
}
const deleteTransportador = (realm: any) => {
    console.log("deleteTransportador called");
    try {
        realm.write(() => {
            const all = realm.objects('transportadora');
            realm.delete(all);
        })
        return 1
    } catch (error) {
        console.log("Delete Transportadora error", error);
        return 0
    }
}

export {
    insertTransportador,
    deleteTransportador

}