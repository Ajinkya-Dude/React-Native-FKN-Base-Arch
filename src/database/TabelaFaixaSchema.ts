import Realm, { ObjectSchema } from 'realm';

class TabelaFaixa extends Realm.Object<TabelaFaixa> {
    idTabelaFx!: Realm.BSON.ObjectId;
    sequencia!: number;
    nome!: string;
    percentual?: number;
    personalizado?: number;
    idProdutoFK?: number;
    idTabelaFK!: number;
    idEmpresaFK!: number;
  
    static schema: ObjectSchema = {
      name: 'tabelaFaixa',
      primaryKey: 'idTabelaFx',
      properties: {
        idTabelaFx:'objectId',
        sequencia: { type: 'int', optional: false },
        nome: { type: 'string', optional: false },
        percentual: { type: 'double', optional: true },
        personalizado: { type: 'double', optional: true },
        idProdutoFK: { type: 'int', optional: true, indexed:true},
        idTabelaFK: { type: 'int', optional: false ,indexed:true},
        idEmpresaFK: { type: 'int', optional: false,indexed:true},
      },
    };
  }

// class TabelaFaixa extends Realm.Object<TabelaFaixa> {
//     idTabelaFx!: Realm.BSON.ObjectId;
//     nome!: string; // Not null
//     sequencia!:number;
//     idEmpresaFK!: number; // Not null
//     idClienteFK!: number;
//     idFilialFK!: number;


//     static schema: ObjectSchema = {
//         name: 'tabelaFaixa',
//         properties: {
//             idTabelaFx: 'objectId',
//             nome: { type: 'string', indexed: true },
//             idEmpresaFK: { type: 'int', indexed: true },
//             idClienteFK: { type: 'int', indexed: true },
//             idFilialFK: { type: 'int', indexed: true },
//         },
//         primaryKey: 'idTabelaFx',
//     };
// }

export default TabelaFaixa;
