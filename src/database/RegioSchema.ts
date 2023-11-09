import Realm, { ObjectSchema } from 'realm';

class Regio extends Realm.Object<Regio> {
  idRegiao!: number;
  descricao!: string; // Not null
  idEmpresaFK!: number; // Not null
  

  static schema: ObjectSchema = {
    name: 'regiao',
    properties: {
    //   _id: 'objectId',
      idRegiao: { type: 'int', indexed:true },
      descricao: { type: 'string'},
      idEmpresaFK: { type: 'int', indexed:true },
    },
    primaryKey: 'idRegiao',
  };
}

export default Regio;
