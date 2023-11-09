const generatePrazoPagamentoPayload = (data: any,loginData:any) => {
    const Data = [];
    for (const item of data) {
        Data.push({
            idPrazoPagamento:item.idPrazoPagamento,
            descricao:item.descricao,
            situacao:item.situacao ? 1: 0,
            tipo:item.tipo,
            formaCalculo:item.formaCalculo,
            finalSemana:item.finalSemana,
            diaVencimento:item.diaVencimento,
            parcDataBase:item.parcDataBase,
            parcelaMinima:item.parcelaMinima,
            idEmpresaFK:loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa
        })
    }
    return Data;
}


const insertPrazoPagamento = (data: any, realm: any,loginData:any) => {
    const Data = generatePrazoPagamentoPayload(data,loginData);
    try {
        realm.write(() => {
            for (const item of Data) {
                realm.create('prazoPagamento', item);
            }
        })
        return 1
    } catch (error) {
        console.log("Create Portador error", error);
        return 0
    }
}
const deletePrazoPagamento = (realm: any) => {
    console.log("deletePrazoPagamento called");
    try {
        realm.write(() => {
            const all = realm.objects('prazoPagamento');
            realm.delete(all);
        })
        return 1
    } catch (error) {
        console.log("Delete Portador error", error);
        return 0
    }
}

export {
    insertPrazoPagamento,
    deletePrazoPagamento

}