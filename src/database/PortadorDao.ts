const generatePortadorPayload = (data: any,loginData:any) => {
    const portadorData = [];
    for (const item of data) {
        portadorData.push({
            idPortador:item.idPortador,
            descricao:item.descricao,
            situacao:item.situacao ? 1: 0,
            idEmpresaFK:loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa
        })
    }
    return portadorData;
}


const insertPortador = (data: any, realm: any,loginData:any) => {
    const portadorData = generatePortadorPayload(data,loginData);
    try {
        realm.write(() => {
            for (const item of portadorData) {
                realm.create('portador', item);
            }
        })
        return 1
    } catch (error) {
        console.log("Create Portador error", error);
        return 0
    }
}
const deletePortador = (realm: any) => {
    console.log("deletePortador called");
    try {
        realm.write(() => {
            const allPortador = realm.objects('portador');
            realm.delete(allPortador);
        })
        return 1
    } catch (error) {
        console.log("Delete Portador error", error);
        return 0
    }
}

export {
    insertPortador,
    deletePortador

}