import Realm, { ObjectSchema } from 'realm';

class Situacao extends Realm.Object<Situacao> {
  idSituacao!: number;
  descricao!: string; // Not null
  idEmpresaFK!: number; // Not null
  ativo!:number;
  cor!:string;
  rejeitaPedido!:number;
  rejeitarOrcamento!:number;
  

  static schema: ObjectSchema = {
    name: 'situacao',
    properties: {
      idSituacao: { type: 'int', indexed:true },
      descricao: { type: 'string'},
      ativo:{type:'int'},
      cor: { type: 'string'},
      rejeitaPedido: { type: 'int'},
      rejeitarOrcamento:{ type: 'int'},
      idEmpresaFK: { type: 'int', indexed:true },
    },
    primaryKey: 'idSituacao',
  };
}

export default Situacao;
