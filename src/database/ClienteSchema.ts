import Realm, { ObjectSchema } from 'realm';

class Cliente extends Realm.Object<Cliente> {
  _id!: Realm.BSON.ObjectId; // Primary key (auto-increment)
  idClienteWeb?: number;
  idCliente?: number;
  razaoSocial!: string; // Not null
  fantasia!: string; // Not null
  tipo!: string; // Not null
  cpfCnpj!: string; // Not null
  rgIe!: string; // Not null
  atualizado?: number;
  telefone?: string; // Not null
  celular?: string;
  fax?: string;
  email?: string;
  emailNfe?: string;
  obsCadastral?: string;
  dtCadastro!: string; // Not null
  cnae?: string;
  permiteAltPortador!: number; // Not null
  permiteAltPrazoPgto!: number; // Not null
  novoCadastro!: number; // Not null
  idRamoFK?: number;
  idRegiaoFK?: number;
  idSituacaoFK!: number; // Not null
  idPortadorFK?: number;
  idPrazoPagamentoFK?: number;
  idVendedor?: number;
  idEmpresaFK!: number; // Not null
  tabelaPadrao?: string;
  enviado!: number; // Not null
  idTransportadoraFK?: number;
  idClassificacaoFK?: number;
  dtFundacao?: string;
  idSegmentoFK?: number;
  dtUltOrc?: string;
  dtUltVen?: string;
  dtUltCon?: string;
  idProspeccaoFK?: number;

  static schema: ObjectSchema = {
    name: 'cliente',
    properties: {
      _id: 'objectId',
      idClienteWeb: { type: 'int', indexed:true },
      idCliente: { type: 'int', indexed:true },
      razaoSocial: 'string',
      fantasia: 'string',
      tipo: 'string',
      cpfCnpj: 'string',
      rgIe: 'string',
      atualizado: { type: 'int', optional: true },
      telefone: { type: 'string', optional: true },
      celular: { type: 'string', optional: true },
      fax: { type: 'string', optional: true },
      email: { type: 'string', optional: true },
      emailNfe: { type: 'string', optional: true },
      obsCadastral: { type: 'string', optional: true },
      dtCadastro: 'string',
      cnae: { type: 'string', optional: true },
      permiteAltPortador: 'int',
      permiteAltPrazoPgto: 'int',
      novoCadastro: 'int',
      idRamoFK: { type: 'int', optional: true,indexed:true },
      idRegiaoFK: { type: 'int', optional: true,indexed:true  },
      idSituacaoFK: { type: 'int',indexed:true },
      idPortadorFK: { type: 'int', optional: true,indexed:true },
      idPrazoPagamentoFK: { type: 'int', optional: true,indexed:true },
      idVendedor: { type: 'int', optional: true },
      idEmpresaFK: { type: 'int',indexed:true },
      tabelaPadrao: { type: 'string', optional: true },
      enviado: 'int',
      idTransportadoraFK: { type: 'int', optional: true },
      idClassificacaoFK: { type: 'int', optional: true },
      dtFundacao: { type: 'date', optional: true },
      idSegmentoFK: { type: 'int', optional: true },
      dtUltOrc: { type: 'string', optional: true },
      dtUltVen: { type: 'string', optional: true },
      dtUltCon: { type: 'string', optional: true },
      idProspeccaoFK: { type: 'int', optional: true },
    },
    primaryKey: '_id',
  };
}

export default Cliente;
