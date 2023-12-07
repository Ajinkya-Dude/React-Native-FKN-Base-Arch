import { formatDateAniversario } from "../utils/globalFunctions";

const generatePayload = (data: any, loginData: any) => {
    const Data = [];
    if (data && data.length) {
        for (const item of data) {
            Data.push({
                _id: new Realm.BSON.ObjectId(),
                idContatoWeb: item.idContatoWeb,
                idContato: item.idContato,
                nome: String(item.nome).toString(),
                telefone: item.telefone ? String(item.telefone).toString() : '',
                aniversario: item.aniversario ? String(formatDateAniversario(item.aniversario)).toString() : '',
                email: item.email ? String(item.email).toString() : '',
                observacoes: item.observacoes ? String(item.observacoes).toString() : '',
                novoContato: item.novoContato ? 1 : 0,
                idDepartamentoFK: item.idDepartamento,
                atualizado: item.atualizado ? 1 : 0,
                idClienteFK: item.idCliente,
                enviado: item.enviar ? 1 : 0,
                idEmpresaFK: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa
            })
        }
    } else {
        Data.push({
            _id: new Realm.BSON.ObjectId(),
            idContatoWeb: data.idContatoWeb,
            idContato: data.idContato,
            nome: String(data.nome).toString(),
            telefone: data.telefone ? String(data.telefone).toString() : '',
            aniversario: data.aniversario ? String(formatDateAniversario(data.aniversario)).toString() : '',
            email: data.email ? String(data.email).toString() : '',
            observacoes: data.observacoes ? String(data.observacoes).toString() : '',
            novoContato: data.novoContato ? 1 : 0,
            idDepartamentoFK: data.idDepartamento,
            atualizado: data.atualizado ? 1 : 0,
            idClienteFK: data.idCliente,
            enviado: data.enviar ? 1 : 0,
            idEmpresaFK: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa
        })
    }
    return Data;
}


const insertContato = (data: any, realm: any, loginData: any) => {
    const Data = generatePayload(data, loginData);
    try {
        realm.write(() => {
            for (const item of Data) {
                realm.create('contato', item);
            }
        })
        return 1
    } catch (error) {
        return 0
    }
}
const updateContato = (data: any, realm: any, loginData: any) => {
    const results: any = realm.objects('contato')
    .filtered('idEmpresaFK = $0 AND idClienteFK = $1 AND idContatoWeb= $2', loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa, data.idCliente,data.idContatoWeb);
    
    const Data:any = generatePayload(data, loginData);
    try {
        realm.write(() => {
            results[0].idContatoWeb = Data[0].idContatoWeb,
            results[0].idContato = Data[0].idContato,
            results[0].nome = Data[0].nome,
            results[0].telefone = Data[0].telefone,
            results[0].novoContato = Data[0].novoContato,
            results[0].atualizado = Data[0].atualizado,
            results[0].idClienteFK = Data[0].idClienteFK,
            results[0].idEmpresaFK = Data[0].idEmpresaFK,
            results[0].enviado = Data[0].enviado,
            results[0].idDepartamentoFK = Data[0].idDepartamentoFK,
            results[0].observacoes = Data[0].observacoes,
            results[0].aniversario = Data[0].aniversario,
            results[0].email = Data[0].email
        })
        return 1
    } catch (error) {
        return 0
    }
}
const deleteContato = (realm: any) => {
    try {
        realm.write(() => {
            const all = realm.objects('contato');
            realm.delete(all);
        })
        return 1
    } catch (error) {
        return 0
    }
}

export {
    insertContato,
    deleteContato,
    updateContato

}