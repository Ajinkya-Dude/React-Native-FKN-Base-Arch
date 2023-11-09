import Realm from 'realm';
const generateRegioPayload = (data: any,loginData:any) => {
    const regioData = [];
    for (const item of data) {
        regioData.push({
            idRegiao:item.idRegiao,
            descricao:item.descricao,
            idEmpresaFK:loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa
        })
    }
    return regioData;
}


const insertRegio = (data: any, realm: any,loginData:any) => {
    const regioData = generateRegioPayload(data,loginData);
    console.log("Insert regio data",regioData);
    
    try {
        realm.write(() => {
            for (const item of regioData) {
                realm.create('regiao', item);
            }
        })
        return 1
    } catch (error) {
        console.log("Create Regio error", error);
        return 0
    }
}
const deleteRegio = (realm: any) => {
    console.log("deleteRegio called");
    try {
        realm.write(() => {
            const allRegios = realm.objects('regiao');
            realm.delete(allRegios);
        })
        return 1
    } catch (error) {
        console.log("Delete Regio error", error);
        return 0
    }
}

export {
    insertRegio,
    deleteRegio

}