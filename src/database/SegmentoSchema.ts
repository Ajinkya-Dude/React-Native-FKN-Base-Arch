import Realm, { ObjectSchema } from 'realm';

class Segmento extends Realm.Object<Segmento> {
  idSegmento!: number;
  descricao!: string; // Not null
  idEmpresaFK!: number; // Not null
  idRamoFK!: number; // Not null
  

  static schema: ObjectSchema = {
    name: 'segmento',
    properties: {
    //   _id: 'objectId',
      idSegmento: { type: 'int', indexed:true },
      descricao: { type: 'string'},
      idEmpresaFK: { type: 'int', indexed:true },
      idRamoFK: { type: 'int', indexed:true },
    },
    primaryKey: 'idSegmento',
  };
}

export default Segmento;
