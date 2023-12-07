import { Alert, Modal, Platform, ScrollView, Text, View } from "react-native";
import styles from "./styles";
import { Appbar } from "react-native-paper";
import style from "../../styles";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from "../../theme";
import { FKNconstants } from "../../components/constants";
import CheckBox from "@react-native-community/checkbox";
import { useEffect, useState } from "react";
import Checkbox from "../../components/common/Checkbox";
import Button from "../../components/common/Button";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AgendaRequest } from "../../store/reducer/agendaReducer/agendaActions";
import { AbasRequest } from "../../store/reducer/abasReducer/adasActions";
import { ClientsRequest } from "../../store/reducer/clientsReducer/clientsActions";
import { ClassificationRequest } from "../../store/reducer/classificationReducer/classificationActions";
import { DepartmentRequest } from "../../store/reducer/departmentsReducer/departmentActions";
import { DuplicataRequest } from "../../store/reducer/duplicataReducer/duplicataActions";
import { CompanyRequest } from "../../store/reducer/companyReducer/companyActions";
import { AddressRequest } from "../../store/reducer/addressReducer/addressActions";
import { FilialRequest } from "../../store/reducer/filialReducer/filialActions";
import { NotasRequest } from "../../store/reducer/notasReducer/notasActions";
import { ModificationRequest } from "../../store/reducer/modificationReducer/modificationActions";
import { ReasonRequest } from "../../store/reducer/reasonReducer/ReasonActions";
import { CnpjVendedorRequest } from "../../store/reducer/cnpjVendedorReducer/cnpjVendedorActions";
import { ClienteMediaRequest } from "../../store/reducer/clienteMediaReducer/clienteMediaActions";
import { ComodatoRequest } from "../../store/reducer/comodatoReducer/comodatoActions";
import { ContatoRequest } from "../../store/reducer/contatoReducer/contatoActions";
import ProcessModal from "./sincronizarModal";
import NetInfo from "@react-native-community/netinfo";
import { setUserFirstSync, setUserIsLoggedOut } from "../../store/reducer/loginReducer";
import { ParameterRequest } from "../../store/reducer/parameterReducer/parameterActions";
import { PedidosCFOPRequest } from "../../store/reducer/pedidosCFOPSReducer/pedidosCFOPActions";
import { PortadoreRequest } from "../../store/reducer/portadoresReducer/portadoreActions";
import { RamosRequest } from "../../store/reducer/ramosReducer/ramosActions";
import { RecadosRequest } from "../../store/reducer/recadosReducer/recadosActions";
import { RegioesRequest } from "../../store/reducer/regioesReducer/regioesActions";
import { ResultRequest } from "../../store/reducer/resultadosReducer/resultActions";
import { SeparacaoRequest } from "../../store/reducer/separacaoReducer/separacaoActions";
import { SituacoesRequest } from "../../store/reducer/situacoesReducer/situacoesActions";
import { TabelaRequest } from "../../store/reducer/tabelaReducer/tabelaActions";
import { TransportadoraRequest } from "../../store/reducer/transportadoraReducer/transportadoraActions";
import { realmContext } from "../../database/database";
//import { useRealm } from "@realm/react";
// import realmConfig from "../../database/database";
import Realm from "realm";
import Agenda from "../../database/AgendaSchema";
import { insertCliente } from "../../database/ClienteDao";
import RealmHelper from "../../database/commonRealmHelper";
import moment from "moment";
import md5 from "md5";
import { SegmentoRequest } from "../../store/reducer/segmentoReducer/segmentoActions";
import { PrazoRequest } from "../../store/reducer/prazoReducer/prazoActions";
import { ProdutoRequest } from "../../store/reducer/produtoReducer/produtoActions";
// const {useObject, useQuery,useRealm } = createRealmContext(realmConfig);

