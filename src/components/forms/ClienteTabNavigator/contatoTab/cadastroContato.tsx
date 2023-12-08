import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text } from "react-native";
import { Appbar, FAB } from "react-native-paper";
import styles from "./styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FKNconstants } from "../../../constants";
import style from "../../../../styles";
import theme from "../../../../theme";
import { ScrollView } from "react-native";
import CustomTextInput from "../../../common/CustomTextInput";
import { useEffect, useRef, useState } from "react";
import BottomSheetCustom from "../../../common/CutomBottomSheet";
import BottomSheet from '@gorhom/bottom-sheet';
import CutomSearchTextInputIcon from "../../../common/CutomSearchTextInputIcon";
import { useSelector } from "react-redux";
import { formatDateAniversario, formatNumericDate, isValidDate } from "../../../../utils/globalFunctions";
import { realmContext } from "../../../../database/database";
import { ShowToastMessage } from "../../../../utils/ShowToastMessage";
import Toast from "react-native-toast-message";
import { insertContato, updateContato } from "../../../../database/ContatoDao";
import moment from "moment";

let timeout:any;
const ContatoCadastro = ({ navigation,route }: any) => {

    const bottomSheetRef = useRef<BottomSheet>(null);

    const cadastroClienteData: any = useSelector((state: any) => state.clientsReducer);
    const loginData: any = useSelector((state: any) => state.loginReducer);

    const realm = realmContext.useRealm();
    const departmentoData: any = realm.objects('departamento');



    const [departmentData, setDepartmentData] = useState(departmentoData);
    const [codigoIdContato, setCodigoIdContato] = useState('');
    const [nome, setNome] = useState('');
    const [departamento, setDepartamento] = useState<any>('');
    const [telefone, setTelefone] = useState('');
    const [aniversario, setAniversario] = useState('');
    const [email, setEmail] = useState('');
    const [observacoes, setObservacoes] = useState('');

    const [nomeError, setNomeError] = useState(false);
    const [departamentoError, setDepartamentoError] = useState(false);
    const [aniversarioError, setAniversarioError] = useState(false);

    const [fknIdCliente, setFknIdCliente] = useState('');

    const [isEdit, setIsEdit] = useState(false);
    const [contatoNovo, setContatoNovo] = useState(false);


    const [openSheet, setOpenSheet] = useState(false);

    const fknIdEmpresa = loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa;

    const getDepartmentoFromId = (idDepartamento: any) => {
        const results: any = realm.objects('departamento')
            .filtered('idEmpresaFK = $0 AND idDepartamento = $1', fknIdEmpresa, idDepartamento);
        if (results.length) {
            return results[0];
        } else {
            return "N/A";
        }
    }

    useEffect(() => {
        if (route && route.params && route.params.contatoEdit && route.params.contatoItem) {

            const {
                _id,
                atualizado,
                email,
                aniversario,
                enviado,
                idContato,
                idContatoWeb,
                idClienteFK,
                idEmpresaFK,
                idDepartamentoFK,
                nome,
                observacoes,
                telefone,
                novoContato } = route.params.contatoItem;
            setCodigoIdContato(idContato);
            setNome(String(nome).toUpperCase());
            setCodigoIdContato(idContato);
            if(aniversario){
                setAniversario(moment(aniversario).format('DD/MM/yyyy'));
            }
            if(telefone){
                setTelefone(telefone)
            }
            if(email){
                setEmail(email);
            }
            if(observacoes){
                setObservacoes(String(observacoes).toUpperCase());
            }
            setIsEdit(route.params.contatoEdit);
            setContatoNovo(novoContato ? true : false);
            setFknIdCliente(idClienteFK);
            setDepartamento(getDepartmentoFromId(idDepartamentoFK));
        }

    }, [route && route.params]);

    useEffect(() => {
        if (cadastroClienteData.fknVendasIdContato) {
            setCodigoIdContato(cadastroClienteData.fknVendasIdContato);
            setFknIdCliente(cadastroClienteData.fknVendasidCliente);
        }
    }, [cadastroClienteData]);
    const onGoback = () => {
        clearTimeout(timeout);
        navigation.pop()
    }
    const onChangeFieldValue = (value: string, fieldName: string) => {
        if (fieldName === 'nome') {
            setNome(value.toUpperCase())
        }
        if (fieldName === 'telefone') {
            setTelefone(value);
        }
        if (fieldName === 'aniversario') {
            setAniversario(formatNumericDate(value))
        }
        if (fieldName === 'observacoes') {
            setObservacoes(value.toUpperCase())
        }
        if (fieldName === 'email') {
            setEmail(value.toUpperCase())
        }

    }
    const closeBottomSheet = () => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.close();
        }
        setOpenSheet(false);
    };
    const openBottomSheet = (item: any) => {
        if (bottomSheetRef.current) {
            bottomSheetRef.current.expand();
        }
    };
    const onSeachOpenBottomSheet = (item: any) => {
        setOpenSheet(!openSheet);
        openBottomSheet(item);
    }
    const onSelectFromBottomSheet = (item: any) => {
        setDepartamento(item);
        closeBottomSheet()
    }
    const onTimeoutGoBack = () =>{
        clearTimeout(timeout);
        timeout =setTimeout(()=>{
            onGoback()
        },1000)
    }
    const onSubmit = () => {
        
        const payload: any = {
            idContatoWeb: codigoIdContato,
            idContato: codigoIdContato,
            idCliente:fknIdCliente,
            nome: nome,
            telefone: telefone,
            aniversario: aniversario ?  formatDateAniversario(aniversario) : '',
            email: email,
            observacoes: observacoes,
            idDepartamento: departamento.idDepartamento,
            enviar: true
        }
        if (!isEdit) {
            payload["novoContato"] = true;
            
            if (insertContato(payload, realm, loginData)) {
                ShowToastMessage({ type: 'success', message1: FKNconstants.createdSuccessfully });
                onTimeoutGoBack();
            }
        } else {
            payload["atualizado"] = true;
            if(updateContato(payload,realm,loginData)){
                ShowToastMessage({type:'success',message1:FKNconstants.updatedSuccessfully});
            }
        }
    }
    const onFabButtonClick = () => {
        if (!nome.length) {
            setNomeError(true)
        } else {
            setNomeError(false)
        }
        if (!departamento) {
            setDepartamentoError(true);
        } else {
            setDepartamentoError(false);
        }
        if (aniversario && !isValidDate(aniversario)) {
            setAniversarioError(true);
            ShowToastMessage({ type: 'error', message1: FKNconstants.contatoAniversarioInvalid })
        } else {
            setAniversarioError(false);
        }
        if (!nome.length || !departamento || (aniversario && !isValidDate(aniversario))) {
            return
        }
        onSubmit()
    }

    const FabButton = () => (
        <FAB
            icon="content-save"
            color={theme.COLORS.BLACK}
            style={styles.fab}
            onPress={() => onFabButtonClick()}
        />
    );

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
                    <Appbar.Content title={FKNconstants.cadastroContato} titleStyle={{ fontFamily: theme.FONTFAMILY.BOLD, fontSize: theme.SIZES.EXTRA_LARGE }} style={{ marginLeft: 10, alignItems: 'flex-start' }} />
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
                        contentContainerStyle={{ paddingBottom: 150 }}
                    >
                        <View style={[styles.fieldContainer, { width: '50%' }]}>
                            <Text style={[styles.fieldLabel]}>{FKNconstants.codigo}</Text>
                            <CustomTextInput
                                fieldName='codigo'
                                value={codigoIdContato.toString()}
                                onChangeFieldValue={onChangeFieldValue}
                                editable={false}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel, { color: nomeError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.contatoNome}*</Text>
                            <CustomTextInput
                                fieldName='nome'
                                value={nome}
                                onChangeFieldValue={onChangeFieldValue}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel]}>{FKNconstants.contatoTelefone}</Text>
                            <CustomTextInput
                                fieldName='telefone'
                                value={telefone}
                                onChangeFieldValue={onChangeFieldValue}
                                type='phone-pad'
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel, { color: aniversarioError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.contatoAniversario}</Text>
                            <CustomTextInput
                                fieldName='aniversario'
                                value={aniversario}
                                onChangeFieldValue={onChangeFieldValue}
                                maxLength={10}
                                type='phone-pad'
                                placeholder="DDMMYYYY"
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel]}>{FKNconstants.contatoEmail}</Text>
                            <CustomTextInput
                                fieldName='email'
                                value={email}
                                onChangeFieldValue={onChangeFieldValue}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel]}>{FKNconstants.contatoObservacoes}</Text>
                            <CustomTextInput
                                fieldName='observacoes'
                                value={observacoes}
                                onChangeFieldValue={onChangeFieldValue}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel, { color: departamentoError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.contatoDepartmento}*</Text>
                            <CutomSearchTextInputIcon
                                fieldName='departamento'
                                value={departamento && departamento.descricao}
                                onChangeFieldValue={onSeachOpenBottomSheet}
                                placeholder={FKNconstants.contatoDepartmentPlaceholder}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                {openSheet &&
                    <BottomSheetCustom
                        bottomSheetRef={bottomSheetRef}
                        closeBottomSheet={closeBottomSheet}
                        data={departmentData}
                        // data={[
                        //     {
                        //         "idDepartamento":1,
                        //         "descricao":"PROPRIET./SÓCIO"
                        //     },
                        //     {
                        //         "idDepartamento":2,
                        //         "descricao":"ADMIN/GERÊNCIA"
                        //     },
                        //     {
                        //         "idDepartamento":3,
                        //         "descricao":"CONTAS À PAGAR"
                        //     },
                        //     {
                        //         "idDepartamento":4,
                        //         "descricao":"CONTAS RECEBER"
                        //     },
                        //     {
                        //         "idDepartamento":5,
                        //         "descricao":"COMPRAS"
                        //     },
                        //     {
                        //         "idDepartamento":6,
                        //         "descricao":"VENDAS"
                        //     },
                        //     {
                        //         "idDepartamento":7,
                        //         "descricao":"ASSIST. TÉCNICA"
                        //     },
                        //     {
                        //         "idDepartamento":8,
                        //         "descricao":"SUPORTE"
                        //     },
                        //     {
                        //         "idDepartamento":9,
                        //         "descricao":"EXPEDIÇÃO"
                        //     },
                        //     {
                        //         "idDepartamento":10,
                        //         "descricao":"LICITAÇÃO"
                        //     },
                        //     {
                        //         "idDepartamento":11,
                        //         "descricao":"OUTROS"
                        //     },
                        //     {
                        //         "idDepartamento":12,
                        //         "descricao":"CONTABILIDADE"
                        //     },
                        //     {
                        //         "idDepartamento":13,
                        //         "descricao":"ZELADOR"
                        //     },
                        //     {
                        //         "idDepartamento":14,
                        //         "descricao":"SINDICO"
                        //     },
                        //     {
                        //         "idDepartamento":15,
                        //         "descricao":"ADM CONDOMINIO"
                        //     },
                        //     {
                        //         "idDepartamento":16,
                        //         "descricao":"GESTOR"
                        //     }
                        // ]}
                        onSelect={onSelectFromBottomSheet}
                    />
                }
                {FabButton()}
                <Toast />
            </View>
        </View>
    );

}

export default ContatoCadastro;