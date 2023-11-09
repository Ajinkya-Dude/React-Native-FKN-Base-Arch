import Realm, { ObjectSchema } from 'realm';

class Transportadora extends Realm.Object<Transportadora> {
  idTransportadora!: number;
  descricao!: string; // Not null
  idEmpresaFK!: number; // Not null
  situacao!:number;
  

  static schema: ObjectSchema = {
    name: 'transportadora',
    properties: {
      idTransportadora: { type: 'int', indexed:true },
      descricao: { type: 'string'},
      situacao:{ type: 'int'},
      idEmpresaFK: { type: 'int', indexed:true },
    },
    primaryKey: 'idTransportadora',
  };
}

export default Transportadora;
