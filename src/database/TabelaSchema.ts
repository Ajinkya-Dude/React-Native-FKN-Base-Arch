import Realm, { ObjectSchema } from 'realm';

class Tabela extends Realm.Object<Tabela> {
  idTabela!: number;
  nome!: string;
  idClienteFK?: number;
  idEmpresaFK!: number;
  idFilialFK!: number;

  static schema: ObjectSchema = {
    name: 'tabela',
    primaryKey: 'idTabela',
    properties: {
      idTabela: { type: 'int' },
      nome: { type: 'string', indexed: true, optional: false },
      idClienteFK: { type: 'int', indexed: true, optional: true },
      idEmpresaFK: { type: 'int', indexed: true, optional: false },
      idFilialFK: { type: 'int', indexed: true, optional: false },
    },
  };
}

export default Tabela;
