import Realm, { ObjectSchema } from 'realm';

class Portador extends Realm.Object<Portador> {
  idPortador!: number;
  descricao!: string; // Not null
  idEmpresaFK!: number; // Not null
  situacao!:number;
  

  static schema: ObjectSchema = {
    name: 'portador',
    properties: {
      idPortador: { type: 'int', indexed:true },
      descricao: { type: 'string'},
      situacao:{ type: 'int'},
      idEmpresaFK: { type: 'int', indexed:true },
    },
    primaryKey: 'idPortador',
  };
}

export default Portador;
