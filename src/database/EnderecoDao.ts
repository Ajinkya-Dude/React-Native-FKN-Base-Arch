const generatePayload = (data: any, loginData: any) => {
    const Data = [];
    if (data && data.length) {
    for (const item of data) {
        Data.push({
            _id: new Realm.BSON.ObjectId(),
            idEnderecoWeb: item.idEnderecoWeb,
            idEndereco: item.idEndereco,
            nome: String(item.nome).toString(),
            endereco: String(item.endereco).toString(),
            numero: String(item.numero).toString(),
            complemento: String(item.complemento).toString(),
            cep: String(item.cep).toString(),
            bairro: String(item.bairro).toString(),
            cidade: String(item.cidade).toString(),
            estado: String(item.estado).toString(),
            endFaturamento: item.endFaturamento ? 1 : 0,
            novoEndereco: item.novoEndereco ? 1 : 0,
            atualizado: item.atualizado ? 1 : 0,
            idClienteFK: item.idCliente,
            idEmpresaFK: item.idEmpresa,
            enviado: item.enviar ? 1 : 0
        })
    }}else{
        console.log("Calling only on object",data);
        
        Data.push({
            _id: new Realm.BSON.ObjectId(),
            idEnderecoWeb: data.idEnderecoWeb,
            idEndereco: data.idEndereco,
            nome: data.nome,
            endereco: data.endereco,
            numero: String(data.numero).toString(),
            complemento: data.complemento,
            cep: data.cep,
            bairro: data.bairro,
            cidade: data.cidade,
            estado: data.estado,
            endFaturamento: data.endFaturamento ? 1 : 0,
            novoEndereco: data.novoEndereco ? 1 : 0,
            atualizado: data.atualizado ? 1 : 0,
            idClienteFK: data.idCliente,
            idEmpresaFK: data.idEmpresa,
            enviado: data.enviar ? 1 : 0,
        })
    }
    return Data;
}


const insertEndereco = (data: any, realm: any, loginData: any) => {
    const Data = generatePayload(data, loginData);
    try {
        realm.write(() => {
            for (const item of Data) {
                realm.create('endereco', item);
            }
        })
        return 1
    } catch (error) {
        console.log("Create Enderecos error", error);
        return 0
    }
}
const deleteEndereco = (realm: any) => {
    console.log("deleteEndereco called");
    try {
        realm.write(() => {
            const all = realm.objects('endereco');
            realm.delete(all);
        })
        return 1
    } catch (error) {
        console.log("Delete Enderecos error", error);
        return 0
    }
}

export {
    insertEndereco,
    deleteEndereco
}