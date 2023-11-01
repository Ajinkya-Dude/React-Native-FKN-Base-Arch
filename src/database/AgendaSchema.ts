import Realm, { ObjectSchema } from "realm";

class Agenda extends Realm.Object<Agenda> {
  // _id!: Realm.BSON.ObjectId;
  idVendedor!: number;
  idAgenda?: number;
  assunto!: string;
  contato?: string;
  dtProgramada!: string;
  idAgendaWeb?: number;
  downloadAndroid!: boolean;
  dtRealizada?: string;
  idResultadoFK!: number;
  idClienteFK!: number;
  idEmpresaFK!: number;
  android!: number;
  notifica?: boolean;
  dtNotifica?: string;
  idProspeccaoFK?: number;
  longitude?: string;
  latitude?: string;
  dtCheckin?: string;
  compositekey!: string;

  generateCompositeKey() {
    // Combine values from multiple properties to create a unique key
    return `${this.idVendedor}-${this.idClienteFK}-${this.dtProgramada}`;
  }

  static schema: ObjectSchema = {
    name: 'agenda',
    properties: {
      //_id: 'objectId',
      idAgendaWeb: { type: "int", indexed: true, optional: true },
      idAgenda: { type: "int", indexed: true, optional: true },
      assunto: { type: 'string', optional: false }, //not null
      contato: 'string?',
      dtProgramada: 'string',
      dtRealizada: 'string?',
      downloadAndroid: 'bool',
      idVendedor: { type: "int", indexed: true },
      idResultadoFK: { type: 'int', indexed: true,optional: true },
      idClienteFK: { type: 'int', indexed: true, optional: false },//not null
      idEmpresaFK: { type: 'int', indexed: true, optional: false },//not null
      enviar: { type: 'int', optional: false },//not null
      android: { type: 'int', optional: false },//not null
      notifica: 'bool?',
      dtNotifica: 'string?',
      idProspeccaoFK: 'int?',
      longitude: 'string?',
      latitude: 'string?',
      dtCheckin: 'string?',
      compositekey: 'string'
    },
    primaryKey: 'compositekey',
  };

}

export default Agenda;
