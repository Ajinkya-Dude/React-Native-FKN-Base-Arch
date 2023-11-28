import Realm, { ObjectSchema } from 'realm';

class Produto extends Realm.Object<Produto> {
  idProduto!: number;
  referencia?: string;
  descricao?: string;
  mensagemAlertaSif?: string;
  unidade?: string;
  embalagem?: number;
  codBarras?: string;
  margemMinima?: number;
  quantidadeEstoque?: number;
  precoCusto?: number;
  precoVenda?: number;
  observacao?: string;
  situacao?: string;
  bloqPedVendas?: string;
  bloqOrc?: number;
  idSeparacaoUmFK?: number;
  idSeparacaoDoisFK?: number;
  idFilialFK?: number;
  idEmpresaFK!: number;
  idSituacaoFK!: number;
  complemento?: string;

  static schema: ObjectSchema = {
    name: 'produto',
    primaryKey: 'idProduto',
    properties: {
      idProduto: { type: 'int' },
      referencia: { type: 'string', optional: true },
      descricao: { type: 'string', optional: true },
      mensagemAlertaSif: { type: 'string', optional: true },
      unidade: { type: 'string', optional: true },
      embalagem: { type: 'int', optional: true },
      codBarras: { type: 'string', optional: true },
      margemMinima: { type: 'double', optional: true },
      quantidadeEstoque: { type: 'double', optional: true },
      precoCusto: { type: 'double', optional: true },
      precoVenda: { type: 'double', optional: true },
      observacao: { type: 'string', optional: true },
      situacao: { type: 'string', optional: true },
      bloqPedVendas: { type: 'string', optional: true },
      bloqOrc: { type: 'int', optional: true },
      idSeparacaoUmFK: { type: 'int', optional: true,indexed: true, },
      idSeparacaoDoisFK: { type: 'int', optional: true,indexed: true, },
      idFilialFK: { type: 'int',indexed: true, optional: true },
      idEmpresaFK: { type: 'int', indexed: true, optional: false },
      idSituacaoFK: { type: 'int', indexed: true, optional: false },
      complemento: { type: 'string', optional: true },
    },
  };
}

export default Produto;
