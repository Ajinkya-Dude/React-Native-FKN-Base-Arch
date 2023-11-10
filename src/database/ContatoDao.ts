const generatePayload = (data: any,loginData:any) => {
    const Data = [];
    for (const item of data) {
        Data.push({
            _id: new Realm.BSON.ObjectId(),
            idContatoWeb: item.idContatoWeb,
            idContato: item.idContato,
            nome: item.nome,
            telefone: item.telefone,
            //aniversario: { type: 'string', optional: true },
            email: item.email,
            observacoes: item.observacoes,
            novoContato: item.novoContato ? 1 :0,
            idDepartamentoFK: item.idDepartamento,
            atualizado: item.atualizado ? 1 : 0,
            idClienteFK: item.idCliente,
            //enviado: { type: 'int', optional: false },
            idEmpresaFK:loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa
        })
    }
    return Data;
}


const insertContato = (data: any, realm: any,loginData:any) => {
    const Data = generatePayload(data,loginData);
    try {
        realm.write(() => {
            for (const item of Data) {
                realm.create('contato', item);
            }
        })
        return 1
    } catch (error) {
        console.log("Create Contato error", error);
        return 0
    }
}
const deleteContato = (realm: any) => {
    console.log("deleteContato called");
    try {
        realm.write(() => {
            const all = realm.objects('contato');
            realm.delete(all);
        })
        return 1
    } catch (error) {
        console.log("Delete Contato error", error);
        return 0
    }
}

export {
    insertContato,
    deleteContato

}