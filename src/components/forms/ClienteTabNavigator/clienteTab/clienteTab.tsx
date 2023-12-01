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
import { deleteCliente, insertSingleCliente } from '../../../../database/ClienteDao';
import DeviceInfo from 'react-native-device-info';
import { FKNconstants } from '../../../constants';
import { SetPayload } from './payload';
import { ClienteCadastroRequest } from '../../../../store/reducer/clientsReducer/clienteCadastroActions';
import clientsReducer, { clearClienteCadastro, enderecoCodigoNumber, fknVendasidClienteNumber, setLodingOff, setLodingOn } from '../../../../store/reducer/clientsReducer';
import Toast from 'react-native-toast-message';
import { ShowToastMessage } from '../../../../utils/ShowToastMessage';

const Clientetab = ({ navigation, route }: any) => {
    const isEdit = route && route.params && route.params.clienteEdit;
    const registerData: any = useSelector((state: any) => state.registerReducer);
    const loginData: any = useSelector((state: any) => state.loginReducer);

    const cnpjData: any = useSelector((state: any) => state.cpfCnpjReducer);

    const cadastroClienteData: any = useSelector((state: any) => state.clientsReducer);

    console.log("cadastroClienteData",cadastroClienteData);
    


    const dispatch = useDispatch<any>();
    const realm = realmContext.useRealm();

    const [tipo, setTipo] = useState('JURIDICO');
    const [cpfCnpj, setCpfCnpj] = useState('');
    const [razaoSocial, setRazaoSocial] = useState('');
    const [fantasia, setFantasia] = useState('');
    const [rgIe, setRgIe] = useState('');
    const [email, setEmail] = useState('');
    const [emailNfe, setEmailNfe] = useState('');
    const [idFundacao, setIdFundacao] = useState('');
    const [cnae, setCnae] = useState('');
    const [classificacao, setClassificao] = useState('');
    const [idPortador, setIdPortador] = useState('');
    const [idPrazo, setIdPrazo] = useState('');
    const [idTransportadora, setIdTransportadora] = useState('');
    const [idRegiao, setIdRegiao] = useState('');
    const [idRamo, setIdRamo] = useState('');
    const [idSegmento, setIdSegmento] = useState('');
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

    const [openSheet, setOpenSheet] = useState(false);
    const [searchType, setSearchType] = useState('');
    const [searchedData, setSearchedData] = useState([]);

    const [uniqueId, setUniqueId] = useState<string>('');
    const [deviceModel, setDeviceModel] = useState<string>('');

    const [cnpjSearchCalled, setCnpjSearchCalled] = useState(false);

    const ramoData: any = realm.objects('ramo');
    const segmentoData: any = realm.objects('segmento');
    const regiaoData: any = realm.objects('regiao');
    const portadorData: any = realm.objects('portador');
    const transportadoraData: any = realm.objects('transportadora');
    const prazoPagamentoData: any = realm.objects('prazoPagamento');

    const isLoading = cnpjData.loading || cadastroClienteData.loading;

    //console.log("Realm store --", realm.objects('segmento'), "\nRamo", realm.objects('ramo'), "\nRegiao", realm.objects('regiao'), "\nportadora", realm.objects('portador'), "\ntransportadora", realm.objects('transportadora'));

    useEffect(()=>{
        if(cadastroClienteData && cadastroClienteData.clienteCadastro && cadastroClienteData.clienteCadastro.FKN){
            const {FKN} = cadastroClienteData.clienteCadastro;
            if(FKN.Processamento && FKN.Processamento.codigoRetorno === 2){
                insertClienteToDb({enviar:false})
            }
        }
    },[cadastroClienteData])

    useEffect(() => {
        GetDeviceUniqueID();
        dispatch(fknVendasidClienteNumber())
        dispatch(enderecoCodigoNumber())
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
            console.log("cnpjData--", JSON.stringify(cnpjData.data));
            const { razao_social, telefone_1, telefone_2, num_fax, email, cnae_fiscal, nome_fantasia } = cnpjData.data[0];
            setEmail(email);
            setRazaoSocial(razao_social);
            setTelefone(telefone_1);
            setCelular(telefone_2);
            setFax(num_fax);
            setCnae(cnae_fiscal);
            setFantasia(nome_fantasia);


            dispatch(clearCpfCnpjData());
        }
    }, [cnpjData]);

    const bottomSheetRef = useRef<BottomSheet>(null);

    const openBottomSheet = (item: any) => {
        console.log("openBottomSheet--", item);

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
        console.log("onEraserClick", item);
        if (item === 'idPortador') {
            setIdPortador('');
        } else if (item === 'idPrazo') {
            setIdPrazo('')
        } else if (item === 'idTransportadora') {
            setIdTransportadora('');
        }
    }
    const closeBottomSheet = () => {
        console.log("closeBottomSheet called");

        if (bottomSheetRef.current) {
            bottomSheetRef.current.close();
        }
        setOpenSheet(false);
    };

    const insertClienteToDb = async({enviar}:any) =>{

        let payload = SetPayload({
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
        });
        const payloadCliente = { ...payload, enviar: enviar,novoCadastro:true}
        console.log("Calling insertClienteToDb----------------------->");
        
       const value = await insertSingleCliente(payloadCliente, realm);
       if(value){
        dispatch(setLodingOff());
        dispatch(clearClienteCadastro());
        ShowToastMessage({type:'success', message1:FKNconstants.insertClienteSuccessfully})
       }else{
        dispatch(setLodingOff());
       }
    }

    const AlertOnInvalidField = (message:string) =>{
        Alert.alert(FKNconstants.message,message,[
            {
                text: 'Ok',
                onPress: () => console.log('Ok Pressed'),
                style: 'cancel',
            },
        ])
    }

    const checkCpfCnpjValid = () =>{
        if(tipo === 'JURIDICO' && !isCNPJ(cpfCnpj.replaceAll('.', '').replace('/', '').replace('-', '').slice(0, 14))){
            AlertOnInvalidField(FKNconstants.invalidCnpj);
            return true;
        }else if(tipo !== 'JURIDICO' && !isCPF(cpfCnpj.replaceAll('.', '').replace('-', '').slice(0, 11))){
            AlertOnInvalidField(FKNconstants.invalidCpf);
            return true;
        }
        return false;
    }

    const onFabButtonClick = async() => {

       //deleteCliente(realm);
        console.log("IdFundacao", idFundacao,cpfCnpj, "format","------");
        if(checkCpfCnpjValid()){
            return
        }

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
        if(idFundacao && !isValidDate(idFundacao)){
            setIdFundacaoError(true);
        }else{
            setIdFundacaoError(false);
        }


        if (!cpfCnpj.length || !razaoSocial.length || !fantasia.length || !rgIe.length || (!telefone.length && !celular.length && !fax.length) || !email.length || !emailNfe.length || !idRegiao || !idRamo || (idFundacao && !isValidDate(idFundacao))) {
            console.log("Clikc", !idRegiao.length);
            return;
        }
        

        let payload = SetPayload({
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
        });
        // if(tabelaPadrao){
        //     Object.assign(payload,{tabelaPadrao:tabelaPadrao})
        // }
        const newPayload = {
            cliente: { ...payload, 
                //android: uniqueId, 
                token: loginData.data.usuario_api.token },
            url: registerData && registerData.data.FKN.url
        }
        console.log("Payload----------->", payload);
        if(internetCheck){
            dispatch(setLodingOn());
            dispatch(ClienteCadastroRequest(newPayload));
        }else{
            dispatch(setLodingOn());
            insertClienteToDb({enviar:true});
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
        console.log("onTipoSelect", value);
        setTipo(value);
        setCpfCnpj('')
    }
    console.log("cpf number outer", cpfCnpj);

    const onChangeFieldValue = (value: string, fieldName: string) => {
        if (fieldName === 'cpfcnpj') {
            if (tipo !== 'JURIDICO') {
                // if (value.length < 12)
                setCpfCnpj(formatCpf(value))
            } else {
                // if (value.length < 15)
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
        }
    }


    const onCpfCnpjSearch = () => {
        if (tipo !== 'JURIDICO' || cpfCnpj.length < 18) {
            return;
        }
        if(checkCpfCnpjValid()){
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
        console.log("onIconClick", type);
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
        console.log("onSelectFromBottomSheet", item, searchType);
        if (searchType === 'idRamo') {
            console.log("onSelectFromBottomSheet-----", item, searchType);
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
        console.log("onFocusCnpjSearch","internet", internetCheck);

        if (!cnpjSearchCalled && internetCheck) {
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

                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: tipoError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.tipo}*</Text>
                        <DropdownField
                            items={clienteCadastroTipo}
                            selectedItem={tipo}
                            setSelectedItem={onTipoSelect}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: cpfCnpjError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.cpfcnpj}*</Text>
                        <CustomTextInputIcon
                            fieldName='cpfcnpj'
                            value={cpfCnpj}
                            onChangeFieldValue={onChangeFieldValue}
                            onIconClick={onIconClick}
                            type='number-pad'
                            maxLength={tipo != 'JURIDICO' ? 14 : 18}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: razaoSocialError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.razaoSocial}*</Text>
                        <CustomTextInput
                            fieldName='razaoSocial'
                            value={razaoSocial}
                            onChangeFieldValue={onChangeFieldValue}
                            onFocusTextInput={()=>onFocusCNPJSearch()}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: fantasiaError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.fantasia}*</Text>
                        <CustomTextInput
                            fieldName='fantasia'
                            value={fantasia}
                            onChangeFieldValue={onChangeFieldValue}
                            onFocusTextInput={()=>onFocusCNPJSearch()}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: rgIeError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.rgIe}*</Text>
                        <CustomTextInput
                            fieldName='rgIe'
                            value={rgIe}
                            onChangeFieldValue={onChangeFieldValue}
                            onFocusTextInput={()=>onFocusCNPJSearch()}
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
                            onFocusTextInput={()=>onFocusCNPJSearch()}
                        />
                        <CustomTextInputIcon
                            fieldName='celular'
                            value={celular}
                            onChangeFieldValue={onChangeFieldValue}
                            onIconClick={onIconClick}
                            type='phone-pad'
                            placeholderText={FKNconstants.celular}
                            iconName='phone'
                            onFocusTextInput={()=>onFocusCNPJSearch()}
                        />
                        <CustomTextInputIcon
                            fieldName='fax'
                            value={fax}
                            onChangeFieldValue={onChangeFieldValue}
                            onIconClick={onIconClick}
                            type='phone-pad'
                            placeholderText={FKNconstants.fax}
                            iconName='phone'
                            onFocusTextInput={()=>onFocusCNPJSearch()}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: emailError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.email}*</Text>
                        <CustomTextInput
                            fieldName='email'
                            value={email}
                            onChangeFieldValue={onChangeFieldValue}
                            onFocusTextInput={()=>onFocusCNPJSearch()}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: emailNfeError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.emailNfe}*</Text>
                        <CustomTextInput
                            fieldName='emailNfe'
                            value={emailNfe}
                            onChangeFieldValue={onChangeFieldValue}
                            onFocusTextInput={()=>onFocusCNPJSearch()}
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
                            onFocusTextInput={()=>onFocusCNPJSearch()}
                        />
                        {idFundacaoError && <Text style={[styles.fieldLabel, { color: theme.COLORS.ERROR}]}>{FKNconstants.dataFundacaoValid}</Text>}
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>{FKNconstants.cnae}</Text>
                        <CustomTextInput
                            fieldName='cnae'
                            value={cnae}
                            onChangeFieldValue={onChangeFieldValue}
                            type='number-pad'
                            maxLength={10}
                            onFocusTextInput={()=>onFocusCNPJSearch()}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>{FKNconstants.classificacao}</Text>
                        <CustomTextInput
                            fieldName='classificacao'
                            value={classificacao}
                            onChangeFieldValue={onChangeFieldValue}
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
                                    fieldName='classificacao'
                                    value={classificacao}
                                    onChangeFieldValue={onChangeFieldValue}
                                    placeholder={FKNconstants.tabelaPadrao}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldLabel}>{FKNconstants.ultimoContato}</Text>
                                <CustomTextInput
                                    fieldName='classificacao'
                                    value={classificacao}
                                    placeholder={FKNconstants.ultimoContato}
                                    onChangeFieldValue={onChangeFieldValue}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldLabel}>{FKNconstants.ultimoOrcamento}</Text>
                                <CustomTextInput
                                    fieldName='classificacao'
                                    value={classificacao}
                                    placeholder={FKNconstants.ultimoOrcamento}
                                    onChangeFieldValue={onChangeFieldValue}
                                    editable={false}
                                />
                            </View>
                            <View style={styles.fieldContainer}>
                                <Text style={styles.fieldLabel}>{FKNconstants.ultimoVenda}</Text>
                                <CustomTextInput
                                    fieldName='classificacao'
                                    value={classificacao}
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
                    //     [
                    //     {
                    //         id:1,
                    //         "descricao":"Segmento para teste de listagem",
                    //         "idEmpresaFK":10002,
                    //         "idRamoFK":5,
                    //         "idSegmento":7
                    //     },
                    //     {
                    //         id:2,
                    //         "descricao":"Segemento teste 2",
                    //         "idEmpresaFK":10002,
                    //         "idRamoFK":5,
                    //         "idSegmento":8
                    //     },
                    //     {
                    //         id:3,
                    //         "descricao":"Segmento para teste de listagem",
                    //         "idEmpresaFK":10002,
                    //         "idRamoFK":5,
                    //         "idSegmento":7
                    //     },
                    //     {
                    //         id:4,
                    //         "descricao":"Segemento teste 2",
                    //         "idEmpresaFK":10002,
                    //         "idRamoFK":5,
                    //         "idSegmento":8
                    //     },{
                    //         id:5,
                    //         "descricao":"Segmento para teste de listagem",
                    //         "idEmpresaFK":10002,
                    //         "idRamoFK":5,
                    //         "idSegmento":7
                    //     },
                    //     {
                    //         id:6,
                    //         "descricao":"Segemento teste 2",
                    //         "idEmpresaFK":10002,
                    //         "idRamoFK":5,
                    //         "idSegmento":8
                    //     },
                    //     {
                    //         id:7,
                    //         "descricao":"Segmento para teste de listagem",
                    //         "idEmpresaFK":10002,
                    //         "idRamoFK":5,
                    //         "idSegmento":7
                    //     },
                    //     {
                    //         id:8,
                    //         "descricao":"Segemento teste 2",
                    //         "idEmpresaFK":10002,
                    //         "idRamoFK":5,
                    //         "idSegmento":8
                    //     },
                    //     {
                    //         id:9,
                    //         "descricao":"Segmento para teste de listagem",
                    //         "idEmpresaFK":10002,
                    //         "idRamoFK":5,
                    //         "idSegmento":7
                    //     },
                    //     {
                    //         id:10,
                    //         "descricao":"Segemento teste 2",
                    //         "idEmpresaFK":10002,
                    //         "idRamoFK":5,
                    //         "idSegmento":8
                    //     },
                    //     {
                    //         id:11,
                    //         "descricao":"Segmento para teste de listagem",
                    //         "idEmpresaFK":10002,
                    //         "idRamoFK":5,
                    //         "idSegmento":7
                    //     },
                    //     {
                    //         id:12,
                    //         "descricao":"Segemento teste 2",
                    //         "idEmpresaFK":10002,
                    //         "idRamoFK":5,
                    //         "idSegmento":8
                    //     }
                    // ]}
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