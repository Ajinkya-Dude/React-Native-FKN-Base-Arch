import ClienteModalHelper from "./ClienteMO";
import ContatoModalHelper from "./ContatoMo";
import PortadorModalHelper from "./PortadorMo";
import PrazoPagamentoModalHelper from "./PrazoPagamentoMo";
import RamoModalHelper from "./RamoMo";
import RegioModalHelper from "./RegioMo";
import SegmentoModalHelper from "./SegmentoMo";
import TransportadorModalHelper from "./TransportadorMo";

const RealmHelper = (type: string, data: any, realm: any, loginData: any) => {
    
    switch (type) {
        case 'clientsRequest/fulfilled':
            ClienteModalHelper(data, realm);
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
        default:
            console.log("Type of api call", type);

    }

}
export default RealmHelper;