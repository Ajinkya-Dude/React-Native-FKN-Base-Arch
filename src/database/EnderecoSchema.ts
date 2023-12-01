import Realm, { ObjectSchema } from 'realm';

class Endereco extends Realm.Object<Endereco> {
    _id!: Realm.BSON.ObjectId;
    idEnderecoWeb?: number;
    idEndereco?: number;
    nome!: string;
    endereco!: string;
    numero!: string;
    complemento?: string;
    cep!: string;
    bairro!: string;
    cidade!: string;
    estado!: string;
    endFaturamento?: number;
    novoEndereco?: number;
    atualizado?: number;
    idClienteFK!: number;
    idEmpresaFK!: number;
    enviado!: number;

    static schema: ObjectSchema = {
        name: 'endereco',
        primaryKey: '_id',
        properties: {
            _id: 'objectId',
            idEnderecoWeb: { type: 'int', optional: true },
            idEndereco: { type: 'int', optional: true, indexed: true },
            nome: { type: 'string' },
            endereco: { type: 'string' },
            numero: { type: 'string' },
            complemento: { type: 'string', optional: true },
            cep: { type: 'string' },
            bairro: { type: 'string' },
            cidade: { type: 'string' },
            estado: { type: 'string' },
            endFaturamento: { type: 'int', optional: true },
            novoEndereco: { type: 'int', optional: true },
            atualizado: { type: 'int', optional: true },
            idClienteFK: { type: 'int', indexed: true },
            idEmpresaFK: { type: 'int', indexed: true },
            enviado: { type: 'int', indexed: true},
        },
    };
}

export default Endereco;
