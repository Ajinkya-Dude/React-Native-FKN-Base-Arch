import { KeyboardAvoidingView, Platform, TouchableOpacity, View, ScrollView, Alert } from "react-native";
import { Appbar, FAB } from "react-native-paper";
import styles from "./styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FKNconstants } from "../../../constants";
import style from "../../../../styles";
import theme from "../../../../theme";
import { Text } from "react-native";
import CustomTextInput from "../../../common/CustomTextInput";
import Checkbox from "../../../common/Checkbox";
import { useEffect, useState } from "react";

import StateList from '../../../../utils/stateList.json'
import { checkInternetConnection } from "../../../../utils/globalFunctions";
import Dropdown from "../../../common/CustomDropdown";
import DropdownField from '../../../common/CutomDropdownScroll';
import CustomTextInputIcon from "../../../common/CustomTextInputIcon";
import { ShowToastMessage } from "../../../../utils/ShowToastMessage";
import Toast from "react-native-toast-message";
import { useDispatch, useSelector } from "react-redux";
import { SearchCEPRequest } from "../../../../store/reducer/clientsReducer/SearchCEPActions";
import Loader from "../../../common/Loader";
import { clearCEPsearchData, enderecoCodigoNumber } from "../../../../store/reducer/clientsReducer";
import { realmContext } from "../../../../database/database";
import { insertEndereco } from "../../../../database/EnderecoDao";
import { goBack } from "../../../../navigation/NavigationService";



