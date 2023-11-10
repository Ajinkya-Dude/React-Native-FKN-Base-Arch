import { KeyboardAvoidingView, Platform, TouchableOpacity, View, Text } from "react-native";
import { Appbar, FAB } from "react-native-paper";
import styles from "./styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FKNconstants } from "../../../constants";
import style from "../../../../styles";
import theme from "../../../../theme";
import { ScrollView } from "react-native";
import CustomTextInput from "../../../common/CustomTextInput";
import { useRef, useState } from "react";
import BottomSheetCustom from "../../../common/CutomBottomSheet";
import BottomSheet from '@gorhom/bottom-sheet';
import CutomSearchTextInputIcon from "../../../common/CutomSearchTextInputIcon";
import { useSelector } from "react-redux";


const ContatoCadastro = ({ navigation }: any) => {

    const bottomSheetRef = useRef<BottomSheet>(null);


    const [nome, setNome] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [nomeError, setNomeError] = useState(false);
    const [departamentoError, setDepartamentoError] = useState(false);


    const [openSheet, setOpenSheet] = useState(false);
    const [searchedData, setSearchedData] = useState([]);


    const onGoback = () => {
        navigation.pop()
    }
    const onChangeFieldValue = (value: string, fieldName: string) => {
        console.log("onChangeFieldValue", value, fieldName);

    }
    const closeBottomSheet = () => {
        console.log("closeBottomSheet called");

        if (bottomSheetRef.current) {
            bottomSheetRef.current.close();
        }
        setOpenSheet(false);
    };
    const openBottomSheet = (item: any) => {
        console.log("openBottomSheet", item);

        if (bottomSheetRef.current) {
            bottomSheetRef.current.expand();
        }
    };
    const onSeachOpenBottomSheet = (item: any) => {
        // if (item === 'idRamo') {
        //     setSearchedData(ramoData)
        // } else if (item === 'idTransportadora') {
        //     setSearchedData(transportadoraData)
        // } else if (item === 'idRegiao') {
        //     setSearchedData(regiaoData)
        // } else if (item === 'idSegmento') {
        //     setSearchedData(segmentoData)
        // } else if (item === 'idPortador') {
        //     setSearchedData(portadorData)
        // }else if(item === 'idPrazo'){
        //     setSearchedData(prazoPagamentoData);
        // }else{
        //     setSearchedData([]);
        // }

        setOpenSheet(!openSheet);
        openBottomSheet(item);
    }
    const onSelectFromBottomSheet = (item: any) => {
        // console.log("onSelectFromBottomSheet", item, searchType);
        // if (searchType === 'idRamo') {
        //     console.log("onSelectFromBottomSheet-----", item, searchType);
        //     setIdRamo(item)
        // } else if (searchType === 'idTransportadora') {
        //     setIdTransportadora(item)
        // } else if (searchType === 'idRegiao') {
        //     setIdRegiao(item)
        // } else if (searchType === 'idSegmento') {
        //     setIdSegmento(item)
        // } else if (searchType === 'idPortador') {
        //     setIdPortador(item)
        // }
        closeBottomSheet()
    }
    const onFabButtonClick =() =>{
        if (!nome.length) {
            setNomeError(true)
        }
        if (!departamento.length) {
            setDepartamentoError(true);
        }
        if(!nome.length ||!departamento.length ){
            return
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
            <View style={{ flex:1 }}>
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
                            <Text style={[styles.fieldLabel,{color:nomeError ? theme.COLORS.ERROR : theme.COLORS.BLACK}]}>Nome*</Text>
                            <CustomTextInput
                                fieldName='nome'
                                value={nome}
                                onChangeFieldValue={onChangeFieldValue}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel]}>Telefone</Text>
                            <CustomTextInput
                                fieldName='nome'
                                value={nome}
                                onChangeFieldValue={onChangeFieldValue}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel]}>Aniversário</Text>
                            <CustomTextInput
                                fieldName='nome'
                                value={nome}
                                onChangeFieldValue={onChangeFieldValue}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel]}>E-mail</Text>
                            <CustomTextInput
                                fieldName='nome'
                                value={nome}
                                onChangeFieldValue={onChangeFieldValue}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel]}>Observações</Text>
                            <CustomTextInput
                                fieldName='nome'
                                value={nome}
                                onChangeFieldValue={onChangeFieldValue}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel,{color:departamentoError ? theme.COLORS.ERROR : theme.COLORS.BLACK}]}>Departamento*</Text>
                            <CutomSearchTextInputIcon
                                fieldName='departamento'
                                value={departamento && departamento.descricao}
                                onChangeFieldValue={onSeachOpenBottomSheet}
                                placeholder={'Selecione uma Departamento'}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                {openSheet &&
                    <BottomSheetCustom
                        bottomSheetRef={bottomSheetRef}
                        closeBottomSheet={closeBottomSheet}
                        //data={searchedData}
                        data={[
                            {
                                "idDepartamento":1,
                                "descricao":"PROPRIET./SÓCIO"
                            },
                            {
                                "idDepartamento":2,
                                "descricao":"ADMIN/GERÊNCIA"
                            },
                            {
                                "idDepartamento":3,
                                "descricao":"CONTAS À PAGAR"
                            },
                            {
                                "idDepartamento":4,
                                "descricao":"CONTAS RECEBER"
                            },
                            {
                                "idDepartamento":5,
                                "descricao":"COMPRAS"
                            },
                            {
                                "idDepartamento":6,
                                "descricao":"VENDAS"
                            },
                            {
                                "idDepartamento":7,
                                "descricao":"ASSIST. TÉCNICA"
                            },
                            {
                                "idDepartamento":8,
                                "descricao":"SUPORTE"
                            },
                            {
                                "idDepartamento":9,
                                "descricao":"EXPEDIÇÃO"
                            },
                            {
                                "idDepartamento":10,
                                "descricao":"LICITAÇÃO"
                            },
                            {
                                "idDepartamento":11,
                                "descricao":"OUTROS"
                            },
                            {
                                "idDepartamento":12,
                                "descricao":"CONTABILIDADE"
                            },
                            {
                                "idDepartamento":13,
                                "descricao":"ZELADOR"
                            },
                            {
                                "idDepartamento":14,
                                "descricao":"SINDICO"
                            },
                            {
                                "idDepartamento":15,
                                "descricao":"ADM CONDOMINIO"
                            },
                            {
                                "idDepartamento":16,
                                "descricao":"GESTOR"
                            }
                        ]}
                        onSelect={onSelectFromBottomSheet}
                    />
                }
                {FabButton()}
            </View>
        </View>
    );

}

export default ContatoCadastro;