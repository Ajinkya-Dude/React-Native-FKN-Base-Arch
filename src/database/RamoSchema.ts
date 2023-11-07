import Realm, { ObjectSchema } from 'realm';

class Ramo extends Realm.Object<Ramo> {
  idRamo!: number;
  descricao!: string; // Not null
  idEmpresaFK!: number; // Not null
  

  static schema: ObjectSchema = {
    name: 'ramo',
    properties: {
    //   _id: 'objectId',
      idRamo: { type: 'int', indexed:true },
      descricao: { type: 'string', indexed:true },
      idEmpresaFK: { type: 'int', indexed:true },
    },
    primaryKey: 'idRamo',
  };
}

export default Ramo;
