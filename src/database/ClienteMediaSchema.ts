import Realm, { ObjectSchema } from 'realm';

class ClienteMedia extends Realm.Object<ClienteMedia> {
    _id!: Realm.BSON.ObjectId; // Primary key (auto-increment)
    idClienteFK!: number;
    pm!: number; // Not null
    idEmpresaFK!: number; // Not null
    diffPmUv!:number;

    static schema: ObjectSchema = {
        name: 'cliente_media',
        properties: {
            _id: 'objectId',
            idClienteFK: { type: 'int' },
            pm: { type: 'float' },
            idEmpresaFK: { type: 'int' },
            diffPmUv: { type: 'int' },
        },
        primaryKey: '_id',
    }
}

export default ClienteMedia;
