const generatePayload = (data: any, loginData: any) => {
    const Data = [];
    
    if (data && data.length) {
        for (const item of data) {
            try {
                Data.push({
                    idClassificacao: item.idClassificacao,
                    descricao: String(item.descricao).toString(),
                    sigla: String(item.sigla).toString(),
                    cor: String(item.cor).toString(),
                    situacao: item.situacao ? item.situacao : '',
                    idEmpresaFK: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa
                })
            } catch (e) {
                console.log("Error from loop", e);
            }
        }
    } else {
        Data.push({
            idClassificacao: data.idClassificacao,
            descricao: String(data.descricao).toString(),
            sigla: String(data.sigla).toString(),
            cor: String(data.cor).toString(),
            situacao: data.situacao ? data.situacao : '',
            idEmpresaFK: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa
        })
    }
    return Data;
}


const insertClassificacaoCliente = (data: any, realm: any, loginData: any) => {
    const Data = generatePayload(data, loginData);
    try {
        realm.write(() => {
            for (const item of Data) {
                realm.create('classificacaoCliente', item);
            }
        })
        return 1
    } catch (error) {
        console.log("insertClassificacaoCliente",error);     
        return 0
    }
}

const deleteClassificacoCliente = (realm: any) => {
    try {
        realm.write(() => {
            const all = realm.objects('classificacaoCliente');
            realm.delete(all);
        })
        return 1
    } catch (error) {
        return 0
    }
}

export {
    insertClassificacaoCliente,
    deleteClassificacoCliente
}