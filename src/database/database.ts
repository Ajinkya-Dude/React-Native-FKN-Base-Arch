import { createRealmContext } from "@realm/react";
import Realm from "realm";
import Agenda from "./AgendaSchema";
import Cliente from "./ClienteSchema";
import Ramo from "./RamoSchema";
import Regio from "./RegioSchema";
import Portador from "./PortadorSchema";
import Transportadora from "./TransportadoraSchema";
import Segmento from "./SegmentoSchema";
import PrazoPagamento from "./PrazoPagamentoSchema";
import Contato from "./ContatoSchema";
import Tabela from "./TabelaSchema";
import TabelaFaixa from "./TabelaFaixaSchema";
import Produto from "./ProdutoSchema";
import PrecoFilial from "./PrecoFilialSchema";
import SaldoFilial from "./SaldoFilialSchema";
import Endereco from "./EnderecoSchema";
import Departamento from "./DepartmentoSchema";
import Situacao from "./SituacaoSchema";

export const realmConfig: Realm.Configuration = {
    schema: [Agenda,Cliente,Ramo,Regio,Portador,Transportadora,Segmento,PrazoPagamento,Contato,Tabela,TabelaFaixa,Produto,PrecoFilial,SaldoFilial,Endereco,Departamento,Situacao],
    schemaVersion:1
};
export const realmContext = createRealmContext(realmConfig);

//export const useRealmContext = () => realmContext;

// export default realmConfig;

// import { open } from "react-native-quick-sqlite";

// export const getDBConnection = async () => {
//    return open({ name: "fkn_vendas_react-native.db", location: "default" });
// };