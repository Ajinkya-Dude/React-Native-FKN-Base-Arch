import Realm, { ObjectSchema } from 'realm';

class PrecoFilial extends Realm.Object<PrecoFilial> {
  idPrecoFilial!: Realm.BSON.ObjectId;
  preco?: number;
  custo?: number;
  idProdutoFK!: number;
  idFilialFK!: number;
  idEmpresaFK!: number;

  static schema: ObjectSchema = {
    name: 'precoFilial',
    primaryKey: 'idPrecoFilial',
    properties: {
      idPrecoFilial: 'objectId',
      preco: { type: 'float', optional: true },
      custo: { type: 'float', optional: true },
      idProdutoFK: { type: 'int', optional: false, indexed:true },
      idFilialFK: { type: 'int', optional: false , indexed:true},
      idEmpresaFK: { type: 'int', optional: false, indexed:true},
    },
  };
}

export default PrecoFilial;
