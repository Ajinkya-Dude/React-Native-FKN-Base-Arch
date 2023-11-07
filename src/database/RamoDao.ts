import Realm from 'realm';
const generateRamoPayload = (data: any,loginData:any) => {
    const ramoData = [];
    for (const item of data) {
        ramoData.push({
            idRamo:item.idRamo,
            descricao:item.descricao,
            idEmpresaFK:loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa
        })
    }
    return ramoData;
}


const insertRamo = (data: any, realm: any,loginData:any) => {
    const ramoData = generateRamoPayload(data,loginData);
    try {
        realm.write(() => {
            for (const item of ramoData) {
                realm.create('ramo', item);
            }
        })
        return 1
    } catch (error) {
        console.log("Create Ramo error", error);
        return 0
    }
}
const deleteRamo = (realm: any) => {
    console.log("deleteRamo called");
    try {
        realm.write(() => {
            const allRamos = realm.objects('ramo');
            realm.delete(allRamos);
        })
        return 1
    } catch (error) {
        console.log("Delete Ramo error", error);
        return 0
    }
}

export {
    insertRamo,
    deleteRamo

}