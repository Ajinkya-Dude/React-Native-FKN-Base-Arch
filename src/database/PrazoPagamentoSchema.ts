import Realm, { ObjectSchema } from 'realm';

class PrazoPagamento extends Realm.Object<PrazoPagamento> {
  idPrazoPagamento!: number;
  descricao!: string; // Not null
  idEmpresaFK!: number; // Not null
  situacao!:number;
  tipo!:string;
  formaCalculo!:string;
  finalSemana!:string;
  diaVencimento!:string;
  parcDataBase?:number;
  parcelaMinima?:number;
  

  static schema: ObjectSchema = {
    name: 'prazoPagamento',
    properties: {
      idPrazoPagamento: { type: 'int', indexed:true },
      descricao: { type: 'string'},
      situacao:{ type: 'int'},
      tipo: { type: 'string'},
      formaCalculo:{type:'string'},
      finalSemana:{type:'string'},
      diaVencimento:{type:'string'},
      parcDataBase:{type:'int',optional:true},
      parcelaMinima:{type:'float',optional:true},
      idEmpresaFK: { type: 'int', indexed:true },
    },
    primaryKey: 'idPrazoPagamento',
  };
}

export default PrazoPagamento;
