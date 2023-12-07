const generatePayload = (data: any, loginData: any) => {
    const Data = [];
    if (data && data.length) {
        for (const item of data) {
            Data.push({
                idDepartamento: item.idDepartamento,
                descricao: String(item.descricao).toString(),
                idEmpresaFK: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa
            })
        }
    } else {
        console.log("Calling only on object", data);
        Data.push({
            idDepartamento: data.idDepartamento,
            descricao: String(data.descricao).toString(),
            idEmpresaFK: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa
        })
    }
    return Data;
}


const insertDepartmento = (data: any, realm: any, loginData: any) => {
    const Data = generatePayload(data, loginData);
    try {
        realm.write(() => {
            for (const item of Data) {
                realm.create('departamento', item);
            }
        })
        return 1
    } catch (error) {
        console.log("Create Departmento error", error);
        return 0
    }
}

const deleteDepartmento = (realm: any) => {
    console.log("deleteDepartmento called");
    try {
        realm.write(() => {
            const all = realm.objects('departamento');
            realm.delete(all);
        })
        return 1
    } catch (error) {
        console.log("Delete Departamento error", error);
        return 0
    }
}

export {
    insertDepartmento,
    deleteDepartmento
}