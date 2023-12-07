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
        return 0
    }
}
const updateEndereco = (data: any, realm: any, loginData: any) => {
    const results: any = realm.objects('endereco')
            .filtered('idEmpresaFK = $0 AND idClienteFK = $1 AND idEnderecoWeb= $2', data.idEmpresa, data.idCliente,data.idEnderecoWeb);
    const Data = generatePayload(data, loginData);
    
    try {
        realm.write(() => {
            //results[0]._id =  Data[0]._id,
            results[0].idEnderecoWeb = Data[0].idEnderecoWeb,
            results[0].idEndereco = Data[0].idEndereco,
            results[0].nome = Data[0].nome,
            results[0].endereco = Data[0].endereco,
            results[0].numero = Data[0].numero,
            results[0].complemento = Data[0].complemento,
            results[0].cep = Data[0].cep,
            results[0].bairro = Data[0].bairro,
            results[0].estado = Data[0].estado,
            results[0].endFaturamento = Data[0].endFaturamento,
            results[0].novoEndereco = Data[0].novoEndereco,
            results[0].atualizado = Data[0].atualizado,
            results[0].idClienteFK = Data[0].idClienteFK,
            results[0].idEmpresaFK = Data[0].idEmpresaFK,
            results[0].enviado = Data[0].enviado
        })
        return 1
    } catch (error) {
        return 0
    }
}
const deleteEndereco = (realm: any) => {
    try {
        realm.write(() => {
            const all = realm.objects('endereco');
            realm.delete(all);
        })
        return 1
    } catch (error) {
        return 0
    }
}

export {
    insertEndereco,
    deleteEndereco,
    updateEndereco
}