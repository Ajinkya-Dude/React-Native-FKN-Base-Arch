import Realm, { ObjectSchema } from 'realm';

class ClassificacaoCliente extends Realm.Object<ClassificacaoCliente> {
  idClassificacao!: number;
  descricao!: string;
  sigla!: string;
  cor!: string;
  situacao?: number;
  idEmpresaFK!: number;

  static schema: ObjectSchema = {
    name: 'classificacaoCliente',
    primaryKey: 'idClassificacao',
    properties: {
      idClassificacao: { type: 'int' },
      descricao: { type: 'string', optional: false },
      sigla: { type: 'string', optional: false },
      cor: { type: 'string', optional: false },
      situacao: { type: 'int', optional: true },
      idEmpresaFK: { type: 'int', indexed: true, optional: false },
    },
  };
}

export default ClassificacaoCliente;
