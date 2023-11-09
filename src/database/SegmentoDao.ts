const generateSegmentoPayload = (data: any,loginData:any) => {
    const Data = [];
    for (const item of data) {
        Data.push({
            idSegmento:item.idSegmento,
            descricao:item.descricao,
            idEmpresaFK:loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
            idRamoFK:item.idRamoFK
        })
    }
    return Data;
}


const insertSegmento = (data: any, realm: any,loginData:any) => {
    const Data = generateSegmentoPayload(data,loginData);
    console.log("Insert Segmento data",Data);
    
    try {
        realm.write(() => {
            for (const item of Data) {
                realm.create('segmento', item);
            }
        })
        return 1
    } catch (error) {
        console.log("Create Segmento error", error);
        return 0
    }
}
const deleteSegmento = (realm: any) => {
    console.log("deleteSegmento called");
    try {
        realm.write(() => {
            const all = realm.objects('segmento');
            realm.delete(all);
        })
        return 1
    } catch (error) {
        console.log("Delete Segmento error", error);
        return 0
    }
}

export {
    insertSegmento,
    deleteSegmento

}