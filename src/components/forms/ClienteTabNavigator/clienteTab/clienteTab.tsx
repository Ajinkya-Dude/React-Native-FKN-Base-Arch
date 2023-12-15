import { KeyboardAvoidingView, ScrollView, Text, View, TextInput, Platform, Linking, Alert } from 'react-native';
import { FAB } from 'react-native-paper';
import theme from '../../../../theme';
import styles from './styles';
import Dropdown from '../../../common/CustomDropdown';
import { clienteCadastroTipo } from '../../../../screens/Cliente/ClienteData';
import { useEffect, useRef, useState } from 'react';
import DropdownField from '../../../common/CutomDropdownScroll';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomTextInputIcon from '../../../common/CustomTextInputIcon';
import CustomTextInput from '../../../common/CustomTextInput';
import BottomSheetCustom from '../../../common/CutomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import CutomSearchTextInputIcon from '../../../common/CutomSearchTextInputIcon';
import moment from 'moment';
import md5 from 'md5';
import { useDispatch, useSelector } from 'react-redux';
import { CpfCnpjSearchRequest } from '../../../../store/reducer/cpfCnpjReducer/cpfCnpjActions';
import { checkInternetConnection, formatCnpj, formatCpf, formatNumericDate, isCNPJ, isCPF, isValidDate } from '../../../../utils/globalFunctions';
import { realmContext } from '../../../../database/database';
import Loader from '../../../common/Loader';
import { clearCpfCnpjData } from '../../../../store/reducer/cpfCnpjReducer';
import { cpfCnpjExists, deleteCliente, insertSingleCliente, updateCliente } from '../../../../database/ClienteDao';
import DeviceInfo from 'react-native-device-info';
import { FKNconstants } from '../../../constants';
import { SetPayload } from './payload';
import { ClienteCadastroRequest } from '../../../../store/reducer/clientsReducer/clienteCadastroActions';
import clientsReducer, { clearClienteCadastro, enderecoCodigoNumber, setCnpjAddressStored, setLodingOff, setLodingOn } from '../../../../store/reducer/clientsReducer';
import Toast from 'react-native-toast-message';
import { ShowToastMessage } from '../../../../utils/ShowToastMessage';
import { insertEndereco } from '../../../../database/EnderecoDao';
const Clientetab = ({ navigation, route }: any) => {
    const isEdit = route && route.params && route.params.clienteEdit;
    const registerData: any = useSelector((state: any) => state.registerReducer);
    const loginData: any = useSelector((state: any) => state.loginReducer);

    const cnpjData: any = useSelector((state: any) => state.cpfCnpjReducer);

    const cadastroClienteData: any = useSelector((state: any) => state.clientsReducer);
    const fknIdEmpresa = loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa;


    const dispatch = useDispatch<any>();
    const realm = realmContext.useRealm();

    const [fknIdCliente, setFknIdCliente] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');
    const [situacao, setSituacao] = useState<any>('');
    const [tipo, setTipo] = useState('JURIDICO');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [fantasia, setFantasia] = useState('');
    const [rgIe, setRgIe] = useState('');
    const [email, setEmail] = useState('');
    const [emailNfe, setEmailNfe] = useState('');
    const [idFundacao, setIdFundacao] = useState('');
    const [observacao, setObservacoes] = useState('');
    const [cnae, setCnae] = useState('');
    const [classificacao, setClassificao] = useState<any>('');
    const [idPortador, setIdPortador] = useState<any>('');
    const [idPrazo, setIdPrazo] = useState<any>('');
    const [idTransportadora, setIdTransportadora] = useState<any>('');
    const [idRegiao, setIdRegiao] = useState<any>('');
    const [idRamo, setIdRamo] = useState<any>('');
    const [idSegmento, setIdSegmento] = useState<any>('');
    const [telefone, setTelefone] = useState('');
    const [celular, setCelular] = useState('');
    const [fax, setFax] = useState('');

    const [tipoError, setTipoError] = useState(false);
    const [cpfCnpjError, setCpfCnpjError] = useState(false);
    const [razaoSocialError, setRazaoSocialError] = useState(false);
    const [fantasiaError, setFantasiaError] = useState(false);
    const [rgIeError, setRgIeError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailNfeError, setEmailNfeError] = useState(false);
    const [idRegiaoError, setIdRegiaoError] = useState(false);
    const [idRamoError, setIdRamoError] = useState(false);
    const [contatoError, SetContatoError] = useState(false);
    const [idFundacaoError, setIdFundacaoError] = useState(false);
    const [ultContato, setUltContato] = useState('');
    const [ultOrcamento, setUltOrcamento] = useState('');
    const [ultVenda, setUltVenda] = useState('');
    const [tabelaPadrao, setTabelaPadrao] = useState('');
    const [openSheet, setOpenSheet] = useState(false);
    const [searchType, setSearchType] = useState('');
    const [searchedData, setSearchedData] = useState([]);

    const [uniqueId, setUniqueId] = useState<string>('');
    const [deviceModel, setDeviceModel] = useState<string>('');

    const [cnpjSearchCalled, setCnpjSearchCalled] = useState(false);

    const [novoCadastro, setNovoCadastro] = useState<boolean>(true);
    const [permiteAltPortador, setPermiteAltPortador] = useState('');
    const [permiteAltPrazoPgto, setPermiteAltPrazoPgto] = useState('');
    const [vendedor, setVendedor] = useState('');

    const [showObservacao,SetShowObservacao] = useState<boolean>(false);

    const ramoData: any = realm.objects('ramo');
    const segmentoData: any = realm.objects('segmento');
    const regiaoData: any = realm.objects('regiao');
    const portadorData: any = realm.objects('portador');
    const transportadoraData: any = realm.objects('transportadora');
    const prazoPagamentoData: any = realm.objects('prazoPagamento');
    const classificacaoClienteRealm: any = realm.objects('classificacaoCliente');
    const ParametroRealm: any = realm.objects('parametro');
    const parameterData = ParametroRealm.length > 0 ? ParametroRealm[0] : null;

    const ocultarObsCadCliente = parameterData != null ? parameterData.ocultarObsCadCliente : false;

    const situacaoData: any = realm.objects('situacao');
    //console.log("parameterData---", situacaoData);

    const isLoading = cnpjData.loading || cadastroClienteData.loading;

    //console.log("Realm store --", realm.objects('segmento'), "\nRamo", realm.objects('ramo'), "\nRegiao", realm.objects('regiao'), "\nportadora", realm.objects('portador'), "\ntransportadora", realm.objects('transportadora'));

    const onGoback = () => {
        navigation.pop()
    }

    const AlertOnClienteRegister = () => {
        Alert.alert(FKNconstants.message, FKNconstants.afterClienteRegistrationAsk, [
            {
                text: FKNconstants.no,
                onPress: () => onGoback(),
                style: 'cancel',
            },
            {
                text: FKNconstants.yes,
                onPress: () => onGoback(),
                style: 'default',
            }
        ])
    }
    useEffect(() => {
        if (cadastroClienteData && cadastroClienteData.clienteCadastro && cadastroClienteData.clienteCadastro.FKN) {
            const { FKN } = cadastroClienteData.clienteCadastro;
            if (FKN.Processamento && FKN.Processamento.codigoRetorno === 2) {
                insertClienteToDb({ enviar: false })
            }
        }
    }, [cadastroClienteData]);
    const filterPortadorItem = (id: any) => {
        const portadorData = realm.objects('portador')
        if (portadorData.length) {
            const data = portadorData.filtered('idPortador = $0 AND idEmpresaFK = $1', id, fknIdEmpresa);
            if (data.length) {
                return data[0];
            } else {
                return ''
            }
        }
        return '';
    }
    const filterPrazoItem = (id: any) => {
        if (prazoPagamentoData.length) {
            const data = prazoPagamentoData.filtered('idPrazoPagamento = $0 AND idEmpresaFK = $1', id, fknIdEmpresa);
            if (data.length) {
                return data[0];
            } else {
                return ''
            }
        }
        return '';
    }
    const filterTransportadoraItem = (id: any) => {
        if (transportadoraData.length) {
            const data = transportadoraData.filtered('idTransportadora = $0 AND idEmpresaFK = $1', id, fknIdEmpresa);
            if (data.length) {
                return data[0];
            } else {
                return ''
            }
        }
        return '';
    }
    const filterRegiaoItem = (id: any) => {
        if (regiaoData.length) {
            const data = regiaoData.filtered('idRegiao = $0 AND idEmpresaFK = $1', id, fknIdEmpresa);
            if (data.length) {
                return data[0];
            } else {
                return ''
            }
        }
        return '';
    }
    const filterRamoItem = (id: any) => {
        if (ramoData.length) {
            const data = ramoData.filtered('idRamo = $0 AND idEmpresaFK = $1', id, fknIdEmpresa);
            if (data.length) {
                return data[0];
            } else {
                return ''
            }
        }
        return '';
    }
    const filterSegmentoItem = (id: any) => {
        if (segmentoData.length) {
            const data = segmentoData.filtered('idSegmento = $0 AND idEmpresaFK = $1', id, fknIdEmpresa);
            if (data.length) {
                return data[0];
            } else {
                return ''
            }
        }
        return '';
    }
    const filterSituacaoItem = (id: any) => {
        if (situacaoData.length) {
            const data = situacaoData.filtered('idSituacao = $0 AND idEmpresaFK = $1', id, fknIdEmpresa);
            if (data.length) {
                if (data[0].descricao === 'BLOQUEADO') {
                    AlertOnInvalidField()
                }
                return data[0];
            } else {
                return '';
            }
        }
        return '';
    }
    const filterClassificacaoClienteItem = (id: any) => {
        if (classificacaoClienteRealm.length) {
            const data = classificacaoClienteRealm.filtered('idClassificacao = $0 AND idEmpresaFK = $1', id, fknIdEmpresa);
            if (data.length) {
                return data[0];
            } else {
                return ''
            }
        }
        return '';
    }
    const AlertOnInvalidField = () => {
        Alert.alert(FKNconstants.alert, FKNconstants.bloackedCliente, [
            {
                text: 'Ok',
                onPress: () => console.log('Ok Pressed'),
                style: 'cancel',
            },
        ])
    }

    useEffect(() => {
        if (isEdit && cadastroClienteData.selectedCliente) {
            const {
                _id, atualizado, celular, cnae, cpfCnpj, dtCadastro, dtFundacao, dtUltCon, dtUltOrc, dtUltVen, email, emailNfe, enderecoData, enviado, fantasia, fax,
                idClassificacaoFK,
                idCliente,
                idClienteWeb,
                idEmpresaFK,
                idPortadorFK,
                idPrazoPagamentoFK,
                idProspeccaoFK,
                idRamoFK,
                idRegiaoFK,
                idSegmentoFK,
                idSituacaoFK,
                idTransportadoraFK,
                idVendedor,
                novoCadastro,
                obsCadastral,
                permiteAltPortador,
                permiteAltPrazoPgto,
                razaoSocial,
                rgIe,
                tabelaPadrao,
                telefone,
                tipo,
                uc,
                uo,
                uv
            } = cadastroClienteData.selectedCliente;
            console.log("idVendedor", idVendedor);

            setClassificao(idClassificacaoFK ? filterClassificacaoClienteItem(idClassificacaoFK) : '')
            setDataCadastro(dtCadastro);
            setTipo(tipo);
            setCpfCnpj(cpfCnpj);
            setEmail(email);
            setEmailNfe(emailNfe);
            setFantasia(fantasia);
            setCelular(celular);
            setTelefone(telefone);
            setFax(fax);
            setRgIe(rgIe);
            setRazaoSocial(razaoSocial);

            setIdFundacao(dtFundacao ? moment(dtFundacao).format('DD/MM/yyyy') : '');
            if (cnae) {
                setCnae(cnae)
            }
            setFknIdCliente(idClienteWeb);
            setIdPortador(filterPortadorItem(idPortadorFK));
            setIdPrazo(filterPrazoItem(idPrazoPagamentoFK));
            setIdTransportadora(filterTransportadoraItem(idTransportadoraFK));
            setIdRegiao(filterRegiaoItem(idRegiaoFK));
            setIdRamo(filterRamoItem(idRamoFK));
            setIdSegmento(filterSegmentoItem(idSegmentoFK));
            if(ocultarObsCadCliente){
                SetShowObservacao(false)
            }else{
                SetShowObservacao(true);
                setObservacoes(obsCadastral);
            }
            setUltContato(dtUltCon ? moment(dtUltCon).format('DD/MM/yyyy') : '');
            setUltOrcamento(dtUltOrc ? moment(dtUltOrc).format('DD/MM/yyyy') : '');
            setUltVenda(dtUltVen ? moment(dtUltVen).format('DD/MM/yyyy') : '');
            if (filterSituacaoItem(idSituacaoFK) !== '') {
                setSituacao(filterSituacaoItem(idSituacaoFK))
            } else {
                const idSituacao = parameterData != null ? parameterData.idSituacao : false;
                setSituacao(filterSituacaoItem(idSituacao));
            }
            setTabelaPadrao(tabelaPadrao),
                setNovoCadastro(novoCadastro ? true : false);
            setPermiteAltPortador(permiteAltPortador);
            setPermiteAltPrazoPgto(permiteAltPrazoPgto);
            setVendedor(idVendedor);
        } else if (cadastroClienteData.fknVendasidCliente) {
            setFknIdCliente(cadastroClienteData.fknVendasidCliente);
            const idTransportadoraPadrao = parameterData != null ? parameterData.idTransportadoraPadrao : false;
            const idPrazoPadrao = parameterData != null ? parameterData.idPrazoPadrao : false;
            const idPortadorPadrao = parameterData != null ? parameterData.idPortadorPadrao : false;
            const idClassificacao = parameterData != null ? parameterData.idClassificacaoPadrao : false;
            const idSituacao = parameterData != null ? parameterData.idSituacao : false;
            if (idTransportadoraPadrao) {
                setIdTransportadora(filterTransportadoraItem(idTransportadoraPadrao))
            }
            if (idPrazoPadrao) {
                setIdPrazo(filterPrazoItem(idPrazoPadrao));
            }
            if (idPortadorPadrao) {
                setIdPortador(filterPortadorItem(idPortadorPadrao));
            }
            if (idClassificacao) {
                setClassificao(filterClassificacaoClienteItem(idClassificacao))
            }
            if (idSituacao) {
                console.log("filterSituacaoItem------", filterSituacaoItem(idSituacao));
                setSituacao(filterSituacaoItem(idSituacao))
            }else{
                setSituacao({
                    "descricao": "PRE-CADASTR",
                    "idSituacao": 3,
                })
            }
        }
    }, [cadastroClienteData.selectedCliente])

    useEffect(() => {
        GetDeviceUniqueID();
    }, []);
    const GetDeviceUniqueID = () => {
        const model = DeviceInfo.getModel();
        setDeviceModel(model);
        DeviceInfo.getUniqueId().then((uniqueId) => {
            setUniqueId(uniqueId);
        });
    }
    useEffect(() => {
        if (cnpjData && cnpjData.data && cnpjData.data[0] && cnpjData.data[0].cnpj) {
            const { razao_social, ddd_1, telefone_1, ddd_2, ddd_fax, telefone_2, num_fax, email, cnae_fiscal, nome_fantasia, bairro, cep, complemento, numero, uf, logradouro, municipio } = cnpjData.data[0];
            console.log("CNPJ data from api", cnpjData.data, "cadastroClienteData", cadastroClienteData.cnpjAddress);

            setEmail(email);
            setRazaoSocial(razao_social);
            setTelefone(telefone_1);
            setCelular(telefone_2);
            setFax(num_fax);
            setCnae(cnae_fiscal);
            setFantasia(nome_fantasia);

            const payload: any = {
                idEnderecoWeb: cadastroClienteData.enderecoCodigo,
                idEndereco: cadastroClienteData.enderecoCodigo,
                endFaturamento: 1,
                nome: 'Cobrança',
                endereco: logradouro,
                numero: numero,
                complemento: complemento,
                cep: cep,
                bairro: bairro,
                cidade: municipio,
                estado: uf,
                // atualizado: item.atualizado ? 1 : 0, // at update time set it to true
                idCliente: fknIdCliente,
                idEmpresa: fknIdEmpresa,
                novoEndereco: true, // at register set it to true
                enviar: true,
            }
            if (!cadastroClienteData.cnpjAddress && insertEndereco(payload, realm, loginData)) {
                dispatch(setCnpjAddressStored(true));
                dispatch(enderecoCodigoNumber());
            }
            dispatch(clearCpfCnpjData());
        }
    }, [cnpjData]);

    const bottomSheetRef = useRef<BottomSheet>(null);

    const openBottomSheet = (item: any) => {

        if (bottomSheetRef.current) {
            bottomSheetRef.current.expand();
        }
    };
    const onSeachOpenBottomSheet = (item: any) => {
        if (item === 'idRamo') {
            setSearchedData(ramoData)
        } else if (item === 'idTransportadora') {
            setSearchedData(transportadoraData)
        } else if (item === 'idRegiao') {
            setSearchedData(regiaoData)
        } else if (item === 'idSegmento') {
            setSearchedData(segmentoData)
        } else if (item === 'idPortador') {
            setSearchedData(portadorData)
        } else if (item === 'idPrazo') {
            setSearchedData(prazoPagamentoData);
        } else {
            setSearchedData([]);
        }

        setOpenSheet(!openSheet);
        setSearchType(item);
        openBottomSheet(item);
    }
    const onEraserClick = (item: any) => {
        if (item === 'idPortador') {
            setIdPortador('');
        } else if (item === 'idPrazo') {
            setIdPrazo('')
        } else if (item === 'idTransportadora') {
            setIdTransportadora('');
        }
    }
    const closeBottomSheet = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.close();
        }
        setOpenSheet(false);
    };

    const insertClienteToDb = async ({ enviar }: any) => {

        let payload = SetPayload({
            fknIdCliente,
            razaoSocial,
            fantasia,
            tipo,
            cpfCnpj,
            rgIe,
            telefone,
            celular,
            fax,
            email,
            emailNfe,
            idFundacao,
            cnae,
            idRamo: (idRamo.idRamo),
            idRegiao: (idRegiao.idRegiao),
            idPortador,
            idPrazo,
            idTransportadora,
            idSegmento,
            idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
            permiteAltPortador,
            permiteAltPrazoPgto,
            classificacao
        });
        const permAltPortadorPrazo = parameterData != null ? parameterData.permAltPortadorPrazo : false;
        if(permAltPortadorPrazo){
            payload["permiteAltPortador"] = 1;
            payload["permiteAltPrazoPgto"] = 1;
        }
        const payloadCliente = { ...payload, enviar: enviar, novoCadastro: novoCadastro }

        const value = await insertSingleCliente(payloadCliente, realm, loginData);
        if (value) {
            dispatch(setLodingOff());
            dispatch(clearClienteCadastro());
            ShowToastMessage({ type: 'success', message1: FKNconstants.insertClienteSuccessfully });
            AlertOnClienteRegister();
        } else {
            dispatch(setLodingOff());
            ShowToastMessage({ type: 'error', message1: FKNconstants.insertClienteError });
            return
        }
    }


    const checkCpfCnpjValid = () => {
        if (tipo === 'JURIDICO' && !isCNPJ(cpfCnpj.replaceAll('.', '').replace('/', '').replace('-', '').slice(0, 14))) {
            ShowToastMessage({ type: 'error', message1: FKNconstants.invalidCnpj });
            //AlertOnInvalidField(FKNconstants.invalidCnpj);
            return true;
        } else if (tipo !== 'JURIDICO' && !isCPF(cpfCnpj.replaceAll('.', '').replace('-', '').slice(0, 11))) {
            ShowToastMessage({ type: 'error', message1: FKNconstants.invalidCpf })
            //AlertOnInvalidField(FKNconstants.invalidCpf);
            return true;
        }
        return false;
    }

    const onAddressEmptyAlert = (message: string) => {
        Alert.alert(FKNconstants.message, message, [
            {
                text: 'Ok',
                onPress: () => console.log('Ok Pressed'),
                style: 'cancel',
            },
        ])
    }

    const onFabButtonClick = async () => {

        //deleteCliente(realm);

        const internetCheck = await checkInternetConnection();

        if (!cpfCnpj.length) {
            setCpfCnpjError(true)
        } else {
            setCpfCnpjError(false);
        }
        if (!razaoSocial.length) {
            setRazaoSocialError(true);
        } else {
            setRazaoSocialError(false);
        }
        if (!fantasia.length) {
            setFantasiaError(true);
        } else {
            setFantasiaError(false);
        }
        if (!rgIe.length) {
            setRgIeError(true);
        } else {
            setRgIeError(false);
        }
        if (!telefone.length && !celular.length && !fax.length) {
            SetContatoError(true);
        } else {
            SetContatoError(false);
        }
        if (!email.length) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
        if (!emailNfe.length) {
            setEmailNfeError(true);
        } else {
            setEmailNfeError(false);
        }
        if (!idRegiao) {
            setIdRegiaoError(true);
        } else {
            setIdRegiaoError(false);
        }
        if (!idRamo) {
            setIdRamoError(true)
        } else {
            setIdRamoError(false)
        }
        if (idFundacao && !isValidDate(idFundacao)) {
            setIdFundacaoError(true);
        } else {
            setIdFundacaoError(false);
        }
        if (!cpfCnpj.length || !razaoSocial.length || !fantasia.length || !rgIe.length || (!telefone.length && !celular.length && !fax.length) || !email.length || !emailNfe.length || !idRegiao || !idRamo || (idFundacao && !isValidDate(idFundacao))) {
            return;
        }
        if (checkCpfCnpjValid()) {
            return
        }
        if (!isEdit) {
            if (cpfCnpjExists(realm, cpfCnpj, fknIdEmpresa)) {
                onAddressEmptyAlert(FKNconstants.alreadyRegisteredCpfCnpj);
                return;
            }
        }
        const resultsEndereco: any = realm.objects('endereco')
            .filtered('idEmpresaFK = $0 AND idClienteFK = $1', fknIdEmpresa, fknIdCliente);
        if (resultsEndereco.length > 0) {
            let temEnd = false;
            let temFat = false;
            for (const item of resultsEndereco) {
                if (item.endFaturamento)
                    temFat = true;
                else
                    temEnd = true;

                if (temEnd && temFat) {
                    break;
                }
            }
            if (!temEnd || !temFat) {
                onAddressEmptyAlert(FKNconstants.clienteBillingAddressEmpty);
                return;
            }
        } else {
            onAddressEmptyAlert(FKNconstants.clienteAddressEmpty);
            return;
        }
        const resultsContato: any = realm.objects('contato')
            .filtered('idEmpresaFK = $0 AND idClienteFK = $1', fknIdEmpresa, fknIdCliente);
        if (resultsContato.length <= 0) {
            onAddressEmptyAlert(FKNconstants.clienteContatoEmpty);
            return;
        }


        let payload: any = SetPayload({
            fknIdCliente,
            razaoSocial,
            fantasia,
            tipo,
            cpfCnpj,
            rgIe,
            telefone,
            celular,
            fax,
            email,
            emailNfe,
            idFundacao,
            cnae,
            idRamo: (idRamo.idRamo),
            idRegiao: (idRegiao.idRegiao),
            idPortador,
            idPrazo,
            idTransportadora,
            idSegmento,
            idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
            permiteAltPortador,
            permiteAltPrazoPgto,
            dataCadastro,
            classificacao,
            vendedor
        });
        if (tabelaPadrao) {
            payload["tabelaPadrao"] = tabelaPadrao;
        }
        const newPayload = {
            cliente: {
                ...payload,
                //android: uniqueId, 
                token: loginData.data.usuario_api.token
            },
            url: registerData && registerData.data.FKN.url
        }

        if (isEdit) {
            console.log("Cliente Insert payload", novoCadastro);
            const bloqAtuCliente = parameterData != null ? parameterData.bloqAtuCliente : false;
            if (novoCadastro) {
                ShowToastMessage({ type: 'error', message1: FKNconstants.clienteNewRegistrationError });
                return;
            }else if(bloqAtuCliente){
                ShowToastMessage({ type: 'error', message1: FKNconstants.clienteUpdateNotAllowed });
                return;
            } else {
                payload["enviar"] = true;
                payload["atualizado"] = true;
                console.log("Update cliente Payload", payload);
                const success: any = await updateCliente(payload, realm, loginData);
                if (success) {
                    ShowToastMessage({ type: 'success', message1: FKNconstants.updatedSuccessfully });
                } else {
                    ShowToastMessage({ type: 'error', message1: FKNconstants.updateError });
                }
            }

        } else {
            if (!internetCheck) {
                dispatch(setLodingOn());
                dispatch(ClienteCadastroRequest(newPayload));
            } else {
                dispatch(setLodingOn());
                insertClienteToDb({ enviar: true });
            }
        }


    }

    const FabButton = () => (
        <FAB
            icon="content-save"
            color={theme.COLORS.BLACK}
            style={styles.fab}
            onPress={() => onFabButtonClick()}
        />
    );
    const onTipoSelect = (value: any) => {
        setTipo(value);
        setCpfCnpj('')
    }

    const onChangeFieldValue = (value: string, fieldName: string) => {
        if (fieldName === 'cpfcnpj') {
            if (tipo !== 'JURIDICO') {
                setCpfCnpj(formatCpf(value))
            } else {
                setCpfCnpj(formatCnpj(value))
                setCnpjSearchCalled(false);
            }
            setCpfCnpjError(false);
        }
        if (fieldName === 'razaoSocial') {
            setRazaoSocial(value.toUpperCase());
            setRazaoSocialError(false)
        }
        if (fieldName === 'fantasia') {
            setFantasia(value.toUpperCase());
            setFantasiaError(false);
        } else if (fieldName === 'rgIe') {
            setRgIe(value.toUpperCase());
            setRgIeError(false)
        } else if (fieldName === 'telefone') {
            setTelefone(value)
            SetContatoError(false)
        } else if (fieldName === 'celular') {
            setCelular(value)
            SetContatoError(false)
        } else if (fieldName === 'fax') {
            setFax(value);
            SetContatoError(false);
        } else if (fieldName === 'email') {
            setEmail(value);
            setEmailError(false);
        } else if (fieldName === 'emailNfe') {
            setEmailNfe(value);
            setEmailNfeError(false);
        } else if (fieldName === 'idFundacao') {
            setIdFundacao(formatNumericDate(value))
        } else if (fieldName === 'cnae') {
            setCnae(value);
        } else if (fieldName === 'classificacao') {
            setClassificao(value.toUpperCase());
        } else if (fieldName === 'observacao') {
            setObservacoes(value)
        }
    }


    const onCpfCnpjSearch = () => {
        if (tipo !== 'JURIDICO' || cpfCnpj.length < 18) {
            return;
        }
        if (checkCpfCnpjValid()) {
            return
        }
        const todayDate = moment().format('YYYYMMDD') + registerData.data.FKN.contrato;
        const cnpjNumber = cpfCnpj.replaceAll('.', '').replace('/', '').replace('-', '').slice(0, 14)
        const payload = {
            view: 'get',
            formato: 'json',
            cnpj: cnpjNumber,//79583472000174,
            usuario: loginData.verifyData.FKN.vendedores[0].vendedor.usuario,
            contrato: registerData.data.FKN.contrato,
            token: md5(todayDate)
        }
        setCnpjSearchCalled(true);
        dispatch(CpfCnpjSearchRequest(payload));
    }
    const onDial = (phone: any) => {
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phone}`;
        } else {
            phoneNumber = `tel:${phone}`;
        }
        Linking.openURL(phoneNumber)
    }
    const onIconClick = (type: string) => {
        if (type === 'cpfcnpj') {
            onCpfCnpjSearch()
        } else if (type === 'telefone') {
            if (telefone)
                onDial(telefone);
        } else if (type === 'celular') {
            if (celular)
                onDial(celular);
        } else if (type === 'fax') {
            if (fax)
                onDial(fax);
        }

    }
    const onSelectFromBottomSheet = (item: any) => {
        if (searchType === 'idRamo') {
            setIdRamo(item)
        } else if (searchType === 'idTransportadora') {
            setIdTransportadora(item)
        } else if (searchType === 'idRegiao') {
            setIdRegiao(item)
        } else if (searchType === 'idSegmento') {
            setIdSegmento(item)
        } else if (searchType === 'idPortador') {
            setIdPortador(item)
        } else if (searchType === 'idPrazo') {
            setIdPrazo(item)
        }
        closeBottomSheet()
    }

    const onFocusCNPJSearch = async () => {
        const internetCheck = await checkInternetConnection();

        if (!cnpjSearchCalled && internetCheck && !isEdit) {
            onCpfCnpjSearch()
        }
    }


    return (
        <View style={styles.mainContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={styles.subContainer}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                    contentContainerStyle={{ paddingBottom: 150 }}
                >
                    {isEdit ?
                        <>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                <View style={[styles.fieldContainer, { width: '45%' }]}>
                                    <Text style={[styles.fieldLabel, { color: razaoSocialError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.clienteIdCodigo}</Text>
                                    <CustomTextInput
                                        fieldName='clienteCodigo'
                                        value={fknIdCliente}
                                        onChangeFieldValue={onChangeFieldValue}
                                        editable={false}
                                    />
                                </View>
                                <View style={[styles.fieldContainer, { width: '45%' }]}>
                                    <Text style={[styles.fieldLabel, { color: razaoSocialError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.clienteDataCadastro}</Text>
                                    <CustomTextInput
                                        fieldName='dataCadastro'
                                        value={dataCadastro ? moment(dataCadastro).format('DD/MM/yyyy') : ''}
                                        onChangeFieldValue={onChangeFieldValue}
                                        editable={false}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={[styles.fieldContainer, { width: '45%' }]}>
                                    <Text style={[styles.fieldLabel, { color: tipoError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.tipo}*</Text>
                                    <DropdownField
                                        items={clienteCadastroTipo}
                                        selectedItem={tipo}
                                        setSelectedItem={onTipoSelect}
                                        disabled={true}
                                    />
                                </View>
                                <View style={[styles.fieldContainer, { width: '45%' }]}>
                                    <Text style={[styles.fieldLabel, { color: razaoSocialError ? theme.COLORS.ERROR : theme.COLORS.BLACK, marginBottom: theme.moderateScale(10) }]}>{FKNconstants.clienteSituacao}</Text>
                                    <CustomTextInput
                                        fieldName='situacao'
                                        value={situacao ? situacao.descricao : ''}
                                        onChangeFieldValue={onChangeFieldValue}
                                        editable={false}
                                    />
                                </View>
                            </View>
                        </> :
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel, { color: tipoError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.tipo}*</Text>
                            <DropdownField
                                items={clienteCadastroTipo}
                                selectedItem={tipo}
                                setSelectedItem={onTipoSelect}
                            />
                        </View>}
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: cpfCnpjError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.cpfcnpj}*</Text>
                        <CustomTextInputIcon
                            fieldName='cpfcnpj'
                            value={cpfCnpj}
                            onChangeFieldValue={onChangeFieldValue}
                            onIconClick={onIconClick}
                            type='number-pad'
                            maxLength={tipo != 'JURIDICO' ? 14 : 18}
                            editable={isEdit ? false : true}
                            onSubmitTextInput={() => onFocusCNPJSearch()}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: razaoSocialError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.razaoSocial}*</Text>
                        <CustomTextInput
                            fieldName='razaoSocial'
                            value={razaoSocial}
                            onChangeFieldValue={onChangeFieldValue}
                            onFocusTextInput={() => onFocusCNPJSearch()}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: fantasiaError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.fantasia}*</Text>
                        <CustomTextInput
                            fieldName='fantasia'
                            value={fantasia}
                            onChangeFieldValue={onChangeFieldValue}
                            onFocusTextInput={() => onFocusCNPJSearch()}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: rgIeError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.rgIe}*</Text>
                        <CustomTextInput
                            fieldName='rgIe'
                            value={rgIe}
                            onChangeFieldValue={onChangeFieldValue}
                            onFocusTextInput={() => onFocusCNPJSearch()}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: contatoError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.contatos}*</Text>
                        <CustomTextInputIcon
                            fieldName='telefone'
                            value={telefone}
                            onChangeFieldValue={onChangeFieldValue}
                            onIconClick={onIconClick}
                            type='phone-pad'
                            placeholderText={FKNconstants.telephone}
                            iconName='phone'
                            onFocusTextInput={() => onFocusCNPJSearch()}
                        />
                        <CustomTextInputIcon
                            fieldName='celular'
                            value={celular}
                            onChangeFieldValue={onChangeFieldValue}
                            onIconClick={onIconClick}
                            type='phone-pad'
                            placeholderText={FKNconstants.celular}
                            iconName='phone'
                            onFocusTextInput={() => onFocusCNPJSearch()}
                        />
                        <CustomTextInputIcon
                            fieldName='fax'
                            value={fax}
                            onChangeFieldValue={onChangeFieldValue}
                            onIconClick={onIconClick}
                            type='phone-pad'
                            placeholderText={FKNconstants.fax}
                            iconName='phone'
                            onFocusTextInput={() => onFocusCNPJSearch()}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: emailError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.email}*</Text>
                        <CustomTextInput
                            fieldName='email'
                            value={email}
                            onChangeFieldValue={onChangeFieldValue}
                            onFocusTextInput={() => onFocusCNPJSearch()}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: emailNfeError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.emailNfe}*</Text>
                        <CustomTextInput
                            fieldName='emailNfe'
                            value={emailNfe}
                            onChangeFieldValue={onChangeFieldValue}
                            onFocusTextInput={() => onFocusCNPJSearch()}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>{FKNconstants.dataFundacao}</Text>
                        <CustomTextInput
                            fieldName='idFundacao'
                            value={idFundacao}
                            onChangeFieldValue={onChangeFieldValue}
                            type='phone-pad'
                            maxLength={10}
                            placeholder={FKNconstants.dataFundacaoPlaceholder}
                            onFocusTextInput={() => onFocusCNPJSearch()}
                        />
                        {idFundacaoError && <Text style={[styles.fieldLabel, { color: theme.COLORS.ERROR }]}>{FKNconstants.dataFundacaoValid}</Text>}
                    </View>
                    {showObservacao &&
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel, { color: emailNfeError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.clienteObservacao}</Text>
                            <CustomTextInput
                                fieldName='observacao'
                                value={observacao}
                                onChangeFieldValue={onChangeFieldValue}
                                onFocusTextInput={() => onFocusCNPJSearch()}
                                maxLength={599}
                            />
                        </View>}
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>{FKNconstants.cnae}</Text>
                        <CustomTextInput
                            fieldName='cnae'
                            value={cnae}
                            onChangeFieldValue={onChangeFieldValue}
                            type='number-pad'
                            maxLength={10}
                            onFocusTextInput={() => onFocusCNPJSearch()}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>{FKNconstants.classificacao}</Text>
                        <CustomTextInput
                            fieldName='classificacao'
                            value={classificacao ? `${classificacao.sigla} - ${classificacao.descricao}` : ''}
                            onChangeFieldValue={onChangeFieldValue}
                            editable={false}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>{FKNconstants.portador}</Text>
                        <CutomSearchTextInputIcon
                            fieldName='idPortador'
                            value={idPortador && idPortador.descricao}
                            onChangeFieldValue={onSeachOpenBottomSheet}
                            onEraserClick={onEraserClick}
                            placeholder={FKNconstants.portadorPlaceholder}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>{FKNconstants.prazo}</Text>
                        <CutomSearchTextInputIcon
                            fieldName='idPrazo'
                            value={idPrazo && idPrazo.descricao}
                            onChangeFieldValue={onSeachOpenBottomSheet}
                            onEraserClick={onEraserClick}
                            placeholder={FKNconstants.prazoPlaceholder}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>{FKNconstants.transportadora}</Text>
                        <CutomSearchTextInputIcon
                            fieldName='idTransportadora'
                            value={idTransportadora && idTransportadora.descricao}
                            onChangeFieldValue={onSeachOpenBottomSheet}
                            onEraserClick={onEraserClick}
                            placeholder={FKNconstants.transportadoraplaceholder}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: idRegiaoError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.regiao}*</Text>
                        <CutomSearchTextInputIcon
                            fieldName='idRegiao'
                            value={idRegiao && idRegiao.descricao}
                            onChangeFieldValue={onSeachOpenBottomSheet}
                            placeholder={FKNconstants.regiaoPlaceholder}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: idRamoError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.ramo}*</Text>
                        <CutomSearchTextInputIcon
                            fieldName='idRamo'
                            value={idRamo && idRamo.descricao}
                            onChangeFieldValue={onSeachOpenBottomSheet}
                            placeholder={FKNconstants.ramoPlaceholder}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>{FKNconstants.segmento}</Text>
                        <CutomSearchTextInputIcon
                            fieldName='idSegmento'
                            value={idSegmento && idSegmento.descricao}
                            onChangeFieldValue={onSeachOpenBottomSheet}
                            placeholder={FKNconstants.segmentoPlaceholder}
                        />
                    </View>
                    {isEdit &&
                        <>
                            <View style={styles.infoStyle}>
                                <Text style={styles.fieldLabel}>{FKNconstants.information}</Text>
                            </View>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldLabel}>{FKNconstants.tabelaPadrao}</Text>
                                <CustomTextInput
                                    fieldName='tabelaPadrao'
                                    value={tabelaPadrao}
                                    onChangeFieldValue={onChangeFieldValue}
                                    placeholder={FKNconstants.tabelaPadrao}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldLabel}>{FKNconstants.ultimoContato}</Text>
                                <CustomTextInput
                                    fieldName='dtUltCon'
                                    value={ultContato}
                                    placeholder={FKNconstants.ultimoContato}
                                    onChangeFieldValue={onChangeFieldValue}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldLabel}>{FKNconstants.ultimoOrcamento}</Text>
                                <CustomTextInput
                                    fieldName='dtUltOrc'
                                    value={ultOrcamento}
                                    placeholder={FKNconstants.ultimoOrcamento}
                                    onChangeFieldValue={onChangeFieldValue}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldLabel}>{FKNconstants.ultimoVenda}</Text>
                                <CustomTextInput
                                    fieldName='dtUltVen'
                                    value={ultVenda}
                                    placeholder={FKNconstants.ultimoVenda}
                                    onChangeFieldValue={onChangeFieldValue}
                                    editable={false}
                                />
                            </View>
                        </>
                    }
                </ScrollView>
            </KeyboardAvoidingView>
            {openSheet &&
                <BottomSheetCustom
                    bottomSheetRef={bottomSheetRef}
                    closeBottomSheet={closeBottomSheet}
                    data={searchedData}
                    onSelect={onSelectFromBottomSheet}
                    dataType={searchType}
                />
            }
            {FabButton()}
            {isLoading && <Loader />}
            <Toast />
        </View>
    );
}

export default Clientetab;