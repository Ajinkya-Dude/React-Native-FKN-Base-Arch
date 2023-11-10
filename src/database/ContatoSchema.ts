import Realm, { ObjectSchema } from 'realm';

class Contato extends Realm.Object<Contato> {
    _id!: Realm.BSON.ObjectId; // Primary key (auto-increment)
    idContatoWeb!: number;
    idContato!: number;
    nome!: string; // Not null
    telefone?: string;
    //aniversario?: string;
    email!: string;
    observacoes?: string;
    novoContato?: number;
    idDepartamentoFK?: number;
    atualizado?: number;
    idClienteFK!: number;
    //enviado?: number;
    idEmpresaFK!: number; // Not null


    static schema: ObjectSchema = {
        name: 'contato',
        properties: {
            _id: 'objectId', // Primary key (auto-increment)
            idContatoWeb: { type: 'int', optional: true },
            idContato: { type: 'int', indexed: true },
            nome: { type: 'string' },
            telefone: { type: 'string' },
            //aniversario: { type: 'string', optional: true },
            email: { type: 'string', optional: true },
            observacoes: { type: 'string', optional: true },
            novoContato: { type: 'int', optional: true },
            idDepartamentoFK: { type: 'int', optional: true },
            atualizado: { type: 'int', optional: true },
            idClienteFK: { type: 'int', optional: false,indexed: true },
            //enviado: { type: 'int', optional: true },// optional:false
            idEmpresaFK: { type: 'int', indexed: true },
        },
        primaryKey: '_id',
    };
}

export default Contato;
