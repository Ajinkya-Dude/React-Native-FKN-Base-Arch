import { KeyboardAvoidingView, ScrollView, Text, View, TextInput, Platform, Linking } from 'react-native';
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
import { formatCnpj, formatCpf, formatNumericDate, isValidDate } from '../../../../utils/globalFunctions';
import { realmContext } from '../../../../database/database';
import Loader from '../../../common/Loader';
import { clearCpfCnpjData } from '../../../../store/reducer/cpfCnpjReducer';

const Clientetab = ({ navigation, route }: any) => {
    const isEdit = route && route.params && route.params.clienteEdit;
    const registerData: any = useSelector((state: any) => state.registerReducer);
    const loginData: any = useSelector((state: any) => state.loginReducer);

    const cnpjData:any = useSelector((state:any)=>state.cpfCnpjReducer);

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
    const [idPortador, setIdPortador] = useState('harish');
    const [idPrazo, setIdPrazo] = useState('harish');
    const [idTransportadora, setIdTransportadora] = useState('harish');
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

    const [openSheet, setOpenSheet] = useState(false);
    const [searchType, setSearchType] = useState('');
    const [searchedData, setSearchedData] = useState([]);

    const ramoData: any = realm.objects('ramo');
    const segmentoData: any = realm.objects('segmento');
    const regiaoData: any = realm.objects('regiao');
    const portadorData: any = realm.objects('portador');
    const transportadoraData: any = realm.objects('transportadora');
    const prazoPagamentoData:any = realm.objects('prazoPagamento');

    const isLoading = cnpjData.loading;

    //console.log("Realm store --", realm.objects('segmento'), "\nRamo", realm.objects('ramo'), "\nRegiao", realm.objects('regiao'), "\nportadora", realm.objects('portador'), "\ntransportadora", realm.objects('transportadora'));

    useEffect(()=>{
        if(cnpjData && cnpjData.data){
            console.log("cnpjData--",JSON.stringify(cnpjData.data));

            dispatch(clearCpfCnpjData());
        }
    },[cnpjData]);

    const bottomSheetRef = useRef<BottomSheet>(null);

    const openBottomSheet = (item: any) => {
        console.log("openBottomSheet", item);

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
        }else if(item === 'idPrazo'){
            setSearchedData(prazoPagamentoData);
        }else{
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


    const onFabButtonClick = () => {
        console.log("IdFundacao", idFundacao, "format", isValidDate(idFundacao));

        if (!cpfCnpj.length) {
            setCpfCnpjError(true)
        }
        if (!razaoSocial.length) {
            setRazaoSocialError(true);
        }
        if (!fantasia.length) {
            setFantasiaError(true);
        }
        if (!rgIe.length) {
            setRgIeError(true);
        }
        if (!telefone.length && !celular.length && !fax.length) {
            SetContatoError(true);
        }
        if (!email.length) {
            setEmailError(true);
        }
        if (!emailNfe.length) {
            setEmailNfeError(true);
        }
        if (!idRegiao.length) {
            setIdRegiaoError(true);
        }
        if (!idRamo.length) {
            setIdRamoError(true)
        }
        if (!cpfCnpj.length || !razaoSocial.length || !fantasia.length || !rgIe.length || (!telefone.length && !celular.length && !fax.length) || !email.length || !emailNfe.length || !idRegiao.length || !idRamo.length) {
            return;
        }
        console.log("onFabButtonClick--");
        const dateFormat = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  
        // Use RegExp to match the date format
        // if (!dateFormat.test(date)) {
        //   return false;
        // }
      
        // Extract day, month, and year
        const [_, day, month, year] = idFundacao.match(dateFormat);
      
        // Create a Date object and check for a valid date
        const parsedDate = new Date(year, month - 1, day);
        console.log("DT Fundacacao","parsedDate",parsedDate,"------",idFundacao,new Date(idFundacao), moment(new Date(year, month - 1, day)).format('yyyy-MM-DD HH:mm:ss'));

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
        if (tipo !== 'JURIDICO' || cpfCnpj.length<18) {
            return;
        }
        const todayDate = moment().format('YYYYMMDD') + registerData.data.FKN.contrato;
        const cnpjNumber = cpfCnpj.replaceAll('.', '').replace('/', '').replace('-', '').slice(0,14)
        const payload = {
            view: 'get',
            formato: 'json',
            cnpj: cnpjNumber,//79583472000174,
            usuario: loginData.verifyData.FKN.vendedores[0].vendedor.usuario,
            contrato: registerData.data.FKN.contrato,
            token: md5(todayDate)
        }
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
        }
        closeBottomSheet()
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
                        <Text style={[styles.fieldLabel, { color: tipoError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>Tipo*</Text>
                        <DropdownField
                            items={clienteCadastroTipo}
                            selectedItem={tipo}
                            setSelectedItem={onTipoSelect}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: cpfCnpjError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>CPF/CNPJ*</Text>
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
                        <Text style={[styles.fieldLabel, { color: razaoSocialError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>Razão Social*</Text>
                        <CustomTextInput
                            fieldName='razaoSocial'
                            value={razaoSocial}
                            onChangeFieldValue={onChangeFieldValue}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: fantasiaError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>Fantasia*</Text>
                        <CustomTextInput
                            fieldName='fantasia'
                            value={fantasia}
                            onChangeFieldValue={onChangeFieldValue}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: rgIeError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>RG/IE*</Text>
                        <CustomTextInput
                            fieldName='rgIe'
                            value={rgIe}
                            onChangeFieldValue={onChangeFieldValue}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: contatoError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>Contatos*</Text>
                        <CustomTextInputIcon
                            fieldName='telefone'
                            value={telefone}
                            onChangeFieldValue={onChangeFieldValue}
                            onIconClick={onIconClick}
                            type='phone-pad'
                            placeholderText='Telefone'
                        />
                        <CustomTextInputIcon
                            fieldName='celular'
                            value={celular}
                            onChangeFieldValue={onChangeFieldValue}
                            onIconClick={onIconClick}
                            type='phone-pad'
                            placeholderText='Celular'
                        />
                        <CustomTextInputIcon
                            fieldName='fax'
                            value={fax}
                            onChangeFieldValue={onChangeFieldValue}
                            onIconClick={onIconClick}
                            type='phone-pad'
                            placeholderText='Fax'
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: emailError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>E-mail*</Text>
                        <CustomTextInput
                            fieldName='email'
                            value={email}
                            onChangeFieldValue={onChangeFieldValue}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: emailNfeError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>E-mail NFE*</Text>
                        <CustomTextInput
                            fieldName='emailNfe'
                            value={emailNfe}
                            onChangeFieldValue={onChangeFieldValue}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Data Fundação</Text>
                        <CustomTextInput
                            fieldName='idFundacao'
                            value={idFundacao}
                            onChangeFieldValue={onChangeFieldValue}
                            type='phone-pad'
                            maxLength={10}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>CNAE</Text>
                        <CustomTextInput
                            fieldName='cnae'
                            value={cnae}
                            onChangeFieldValue={onChangeFieldValue}
                            type='number-pad'
                            maxLength={10}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Classificação</Text>
                        <CustomTextInput
                            fieldName='classificacao'
                            value={classificacao}
                            onChangeFieldValue={onChangeFieldValue}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Portador</Text>
                        <CutomSearchTextInputIcon
                            fieldName='idPortador'
                            value={idPortador && idPortador.descricao}
                            onChangeFieldValue={onSeachOpenBottomSheet}
                            onEraserClick={onEraserClick}
                            placeholder={'Selecione uma Portador'}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Prazo</Text>
                        <CutomSearchTextInputIcon
                            fieldName='idPrazo'
                            value={idPrazo}
                            onChangeFieldValue={onSeachOpenBottomSheet}
                            onEraserClick={onEraserClick}
                            placeholder={'Selecione uma Prazo'}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Transportadora</Text>
                        <CutomSearchTextInputIcon
                            fieldName='idTransportadora'
                            value={idTransportadora && idTransportadora.descricao}
                            onChangeFieldValue={onSeachOpenBottomSheet}
                            onEraserClick={onEraserClick}
                            placeholder={'Selecione uma Transportadora'}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: idRegiaoError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>Região*</Text>
                        <CutomSearchTextInputIcon
                            fieldName='idRegiao'
                            value={idRegiao && idRegiao.descricao}
                            onChangeFieldValue={onSeachOpenBottomSheet}
                            placeholder={'Selecione uma Região'}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={[styles.fieldLabel, { color: idRamoError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>Ramo*</Text>
                        <CutomSearchTextInputIcon
                            fieldName='idRamo'
                            value={idRamo && idRamo.descricao}
                            onChangeFieldValue={onSeachOpenBottomSheet}
                            placeholder={'Selecione um Ramo'}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Segmento</Text>
                        <CutomSearchTextInputIcon
                            fieldName='idSegmento'
                            value={idSegmento && idSegmento.descricao}
                            onChangeFieldValue={onSeachOpenBottomSheet}
                            placeholder={'Selecione um Segmento'}
                        />
                    </View>
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
        </View>
    );
}

export default Clientetab;