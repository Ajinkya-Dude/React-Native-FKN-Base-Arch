import { KeyboardAvoidingView, ScrollView, Text, View, TextInput, Platform, Linking } from 'react-native';
import { FAB } from 'react-native-paper';
import theme from '../../../../theme';
import styles from './styles';
import Dropdown from '../../../common/CustomDropdown';
import { clienteCadastroTipo } from '../../../../screens/Cliente/ClienteData';
import { useRef, useState } from 'react';
import DropdownField from '../../../common/CutomDropdownScroll';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomTextInputIcon from '../../../common/CustomTextInputIcon';
import CustomTextInput from '../../../common/CustomTextInput';
import BottomSheetCustom from '../../../common/CutomBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import CutomSearchTextInputIcon from '../../../common/CutomSearchTextInputIcon';

const Clientetab = ({ navigation, route }: any) => {
    const isEdit = route && route.params && route.params.clienteEdit;

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

    const [openSheet,setOpenSheet] = useState(false);


    const bottomSheetRef = useRef<BottomSheet>(null);
    console.log("bottomSheetRef", bottomSheetRef);

    const openBottomSheet = (item: any) => {
        console.log("openBottomSheet", item);

        if (bottomSheetRef.current) {
            bottomSheetRef.current.expand();
        }
    };
    const onSeachOpenBottomSheet =(item:any) =>{
        setOpenSheet(!openSheet);
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

    const FabButton = () => (
        <FAB
            icon="content-save"
            color={theme.COLORS.BLACK}
            style={styles.fab}
        //onPress={() => onFabButtonClick()}
        />
    );
    const onTipoSelect = (value: any) => {
        console.log("onTipoSelect", value);
    }
    const onChangeFieldValue = (value: string, fieldName: string) => {
        if (fieldName === 'cpfcnpj') {
            setCpfCnpj(value);
        }
        if (fieldName === 'razaoSocial') {
            setRazaoSocial(value);
        }
        if (fieldName === 'fantasia') {
            setFantasia(value);
        } else if (fieldName === 'rgIe') {
            setRgIe(value);
        } else if (fieldName === 'telefone') {
            setTelefone(value)
        } else if (fieldName === 'celular') {
            setCelular(value)
        } else if (fieldName === 'fax') {
            setFax(value);
        } else if (fieldName === 'email') {
            setEmail(value);
        } else if (fieldName === 'emailNfe') {
            setEmailNfe(value);
        } else if (fieldName === 'cnae') {
            setCnae(value)
        } else if (fieldName === 'classificacao') {
            setClassificao(value);
        }
    }
    const onCpfCnpjSearch = () => {
        console.log("onCpfCnpjSearch");

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
                        <Text style={styles.fieldLabel}>Tipo*</Text>
                        <DropdownField
                            items={clienteCadastroTipo}
                            selectedItem={tipo}
                            setSelectedItem={setTipo}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>CPF/CNPJ*</Text>
                        <CustomTextInputIcon
                            fieldName='cpfcnpj'
                            value={cpfCnpj}
                            onChangeFieldValue={onChangeFieldValue}
                            onIconClick={onIconClick}
                            type='number-pad'
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Razão Social*</Text>
                        <CustomTextInput
                            fieldName='razaoSocial'
                            value={razaoSocial}
                            onChangeFieldValue={onChangeFieldValue}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Fantasia*</Text>
                        <CustomTextInput
                            fieldName='fantasia'
                            value={fantasia}
                            onChangeFieldValue={onChangeFieldValue}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>RG/IE*</Text>
                        <CustomTextInput
                            fieldName='rgIe'
                            value={rgIe}
                            onChangeFieldValue={onChangeFieldValue}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Contatos*</Text>
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
                        <Text style={styles.fieldLabel}>E-mail*</Text>
                        <CustomTextInput
                            fieldName='email'
                            value={email}
                            onChangeFieldValue={onChangeFieldValue}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>E-mail NFE*</Text>
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
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>CNAE</Text>
                        <CustomTextInput
                            fieldName='cnae'
                            value={cnae}
                            onChangeFieldValue={onChangeFieldValue}
                            type='number-pad'
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Classificação</Text>
                        <CustomTextInput
                            fieldName='classificacao'
                            value={classificacao}
                            onChangeFieldValue={onChangeFieldValue}
                            type='number-pad'
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Portador</Text>
                        <CutomSearchTextInputIcon
                            fieldName='idPortador'
                            value={idPortador}
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
                            value={idTransportadora}
                            onChangeFieldValue={onSeachOpenBottomSheet}
                            onEraserClick={onEraserClick}
                            placeholder={'Selecione uma Transportadora'}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Região*</Text>
                        <CutomSearchTextInputIcon
                            fieldName='idRegiao'
                            value={idRegiao}
                            onChangeFieldValue={onSeachOpenBottomSheet}
                            placeholder={'Selecione uma Região'}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Ramo*</Text>
                        <CutomSearchTextInputIcon
                            fieldName='idRamo'
                            value={idRamo}
                            onChangeFieldValue={onSeachOpenBottomSheet}
                            placeholder={'Selecione um Ramo'}
                        />
                    </View>
                    <View style={styles.fieldContainer}>
                        <Text style={styles.fieldLabel}>Segmento</Text>
                        <CutomSearchTextInputIcon
                            fieldName='idSegmento'
                            value={idSegmento}
                            onChangeFieldValue={onSeachOpenBottomSheet}
                            placeholder={'Selecione um Segmento'}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            {openSheet && <BottomSheetCustom bottomSheetRef={bottomSheetRef} closeBottomSheet={closeBottomSheet} />}
            {FabButton()}
        </View>
    );
}

export default Clientetab;