const EnderecosCadastro = ({ navigation }: any) => {

    const dispatch = useDispatch<any>();

    const registerData: any = useSelector((state: any) => state.registerReducer);
    const loginData: any = useSelector((state: any) => state.loginReducer);
    const cadastroClienteData: any = useSelector((state: any) => state.clientsReducer);

    

    const isLoading = cadastroClienteData.loading;

    const realm = realmContext.useRealm();

    const [billingAddressChecked, setBillingAddressChecked] = useState(false);
    const [codigoIdEndereco, setCodigoIdEndereco] = useState('');
    const [cep, setCep] = useState('');
    const [nome, setNome] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [selectedUFDropdownFilter, setUFDropdownFilter] = useState('AC');

    const [cepSearchCalled, setCepSearchCalled] = useState(false);

    const [fknIdCliente, setFknIdCliente] = useState('');

    const [cepError, setCepError] = useState(false);
    const [nomeError, setNomeError] = useState(false);
    const [ruaError, setRuaError] = useState(false);
    const [numeroError, setNumeroError] = useState(false);
    const [bairroError, setBairroError] = useState(false);
    const [cidadeError, setCidadeError] = useState(false);

    const [isEdit, SetIsEdit] = useState(false);

    const fknIdEmpresa = loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa;

    console.log("cadastroClienteData", fknIdEmpresa,"fknIdCliente", fknIdCliente);

    const onGoback = () => {
        navigation.pop()
    }


    useEffect(() => {
        if (cadastroClienteData.enderecoCodigo) {
            setCodigoIdEndereco(cadastroClienteData.enderecoCodigo);
            setFknIdCliente(cadastroClienteData.fknVendasidCliente)
        }
    }, [cadastroClienteData.enderecoCodigo]);

    //console.log("fknIdCliente----", fknIdCliente);


    useEffect(() => {
        if (cadastroClienteData && cadastroClienteData.cepData && cadastroClienteData.cepData.FKN && cadastroClienteData.cepData.FKN.cep.length > 0) {
            const { endereco, cep, bairro, cidade, uf, complemento } = cadastroClienteData.cepData.FKN.cep && cadastroClienteData.cepData.FKN.cep[0] && cadastroClienteData.cepData.FKN.cep[0].cep && cadastroClienteData.cepData.FKN.cep[0].cep[0];
            setRua(endereco);
            setComplemento(complemento);
            setBairro(bairro);
            setCidade(cidade);
            setUFDropdownFilter(uf);
            dispatch(clearCEPsearchData());
        }
    }, [cadastroClienteData.cepData]);

    const onChangeFieldValue = (value: string, fieldName: string) => {
        console.log("onChangeFieldValue--", value, fieldName);
        if (fieldName === 'cep') {
            setCep(value.replace(/[^0-9]/g, ""));
        }
        if (fieldName === 'nome') {
            setNome(value)
        }
        if (fieldName === 'rua') {
            setRua(value);
        }
        if (fieldName === 'numero') {
            setNumero(value)
        }
        if (fieldName === 'complemento') {
            setComplemento(value)
        }
        if (fieldName === 'bairro') {
            setBairro(value)
        }
        if (fieldName === 'cidade') {
            setCidade(value)
        }
    }
    const InternetCheckAlert = () => {
        Alert.alert(FKNconstants.message, FKNconstants.internetCheck, [
            {
                text: 'Ok',
                onPress: () => console.log('Ok Pressed'),
                style: 'cancel',
            },
        ]);
    }

    const onSubmit = (value?: any) => {

        // if (isEdit) {

        // } else {

        const payload = {
            idEnderecoWeb: codigoIdEndereco,
            idEndereco: codigoIdEndereco,
            endFaturamento: value ? (value === 'shipping' ? 0 : 1) : billingAddressChecked,
            nome: nome,
            endereco: rua,
            numero: numero,
            complemento: complemento,
            cep: cep,
            bairro: bairro,
            cidade: cidade,
            estado: selectedUFDropdownFilter,
            // atualizado: item.atualizado ? 1 : 0, // at update time set it to true
            idCliente: fknIdCliente,
            idEmpresa: fknIdEmpresa,
            novoEndereco: true, // at register set it to true
            enviar: true,
        }
        //}

        if (insertEndereco(payload, realm, loginData)) {
            return 1;
        } else {
            return 0
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
        setUFDropdownFilter(value);
    }

    const onCEPsearch = async () => {
        const internetCheck = await checkInternetConnection();
        console.log("onCEPsearch", internetCheck);
        if (!internetCheck) {
            InternetCheckAlert()
            return;
        }

        if (cep.length < 8) {
            ShowToastMessage({ type: 'error', message1: FKNconstants.cepInvalid });
            return
        }
        const payload = { "cep": cep.replace(/[^0-9]/g, "") }
        dispatch(SearchCEPRequest(payload))
        setCepSearchCalled(true)
    }

    const onFocusCepSearch = async () => {
        const internetCheck = await checkInternetConnection();
        console.log("onFocusCepSearch", cepSearchCalled, "internet", internetCheck);

        if (!cepSearchCalled && internetCheck) {
            onCEPsearch()
        }
    }

    const checkDuplicateAddress = () => {
        let isDuplicate = false;
        const results: any = realm.objects('endereco')
            .filtered('idEmpresaFK = $0 AND idClienteFK = $1', fknIdEmpresa, fknIdCliente);
        console.log("checkDuplicateAddress", results, "fknIdEmpresa", fknIdEmpresa, "codigoIdEndereco", codigoIdEndereco);

        if (results.length > 0) {
            for (let i = 0; i < results.length; i++) {
                if (results[i].nome.toLowerCase() === nome.toLowerCase()) {
                    isDuplicate = true;
                }
            }
        }
        return isDuplicate;
    }

    const checkBillingAddress = () => {
        const results = realm.objects('endereco')
            .filtered('endFaturamento = 1 AND idEmpresaFK = $0 AND idClienteFK = $1', fknIdEmpresa, fknIdCliente);
        console.log("Results from Endereco", results);
        if (results.length) {
            return true;
        } else {
            return false;
        }
    }
    // console.log("Endereco data after submit",realm.objects('endereco')
    // .filtered('idEmpresaFK = $0 AND idClienteFK = $1', fknIdEmpresa, fknIdCliente));

    const onFabButtonClick = async () => {

        if (!cep.length) {
            setCepError(true)
        } else if (cep.length < 8 || cep.length > 8) {
            setCepError(true)
            ShowToastMessage({ type: 'error', message1: FKNconstants.cepInvalid2 })
        } else {
            setCepError(false)
        }
        if (!nome.length) {
            setNomeError(true)
        } else {
            setNomeError(false);
        }
        if (!rua.length) {
            setRuaError(true)
        } else {
            setRuaError(false);
        }
        if (!numero.length) {
            setNumeroError(true)
        } else {
            setNumeroError(false);
        }
        if (!bairro.length) {
            setBairroError(true)
        } else {
            setBairroError(false);
        }
        if (!cidade.length) {
            setCidadeError(true)
        } else {
            setCidadeError(false);
        }
        if (!cep.length || !nome.length || !rua.length || !numero.length || !bairro.length || !cidade.length) {
            return;
        }
        if (!isEdit) {
            if (checkBillingAddress() && billingAddressChecked) {
                Alert.alert(FKNconstants.message, FKNconstants.billingAddressExist, [
                    {
                        text: 'Ok',
                        onPress: () => onGoback(),
                        style: 'cancel',
                    },
                ]);
                //ShowToastMessage({ type: 'error', message1: FKNconstants.billingAddressExist });

            } else if (checkDuplicateAddress()) {
                Alert.alert(FKNconstants.message, FKNconstants.duplicateEndereco, [
                    {
                        text: 'Ok',
                        onPress: () => console.log('Ok Pressed'),
                        style: 'cancel',
                    },
                ]);
            } else {
                const success = onSubmit();
                if (success) {
                    ShowToastMessage({ type: 'success', message1: FKNconstants.createdSuccessfully });
                }
            }
        } else {

        }

        const results: any = realm.objects('endereco')
            .filtered('idEmpresaFK = $0 AND idClienteFK = $1', fknIdEmpresa, fknIdCliente);
        if (results != null) {
            if (results.length === 1) {
                if (results[0].endFaturamento) {
                    Alert.alert(FKNconstants.message, FKNconstants.askGenerateShippingAddress, [
                        {
                            text: FKNconstants.no,
                            onPress: () => onGoback(),
                            style: 'cancel',
                        },
                        {
                            text: FKNconstants.yes,
                            onPress: async () => { await onSubmit('shipping'); goBack() },
                            style: 'default',
                        }
                    ]);
                } else {
                    Alert.alert(FKNconstants.message, FKNconstants.askGenerateBillingAddress, [
                        {
                            text: FKNconstants.no,
                            onPress: () => onGoback(),
                            style: 'cancel',
                        },
                        {
                            text: FKNconstants.yes,
                            onPress: async () => { await onSubmit('billing'); goBack() },
                            style: 'default'
                        }
                    ]);
                }
            } else {
                console.log("results.length", results.length);
                //goBack();
            }
        } else {
            console.log("results != null", results != null);
            //goBack();
        }
    }

    return (
        <View style={styles.mainContainer}>
            <Appbar.Header statusBarHeight={0} style={[style.appBarStyles]}>
                <TouchableOpacity onPress={onGoback} style={{ paddingLeft: 5, width: '10%' }}>
                    <Icon
                        name={'arrow-back'}
                        color={'black'}
                        size={25}
                    />
                </TouchableOpacity>
                <>
                    <Appbar.Content title={FKNconstants.cadastroEndereco} titleStyle={{ fontFamily: theme.FONTFAMILY.BOLD, fontSize: theme.SIZES.EXTRA_LARGE }} style={{ marginLeft: 10, alignItems: 'flex-start' }} />
                    {/* <Appbar.Action color={theme.COLORS.BLACK_LIGHT} icon="magnify" onPress={onSearchIcon} /> */}
                </>
            </Appbar.Header>
            <View style={{ flex: 1 }}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    style={styles.subContainer}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        contentContainerStyle={{ paddingBottom: 200 }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <View style={[styles.fieldContainer, { width: '50%' }]}>
                                <Text style={[styles.fieldLabel]}>{FKNconstants.codigo}</Text>
                                <CustomTextInput
                                    fieldName='codigo'
                                    value={codigoIdEndereco.toString()}
                                    onChangeFieldValue={onChangeFieldValue}
                                    editable={false}
                                />
                            </View>
                            <View style={{ width: '50%' }}>
                                <Checkbox value={billingAddressChecked} lable={FKNconstants.billingAddress} onValueChange={(value) => setBillingAddressChecked(value)} />
                            </View>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel, { color: cepError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.cep}*</Text>
                            <CustomTextInputIcon
                                fieldName='cep'
                                value={cep}
                                onChangeFieldValue={onChangeFieldValue}
                                onIconClick={onCEPsearch}
                                type='number-pad'
                                maxLength={8}
                                onSubmitTextInput={() => onFocusCepSearch()}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel, { color: nomeError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.nome}*</Text>
                            <CustomTextInput
                                fieldName='nome'
                                value={nome}
                                onChangeFieldValue={onChangeFieldValue}
                                onFocusTextInput={() => onFocusCepSearch()}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel, { color: ruaError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.rua}*</Text>
                            <CustomTextInput
                                fieldName='rua'
                                value={rua}
                                onChangeFieldValue={onChangeFieldValue}
                                onFocusTextInput={() => onFocusCepSearch()}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel, { color: numeroError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.numero}*</Text>
                            <CustomTextInput
                                fieldName='numero'
                                value={numero}
                                onChangeFieldValue={onChangeFieldValue}
                                onFocusTextInput={() => onFocusCepSearch()}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel]}>{FKNconstants.complemento}</Text>
                            <CustomTextInput
                                fieldName='complemento'
                                value={complemento}
                                onChangeFieldValue={onChangeFieldValue}
                                onFocusTextInput={() => onFocusCepSearch()}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel, { color: bairroError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.bairro}*</Text>
                            <CustomTextInput
                                fieldName='bairro'
                                value={bairro}
                                onChangeFieldValue={onChangeFieldValue}
                                onFocusTextInput={() => onFocusCepSearch()}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel, { color: cidadeError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.cidade}*</Text>
                            <CustomTextInput
                                fieldName='cidade'
                                value={cidade}
                                onChangeFieldValue={onChangeFieldValue}
                                onFocusTextInput={() => onFocusCepSearch()}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel, { color: theme.COLORS.BLACK }]}>{FKNconstants.uf}*</Text>
                            <DropdownField
                                items={StateList}
                                selectedItem={selectedUFDropdownFilter}
                                setSelectedItem={onTipoSelect}
                            />
                        </View>

                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
            {FabButton()}
            {isLoading && <Loader />}
            <Toast />
        </View>
    );

}

export default EnderecosCadastro;