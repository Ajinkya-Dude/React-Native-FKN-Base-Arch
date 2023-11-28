import { KeyboardAvoidingView, Platform, TouchableOpacity, View, ScrollView } from "react-native";
import { Appbar, FAB } from "react-native-paper";
import styles from "./styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FKNconstants } from "../../../constants";
import style from "../../../../styles";
import theme from "../../../../theme";
import { Text } from "react-native";
import CustomTextInput from "../../../common/CustomTextInput";
import Checkbox from "../../../common/Checkbox";
import { useState } from "react";

import StateList from '../../../../utils/stateList.json'
import { checkInternetConnection } from "../../../../utils/globalFunctions";
import Dropdown from "../../../common/CustomDropdown";
import DropdownField from '../../../common/CutomDropdownScroll';


const EnderecosCadastro = ({ navigation }: any) => {

    const [billingAddressChecked, setBillingAddressChecked] = useState(false);
    const [codigo, setCodigo] = useState('1000000000012');
    const [nome, setNome] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [selectedDropdownFilter, setDropdownFilter] = useState('AC');

    const [nomeError, setNomeError] = useState(false);
    const [ruaError, setRuaError] = useState(false);
    const [numeroError, setNumeroError] = useState(false);
    const [bairroError, setBairroError] = useState(false);
    const [cidadeError, setCidadeError] = useState(false);


    const onGoback = () => {
        navigation.pop()
    }

    const onChangeFieldValue = (value: string, fieldName: string) => {
        console.log("onChangeFieldValue", value, fieldName);

    }

    const onFabButtonClick = async () => {
        const internetCheck = await checkInternetConnection();

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
        setDropdownFilter(value);
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
                        contentContainerStyle={{ paddingBottom: 150 }}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                            <View style={[styles.fieldContainer, { width: '50%' }]}>
                                <Text style={[styles.fieldLabel]}>{FKNconstants.codigo}</Text>
                                <CustomTextInput
                                    fieldName='codigo'
                                    value={codigo}
                                    onChangeFieldValue={onChangeFieldValue}
                                    editable={false}
                                />
                            </View>
                            <View style={{ width: '50%' }}>
                                <Checkbox value={billingAddressChecked} lable={FKNconstants.billingAddress} onValueChange={(value) => setBillingAddressChecked(value)} />
                            </View>
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel, { color: nomeError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.nome}*</Text>
                            <CustomTextInput
                                fieldName='nome'
                                value={nome}
                                onChangeFieldValue={onChangeFieldValue}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel, { color: ruaError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.rua}*</Text>
                            <CustomTextInput
                                fieldName='rua'
                                value={rua}
                                onChangeFieldValue={onChangeFieldValue}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel, { color: numeroError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.numero}*</Text>
                            <CustomTextInput
                                fieldName='numero'
                                value={numero}
                                onChangeFieldValue={onChangeFieldValue}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel]}>{FKNconstants.complemento}</Text>
                            <CustomTextInput
                                fieldName='complemento'
                                value={complemento}
                                onChangeFieldValue={onChangeFieldValue}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel, { color: bairroError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.bairro}*</Text>
                            <CustomTextInput
                                fieldName='bairro'
                                value={bairro}
                                onChangeFieldValue={onChangeFieldValue}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel, { color: cidadeError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.cidade}*</Text>
                            <CustomTextInput
                                fieldName='cidade'
                                value={cidade}
                                onChangeFieldValue={onChangeFieldValue}
                            />
                        </View>
                        <View style={styles.fieldContainer}>
                            <Text style={[styles.fieldLabel, { color: cidadeError ? theme.COLORS.ERROR : theme.COLORS.BLACK }]}>{FKNconstants.uf}*</Text>
                            <DropdownField
                            items={StateList}
                            selectedItem={selectedDropdownFilter}
                            setSelectedItem={onTipoSelect}
                        />
                        </View>
                        
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
            {FabButton()}
        </View>
    );

}

export default EnderecosCadastro;