const Sincronizar = (props: any) => {
    const { navigation } = props && props;
    const realm = realmContext.useRealm();
    // const realmObject = realmContext.useObject(Agenda, new Realm.BSON.ObjectId("653b83d28b20763ce160f2e4"));
    // const realmQuery = realmContext.useQuery(Agenda);
    const [syncChangesOnlyBox, setSyncChangesOnlyCheckBox] = useState<boolean>(true);
    const [forceFullSyncBox, setForceFullSyncCheckBox] = useState<boolean>(false);
    const [generalHistoryBox, setGeneralHistoryCheckBox] = useState<boolean>(false);
    const [textProduceBox, setTextProduceCheckBox] = useState<boolean>(false);
    const [productImagesBox, setProductImagesCheckBox] = useState<boolean>(false);
    const [submitOrdersBox, setSubmitOrdersCheckBox] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(true);
    const [openSynchronizeModal, setOpenSynchronizeModal] = useState<boolean>(false);
    const [apiProgress, setApiProgress] = useState(0);

    const dispatch = useDispatch<any>();

    const isFocused = useIsFocused();
    const registerData: any = useSelector((state: any) => state.registerReducer);
    const loginData: any = useSelector((state: any) => state.loginReducer);

    const firstSync = loginData && loginData.firstSync;
    //const todayDate = moment().format('YYYYMMDD')+registerData.data.FKN.contrato;
    //console.log("Realm store --",realm.objects('segmento'),"\nRamo",realm.objects('ramo'),"\nRegiao",realm.objects('regiao'),"\nportadora",realm.objects('portador'),"\ntransportadora",realm.objects('transportadora'),"PrazoPagamento",realm.objects('prazoPagamento'));

    //console.log("realmObject data", realmObject, "realmQuery", JSON.stringify(realmQuery.sorted('name')), " new Realm.BSON.ObjectId(),", new Realm.BSON.ObjectId("653b83d28b20763ce160f2e4"));
    const clienteRealm = realm.objects('cliente');
    //const results = realm.
    //console.log("clienteRealm-=--------", clienteRealm);

    //console.log("Cliente data from realm item--", realm.objects('cliente'),realm.schema.map((schema) => schema.name));
    //const item = realm.objectForPrimaryKey(Agenda, new Realm.BSON.ObjectId("653b8de851e197c81985b838"));
    function onRealmChange(clienteRealm: any, changes: any) {
        //console.log("Something changed!", changes, "clienteRealm", clienteRealm);
    }
    useEffect(() => {
        try {
            clienteRealm.addListener(onRealmChange);
        } catch (error) {
            console.error(
                `An exception was thrown within the change listener: ${error}`
            );
        }
        // Remember to remove the listener when you're done!
        return () => {
            clienteRealm.removeListener(onRealmChange);
        };
    }, [realmContext]);

    const drawerOpen = () => {
        navigation.openDrawer();
    };
    const requestCallPermissions = async () => {
        if (Platform.OS === 'android') {
            const status = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            console.log("Status permission android", status);
            if (status === RESULTS.BLOCKED) {
                // Handle the case where the user has denied permission and blocked it.
                //PermissionAlert();
            } else {
                const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
                console.log("result permissions", result, "RESULT", RESULTS);
                if (result === RESULTS.GRANTED) {
                    // Permission granted, you can now manage calls.
                } else if (result === RESULTS.DENIED) {
                    //PermissionAlert();
                } else if (result === RESULTS.BLOCKED) {
                    // if (!value)
                    //   requestCallPermissions(0);
                }
            }
        } else {
            // const status = await check(PERMISSIONS.IOS.CAMERA);
            // console.log("Status permission ios", status);
            // if (status === RESULTS.BLOCKED) {
            //     // Handle the case where the user has denied permission and blocked it.
            // } else {
            //     const result = await request(PERMISSIONS.IOS.CAMERA);
            //     console.log("Request permission ios", result);
            //     if (result === RESULTS.GRANTED) {
            //         // Permission granted, you can now manage calls.
            //     } else {
            //         // Permission denied, handle accordingly.
            //     }
            // }
        }
    };

    useEffect(() => {
        if (isFocused) {
            setTimeout(() => {
                setOpenModal(true);
                requestCallPermissions();
            }, 300);
        }
    }, [isFocused]);

    useEffect(() => {
        if (firstSync) {
            setSubmitOrdersCheckBox(false);
        }
        //else if () {}

        else {
            if (submitOrdersBox) {
                setSyncChangesOnlyCheckBox(false);
                setForceFullSyncCheckBox(false);
                setTextProduceCheckBox(false);
                setProductImagesCheckBox(false);
            }
        }
    }, [submitOrdersBox]);

    useEffect(() => {
        if (firstSync) {
            setSyncChangesOnlyCheckBox(true);
            setForceFullSyncCheckBox(true);
        } else {
            if (syncChangesOnlyBox) {
                setSubmitOrdersCheckBox(false);
            } else {
                setForceFullSyncCheckBox(false);
            }
        }
    }, [syncChangesOnlyBox]);

    useEffect(() => {
        if (firstSync) {
            setForceFullSyncCheckBox(true);
        }
    }, []);
    useEffect(() => {
        if (firstSync) {
            setSyncChangesOnlyCheckBox(true);
            setForceFullSyncCheckBox(true);
        } else {
            if (forceFullSyncBox) {
                setSyncChangesOnlyCheckBox(true);
                setSubmitOrdersCheckBox(false);
            }
        }
    }, [forceFullSyncBox]);

    useEffect(() => {
        if (firstSync) {
            setSyncChangesOnlyCheckBox(true);
            setForceFullSyncCheckBox(true);
        } else {
            if (textProduceBox) {
                setSubmitOrdersCheckBox(false);
            }
        }
    }, [textProduceBox]);

    useEffect(() => {
        if (firstSync) {
            setSyncChangesOnlyCheckBox(true);
            setForceFullSyncCheckBox(true);
        } else {
            if (productImagesBox) {
                setSubmitOrdersCheckBox(false);
            }
        }
    }, [productImagesBox]);

    const onCloseModal = () => {
        setOpenModal(false);
    }
    const onOkModal = () => {
        setOpenModal(false);
    }

    const attentionModal = () => {
        return (
            <Modal
                animationType={'fade'}
                visible={openModal}
                transparent={true}
            >
                <View style={styles.modalConatainer}>
                    <View
                        style={styles.modalSubConatiner}
                    >
                        <View style={styles.modalTitleContainer}>
                            <Text style={styles.modalTitle}>
                                {FKNconstants.attentionModal}
                            </Text>
                        </View>
                        <View style={styles.modalContentContainer}>
                            <Text style={styles.modalContentText}>{FKNconstants.content}</Text>
                        </View>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.modalCloseButton} onPress={onCloseModal}><Text style={styles.modalCloseButtonText}>{FKNconstants.close}</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.modalOkButton} onPress={onOkModal}><Text style={styles.modalOkButtonText}>{FKNconstants.ok}</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    const SuccessAlertOnSynchronization = () => {
        dispatch(setUserFirstSync(true));
        Alert.alert(FKNconstants.message, FKNconstants.successMessage, [
            {
                text: 'Ok',
                onPress: () => { navigation.navigate('Início') },
                style: 'cancel',
            },
        ]);
    }
    const AlertOnTokenInvalid = (message:string) => {
        Alert.alert(FKNconstants.message, message, [
            {
                text: 'Ok',
                onPress: () => { dispatch(setUserIsLoggedOut(false)) },
                style: 'cancel',
            },
        ]);
    }
    const SynchronizationAlert = (value: number) => {
        Alert.alert(FKNconstants.message, value ? FKNconstants.internetConnection : FKNconstants.selectAnyOption, [
            {
                text: 'Ok',
                onPress: () => console.log('Ok Pressed'),
                style: 'cancel',
            },
        ]);
    }
    const onSynchronize = async () => {
        var internetConnection = false;
        await NetInfo.fetch().then(state => {
            if (state.isConnected) {
                internetConnection = true
            }
        });
        if (!internetConnection) {
            SynchronizationAlert(1);
            return;
        }
        if (!syncChangesOnlyBox && !textProduceBox && !productImagesBox && !submitOrdersBox) {
            SynchronizationAlert(0);
            return;
        }

        const payloadAgenda = {
            url: registerData && registerData.data.FKN.url,
            agenda: {
                idVendedor: loginData.verifyData.FKN.vendedores[0].vendedor.idVendedorWeb,
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                download: 1,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadAbas = {
            url: registerData && registerData.data.FKN.url,
            abas: {
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadClient = {
            url: registerData && registerData.data.FKN.url,
            clients: {
                idVendedor: loginData.verifyData.FKN.vendedores[0].vendedor.idVendedorWeb,
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                download: 1,
                formato: 'JSON',
                requisicao: 1,
                token: loginData.data.usuario_api.token
            }
        }
        const payloadClassification = {
            url: registerData && registerData.data.FKN.url,
            classification: {
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadClientMedia = {
            url: registerData && registerData.data.FKN.url,
            clienteMedia: {
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                idVendedor: loginData.verifyData.FKN.vendedores[0].vendedor.idVendedorWeb,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadCnpjVendedor = {
            url: registerData && registerData.data.FKN.url,
            cnpjVendedor: {
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                idVendedor: loginData.verifyData.FKN.vendedores[0].vendedor.idVendedorWeb,
                requisicao: 1,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadComodato = {
            url: registerData && registerData.data.FKN.url,
            comodato: {
                idVendedor: loginData.verifyData.FKN.vendedores[0].vendedor.idVendedorWeb,
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                requisicao: 1,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadContacts = {
            url: registerData && registerData.data.FKN.url,
            contato: {
                //idContato: 10002,
                idVendedor: loginData.verifyData.FKN.vendedores[0].vendedor.idVendedorWeb,
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                requisicao: 1,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadDepartment = {
            url: registerData && registerData.data.FKN.url,
            department: {
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadDuplicata = {
            url: registerData && registerData.data.FKN.url,
            duplicata: {
                idVendedor: loginData.verifyData.FKN.vendedores[0].vendedor.idVendedorWeb,
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadCompany = {
            url: registerData && registerData.data.FKN.url,
            company: {
                idVendedor: loginData.verifyData.FKN.vendedores[0].vendedor.idVendedorWeb,
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadNotas = {
            url: registerData && registerData.data.FKN.url,
            notas: {
                formato: 'JSON',
                date: new Date(),
                requisicao: 1,
                idVendedor: loginData.verifyData.FKN.vendedores[0].vendedor.idVendedorWeb,
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                token: loginData.data.usuario_api.token
            }
        }
        const payloadParameter = {
            url: registerData && registerData.data.FKN.url,
            parametro: {
                formato: 'JSON',
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                idVendedor: loginData.verifyData.FKN.vendedores[0].vendedor.idVendedorWeb,
                token: loginData.data.usuario_api.token
            }
        }
        const payloadPedidoCFOP = {
            url: registerData && registerData.data.FKN.url,
            pedidoCFOP: {
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadPortadore = {
            url: registerData && registerData.data.FKN.url,
            portador: {
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadRamos = {
            url: registerData && registerData.data.FKN.url,
            ramos: {
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadRecados = {
            url: registerData && registerData.data.FKN.url,
            recado: {
                idVendedor: loginData.verifyData.FKN.vendedores[0].vendedor.idVendedorWeb,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadRegioes = {
            url: registerData && registerData.data.FKN.url,
            regiao: {
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadSegmento = {
            url: registerData && registerData.data.FKN.url,
            segmento: {
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadResult = {
            url: registerData && registerData.data.FKN.url,
            resultado: {
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadSeparacao = {
            url: registerData && registerData.data.FKN.url,
            separacao: {
                separacao: 3,
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadSituacoes = {
            url: registerData && registerData.data.FKN.url,
            situacao: {
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadTabela = {
            url: registerData && registerData.data.FKN.url,
            tabela: {
                formato: 'JSON',
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                idVendedor: loginData.verifyData.FKN.vendedores[0].vendedor.idVendedorWeb,
                token: loginData.data.usuario_api.token
            }
        }
        const payloadTransport = {
            url: registerData && registerData.data.FKN.url,
            transportadora: {
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadPrazo = {
            url: registerData && registerData.data.FKN.url,
            prazo: {
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                formato: 'JSON',
                token: loginData.data.usuario_api.token
            }
        }
        const payloadProduto = {
            url: registerData && registerData.data.FKN.url,
            produto: {
                formato: 'JSON',
                idEmpresa: loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa,
                idVendedor: loginData.verifyData.FKN.vendedores[0].vendedor.idVendedorWeb,
                token: loginData.data.usuario_api.token
            }
        }
        const apiArray = [
            // dispatch(AgendaRequest(payloadAgenda)),
            // dispatch(AbasRequest(payloadAbas)),
             dispatch(ClientsRequest(payloadClient)),
            // dispatch(ClassificationRequest(payloadClassification)),
            // dispatch(ClienteMediaRequest(payloadClientMedia)),
            // dispatch(CnpjVendedorRequest(payloadCnpjVendedor)),
            // dispatch(ComodatoRequest(payloadComodato)),
            // dispatch(ContatoRequest(payloadContacts)),
              dispatch(DepartmentRequest(payloadDepartment)),
            // dispatch(DuplicataRequest(payloadDuplicata)),
            // dispatch(CompanyRequest(payloadCompany)),
            //dispatch(AddressRequest(payloadCompany)),
            // dispatch(FilialRequest(payloadDepartment)),
            // dispatch(NotasRequest(payloadNotas)),
            // dispatch(ModificationRequest(payloadDepartment)),
            // dispatch(ReasonRequest(payloadDepartment)),
            // dispatch(ParameterRequest(payloadParameter)),
            //dispatch(PedidosCFOPRequest(payloadPedidoCFOP)),
              //dispatch(PortadoreRequest(payloadPortadore)),
              //dispatch(RamosRequest(payloadRamos)),
            //dispatch(RecadosRequest(payloadRecados)),
              //dispatch(RegioesRequest(payloadRegioes)),
              //dispatch(SegmentoRequest(payloadSegmento)),
            //dispatch(ResultRequest(payloadResult)),
            // dispatch(SeparacaoRequest(payloadSeparacao)),
            //dispatch(SituacoesRequest(payloadSituacoes)),
            //dispatch(TabelaRequest(payloadTabela)),
              //dispatch(TransportadoraRequest(payloadTransport)),
              //dispatch(PrazoRequest(payloadPrazo)),
            //dispatch(ProdutoRequest(payloadProduto)),
        ];
        setApiProgress(0);
        let tokenInvalid = false;
        let tokenInvalidMessage = '';
        try {
            setOpenSynchronizeModal(true);
            await Promise.all(
                // apiArray)
                apiArray.map((apiCall) => {
                    return apiCall
                        .then(() => {
                            // Calculate the percentage of completed API calls
                            const completedCalls: any = apiArray.filter((call) => {
                                console.log("calling api in promise", JSON.stringify(call));
                                if (call._j !== null) {
                                    const { type, payload } = call._j;
                                    if(payload && payload.FKN && payload.FKN.Processamento && payload.FKN.Processamento.codigoRetorno == 1){
                                        tokenInvalid = true;
                                        tokenInvalidMessage = payload.FKN.Processamento.mensagemRetorno;
                                        throw new Error('Token invalid. Stopping further API calls.');
                                    }
                                    RealmHelper(type, payload, realm, loginData);
                                    return 1
                                }
                            }).length;
                            const percentage = (completedCalls / apiArray.length) * 100;
                            console.log("Calling success after api calls", percentage);
                            setApiProgress(percentage);
                        })
                        .catch((error: any) => {
                            // Handle errors as needed
                            console.error('API Error:', error);
                            throw new Error('Token invalid. Stopping further API calls.');
                        });
                })
            )
            SuccessAlertOnSynchronization();
        } catch (error) {
            if(tokenInvalid){
                AlertOnTokenInvalid(tokenInvalidMessage);
            }
            console.log("Api call error", error,"Type",typeof error)
        } finally {
            setOpenSynchronizeModal(false);
        }
    }


    return (
        <View style={styles.mainContainer}>
            <Appbar.Header statusBarHeight={0} style={[style.appBarStyles]}>
                <TouchableOpacity onPress={drawerOpen} style={{ paddingLeft: 5 }}>
                    <Icon
                        name={'menu'}
                        color={'black'}
                        size={30}
                    />
                </TouchableOpacity>
                <Appbar.Content title={FKNconstants.sincronizar} titleStyle={{ fontFamily: theme.FONTFAMILY.BOLD, fontSize: theme.SIZES.EXTRA_LARGE }} style={{ alignItems: 'center' }} />
            </Appbar.Header>
            <View style={{ width: '100%' }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
                    <View style={styles.container1}>
                        <Text style={styles.attentionText}>
                            {FKNconstants.attention}
                        </Text>
                    </View>
                    <View style={styles.container2}>
                        <View style={styles.container2Sub1}>
                            <Text style={styles.container2Sub1Text}>{FKNconstants.lastSync}</Text>
                            <Text style={styles.container2Sub1Text}>harish</Text>
                        </View>
                        <View style={styles.container2Sub2}>
                            <Text style={styles.container2Sub1Text}>{FKNconstants.lastCompleteSync}</Text>
                            <Text style={styles.container2Sub1Text}>harish</Text>
                        </View>
                    </View>
                    <View style={styles.conatiner3}>
                        <Text style={styles.attentionText}>{FKNconstants.synchronization}</Text>
                        <View style={{ marginVertical: 10 }}>
                            <Checkbox value={syncChangesOnlyBox} onValueChange={(newValue) => setSyncChangesOnlyCheckBox(newValue)} lable={FKNconstants.syncChangesOnly} />
                            <Checkbox value={forceFullSyncBox} onValueChange={(newValue) => setForceFullSyncCheckBox(newValue)} lable={FKNconstants.forceFullSync} />
                        </View>
                    </View>
                    <View style={styles.conatiner4}>
                        <Text style={styles.attentionText}>{FKNconstants.optional}</Text>
                        <View style={{ marginVertical: 10 }}>
                            <Checkbox value={textProduceBox} onValueChange={(newValue) => setTextProduceCheckBox(newValue)} lable={FKNconstants.textProduce} />
                            <Checkbox value={generalHistoryBox} onValueChange={(newValue) => setGeneralHistoryCheckBox(newValue)} lable={FKNconstants.generalHistory} />
                            <Checkbox value={productImagesBox} onValueChange={(newValue) => setProductImagesCheckBox(newValue)} lable={FKNconstants.productImages} />
                        </View>
                    </View>
                    <View style={styles.conatiner5}>
                        <Text style={styles.attentionText}>{FKNconstants.sendOnly}</Text>
                        <View style={{ marginVertical: 10 }}>
                            <Checkbox value={submitOrdersBox} onValueChange={(newValue) => setSubmitOrdersCheckBox(newValue)} lable={FKNconstants.submitOrders} />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button buttonStyle={styles.buttonStyle} label={FKNconstants.synchronizeButtonText} onClick={onSynchronize} />
                    </View>
                    <View style={styles.conatiner6}>
                        <Text style={styles.container5Text}>{FKNconstants.recommendedWifi}</Text>
                        <Text style={styles.container5Text}>{FKNconstants.largeDataAttention}</Text>
                        <Text style={styles.container5Text}>{FKNconstants.longTimeProcess}</Text>
                    </View>
                </ScrollView>
            </View>
            {attentionModal()}
            {openSynchronizeModal && <ProcessModal visible={openSynchronizeModal} value={apiProgress.toFixed(0)} />}
        </View>
    );
}
export default Sincronizar; 