import Realm, { ObjectSchema } from 'realm';

class SaldoFilial extends Realm.Object<SaldoFilial> {
  idSaldoFilial!:Realm.BSON.ObjectId;
  saldo?: number;
  idProdutoFK!: number;
  idFilialFK!: number;
  idEmpresaFK!: number;

  static schema: ObjectSchema = {
    name: 'saldoFilial',
    primaryKey: 'idSaldoFilial',
    properties: {
      idSaldoFilial: 'objectId',
      saldo: { type: 'float', optional: true },
      idProdutoFK: { type: 'int', optional: false,indexed:true },
      idFilialFK: { type: 'int', optional: false,indexed:true },
      idEmpresaFK: { type: 'int', optional: false, indexed:true },
    },
  };
}

export default SaldoFilial;
