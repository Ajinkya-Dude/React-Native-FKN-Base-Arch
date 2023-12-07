import Realm, { ObjectSchema } from 'realm';

class Departamento extends Realm.Object {
    idDepartamento!: number;
    descricao!: string;
    idEmpresaFK!: number;

    static schema: ObjectSchema = {
        name: 'departamento',
        primaryKey: 'idDepartamento',
        properties: {
            idDepartamento: { type: 'int', indexed: true },
            descricao: { type: 'string', optional: false },
            idEmpresaFK: { type: 'int', optional: false, indexed: true },
        }
    };
}

export default Departamento;
