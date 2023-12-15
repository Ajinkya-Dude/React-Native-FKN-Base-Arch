import ClassificacaoClienteModalHelper from "./ClassificacaoClienteMo";
import ClienteModalHelper from "./ClienteMO";
import ClienteMediaModalHelper from "./ClienteMediaMo";
import ContatoModalHelper from "./ContatoMo";
import DepartmentoModalHelper from "./DepartmentoMo";
import EnderecoModalHelper from "./EnderecoMO";
import ParametroModalHelper from "./ParametroMo";
import PortadorModalHelper from "./PortadorMo";
import PrazoPagamentoModalHelper from "./PrazoPagamentoMo";
import ProdutoModalHelper from "./ProdutoMO";
import RamoModalHelper from "./RamoMo";
import RegioModalHelper from "./RegioMo";
import SegmentoModalHelper from "./SegmentoMo";
import SituacaoModalHelper from "./SituacaoMo";
import TabelaModalHelper from "./TabelaMO";
import TransportadorModalHelper from "./TransportadorMo";

const RealmHelper = (type: string, data: any, realm: any, loginData: any) => {

    switch (type) {
        case 'clientsRequest/fulfilled':
            ClienteModalHelper(data, realm,loginData);
            break;
        case 'ramosRequest/fulfilled':
            RamoModalHelper(data, realm, loginData);
            break;
        case 'regioesRequest/fulfilled':
            RegioModalHelper(data, realm, loginData);
            break;
        case 'portadorRequest/fulfilled':
            PortadorModalHelper(data, realm, loginData);
            break;
        case 'transportadoraRequest/fulfilled':
            TransportadorModalHelper(data, realm, loginData);
            break;
        case 'segmentoRequest/fulfilled':
            SegmentoModalHelper(data, realm, loginData);
            break;
        case 'prazoRequest/fulfilled':
            PrazoPagamentoModalHelper(data, realm, loginData);
            break;
        case 'contatoRequest/fulfilled':
            ContatoModalHelper(data, realm, loginData);
            break;
        case 'produtoRequest/fulfilled':
            ProdutoModalHelper(data, realm, loginData);
            break;
        case 'tabelaRequest/fulfilled':
            TabelaModalHelper(data, realm, loginData);
            break;
        case 'enderecoRequest/fulfilled':
            EnderecoModalHelper(data, realm, loginData);
            break;
        case 'departmentRequest/fulfilled':
            DepartmentoModalHelper(data, realm, loginData);
            break;
        case 'situacoesRequest/fulfilled':
            SituacaoModalHelper(data, realm, loginData);
            break;
        case 'classificacaoClienteRequest/fulfilled':
            ClassificacaoClienteModalHelper(data, realm, loginData);
            break;
        case 'clienteMediaRequest/fulfilled':
            ClienteMediaModalHelper(data, realm, loginData);
            break;
        case 'parameterRequest/fulfilled':
            ParametroModalHelper(data,realm);
            break;
        default:
            console.log("Type of api call", type);

    }

}
export default RealmHelper;