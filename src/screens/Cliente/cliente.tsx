import { FlatList, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FKNconstants } from "../../components/constants";
import style from "../../styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { Appbar, FAB } from "react-native-paper";
import styles from "./styles";
import theme from "../../theme";
import { useEffect, useState } from "react";
import OrderByModal from "../../components/common/OrderByModal";
import { clienteFilterData, clienteOrderByData, clienteDropdownData } from "./ClienteData";
import FilterModal from "../../components/common/FilterModal";
//import { getDBConnection } from "../../sqliteDatabase/database";
import * as NavigationServicec from '../../navigation/NavigationService';
import { realmContext } from "../../database/database";
import { createAgenda } from "../../database/AgendaTable";
import Dropdown from "../../components/common/CustomDropdown";


const Cliente = (props: any) => {
    const { navigation } = props && props;
    const realm = realmContext.useRealm();
    const [onSearchIconClick, setOnSearchIconClick] = useState<boolean>(false);
    const [searchTextValue, setSearchTextValue] = useState<string>('');
    const [orderByModal, setOrderByModal] = useState<boolean>(false);
    const [selectedOrderValue, setSelectedOrderValue] = useState('codingo');
    const [filterModal, setFilterModal] = useState<boolean>(false);
    const [filterCheckboxChecked, setFilterCheckboxChecked] = useState<any>(false);
    const [selectedDropdownFilter, setDropdownFilter] = useState('ativo');



    const data = [
        {
            "idAgendaWeb": 5,
            "idAgenda": 6,
            "assunto": "FINAL DO TREINAMENTO ",
            "contato": "GI",
            "dtProgramada": "2019-10-10 17:17:00",
            "notifica": true,
            "dtNotifica": "2019-10-10 17:14:00",
            "downloadAndroid": true,
            "idAgendaERP": 1000329201910101717,
            "downloadERP": false,
            "remessa": 0,
            "codUsuario": 7,
            "idClienteFK": 329,
            "idResultado": 0,
            "idVendedor": 11,
            "idProspeccaoFK": 0,
            "idEmpresaFK": 0,
            "compositekey": '11-329-2019-10-10 17:17:00',
            "enviar": 123,
            "android": 145
        },
        {
            "idAgendaWeb": 7,
            "idAgenda": 8,
            "assunto": "FINAL DO TREINAMETNO",
            "contato": "MARCO",
            "dtProgramada": "2020-11-09 12:00:00",
            "notifica": true,
            "dtNotifica": "2020-11-09 11:58:00",
            "downloadAndroid": true,
            "idAgendaERP": 1000329202011091200,
            "downloadERP": false,
            "remessa": 0,
            "codUsuario": 7,
            "idClienteFK": 329,
            "idResultado": 0,
            "idVendedor": 11,
            "idProspeccaoFK": 0,
            "idEmpresaFK": 0,
            "compositekey": '11-329-2020-11-09 12:00:00',
            "enviar": 124,
            "android": 345
        },
        {
            "idAgendaWeb": 5,
            "idAgenda": 6,
            "assunto": "FdsdINAL DO TREINAMENTO ",
            "contato": "GI",
            "dtProgramada": "2019-10-10 17:17:00",
            "notifica": true,
            "dtNotifica": "2019-10-10 17:14:00",
            "downloadAndroid": true,
            "idAgendaERP": 1000329201910101717,
            "downloadERP": false,
            "remessa": 0,
            "codUsuario": 7,
            "idClienteFK": 329,
            "idResultado": 0,
            "idVendedor": 11,
            "idProspeccaoFK": 0,
            "idEmpresaFK": 0,
            "compositekey": '11-329-2019-10-10 17:17:00',
            "enviar": 123,
            "android": 145
        },
        {
            "idAgendaWeb": 7,
            "idAgenda": 8,
            "assunto": "FIsdsaNAL DO TREINAMETNO",
            "contato": "MARCO",
            "dtProgramada": "2020-11-09 12:00:00",
            "notifica": true,
            "dtNotifica": "2020-11-09 11:58:00",
            "downloadAndroid": true,
            "idAgendaERP": 1000329202011091200,
            "downloadERP": false,
            "remessa": 0,
            "codUsuario": 7,
            "idClienteFK": 329,
            "idResultado": 0,
            "idVendedor": 11,
            "idProspeccaoFK": 0,
            "idEmpresaFK": 0,
            "compositekey": '11-329-2020-11-09 12:00:00',
            "enviar": 124,
            "android": 345
        },
        {
            "idAgendaWeb": 5,
            "idAgenda": 6,
            "assunto": "FINAL dsdDO TREINAMENTO ",
            "contato": "GI",
            "dtProgramada": "2019-10-10 17:17:00",
            "notifica": true,
            "dtNotifica": "2019-10-10 17:14:00",
            "downloadAndroid": true,
            "idAgendaERP": 1000329201910101717,
            "downloadERP": false,
            "remessa": 0,
            "codUsuario": 7,
            "idClienteFK": 329,
            "idResultado": 0,
            "idVendedor": 11,
            "idProspeccaoFK": 0,
            "idEmpresaFK": 0,
            "compositekey": '11-329-2019-10-10 17:17:00',
            "enviar": 123,
            "android": 145
        },
        {
            "idAgendaWeb": 7,
            "idAgenda": 8,
            "assunto": "FINAL DO fdfTREINAMETNO",
            "contato": "MARCO",
            "dtProgramada": "2020-11-09 12:00:00",
            "notifica": true,
            "dtNotifica": "2020-11-09 11:58:00",
            "downloadAndroid": true,
            "idAgendaERP": 1000329202011091200,
            "downloadERP": false,
            "remessa": 0,
            "codUsuario": 7,
            "idClienteFK": 329,
            "idResultado": 0,
            "idVendedor": 11,
            "idProspeccaoFK": 0,
            "idEmpresaFK": 0,
            "compositekey": '11-329-2020-11-09 12:00:00',
            "enviar": 124,
            "android": 345
        }
    ]
    const drawerOpen = () => {
        navigation.openDrawer();
    };
    function onRealmChange() {
        console.log("Something changed!",realm.objects('cliente'));
    }
    useEffect(() => {
        try {
            realm.addListener("change", onRealmChange);
        } catch (error) {
            console.error(
                `An exception was thrown within the change listener: ${error}`
            );
        }
        // Remember to remove the listener when you're done!
        return () => {
            realm.removeListener("change", onRealmChange);
        };
    }, [realmContext]);
    const onSearchIcon = () => {
        setOnSearchIconClick(!onSearchIconClick);
    }

    const onChangeSearchText = (value: string) => {
        setSearchTextValue(value);
    }
    const onOrderByClick = () => {
        setOrderByModal(!orderByModal);
    }

    const onOrderApplyChanges = (value: any) => {
        console.log("Value selected", value);
        setOrderByModal(false);
        setSelectedOrderValue(value);
    }

    const onFilterClick = () => {
        setFilterModal(!filterModal);
    }
    const onCleanFilter = () => {
        setFilterModal(!filterModal);
    }

    const onFilterCheckboxChecked = (value: boolean) => {
        setFilterCheckboxChecked(value);
        onFilterClick();
    }

    const onFabButtonClick = () => {
        navigation.navigate('clienteRegister');
    }

    const onListItemClick = () => {
        navigation.navigate('clienteRegister', {
            clienteEdit: true
        });
    }
    const FabButton = () => (
        <FAB
            icon="plus"
            color={theme.COLORS.BLACK}
            style={styles.fab}
            onPress={() => onFabButtonClick()}
        />
    );

    return (
        <View style={styles.mainContainer}>
            <Appbar.Header statusBarHeight={0} style={[style.appBarStyles]}>
                <TouchableOpacity onPress={onSearchIconClick ? onSearchIcon : drawerOpen} style={{ paddingLeft: 5, width: '10%' }}>
                    <Icon
                        name={onSearchIconClick ? 'arrow-back' : 'menu'}
                        color={'black'}
                        size={25}
                    />
                </TouchableOpacity>
                {onSearchIconClick ?
                    <View style={style.appSearchBar}>
                        <TextInput
                            value={searchTextValue}
                            onChangeText={onChangeSearchText}
                            placeholder={'Buscar'}
                            placeholderTextColor={theme.COLORS.LIGHT_GRAY}
                            style={style.appSearchTextInput}
                        />
                        {searchTextValue &&
                            <TouchableOpacity onPress={() => onChangeSearchText('')} style={{ width: '15%' }}>
                                <Icon
                                    name={'highlight-remove'}
                                    color={theme.COLORS.BLACK_LIGHT}
                                    size={theme.moderateScale(25)}
                                />
                            </TouchableOpacity>}
                    </View> :
                    <>
                        <Appbar.Content title={FKNconstants.cliente} titleStyle={{ fontFamily: theme.FONTFAMILY.BOLD, fontSize: theme.SIZES.EXTRA_LARGE }} style={{ marginLeft: 10, alignItems: 'flex-start' }} />
                        <Appbar.Action color={theme.COLORS.BLACK_LIGHT} icon="magnify" onPress={onSearchIcon} />
                    </>
                }
                <TouchableOpacity onPress={() => { setOrderByModal(true) }} style={{ marginLeft: 10 }}>
                    <Icon
                        name={'abc'}
                        color={theme.COLORS.BLACK_LIGHT}
                        size={theme.moderateScale(35)}
                    />
                </TouchableOpacity>
                <Appbar.Action color={theme.COLORS.BLACK_LIGHT} icon="dots-vertical" onPress={onFilterClick} />
            </Appbar.Header>
            <View style={{ flex: 1 }}>
                <Dropdown
                    onSelect={setDropdownFilter}
                    options={clienteDropdownData}
                    selectedValue={selectedDropdownFilter}
                    dropStyle={{
                        borderWidth: 0,
                        width: '40%',
                        alignSelf: 'flex-end',
                        borderRadius: 10,
                        minHeight: 30,
                        elevation: 6,
                        shadowColor: theme.COLORS.BLACK,
                        shadowOffset: { width: 1, height: 0 },
                        shadowOpacity: 0.3
                    }}
                    dropdownStyle={{
                        borderWidth: 0,
                        width: '40%',
                        alignSelf: 'flex-end',
                        elevation: 6,
                        shadowColor: theme.COLORS.BLACK,
                        shadowOffset: { width: '10%', height: '1' },
                        shadowOpacity: 1,
                        // backgroundColor:'red'
                    }}
                    containerStyle={{
                        paddingVertical: theme.moderateScale(5),
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1,
                        right: theme.horizontalScale(10)
                    }}
                />
                <View style={{ width: '100%' }}>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.assunto}
                        style={{ width: '100%' }}
                        contentContainerStyle={{ paddingBottom: theme.verticalScale(200) }}
                        renderItem={(item) => {
                            return (
                                <TouchableOpacity onPress={() => { onListItemClick() }} style={styles.mainTileContainer}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <View>
                                            <Text style={[styles.textTile, { fontWeight: 'bold' }]}>100010802</Text>
                                            <Text style={styles.textTile}>GEBIT</Text>
                                            <Text style={styles.textTile}>GEBIT</Text>
                                        </View>
                                        <View>
                                            <TouchableOpacity onPress={() => { setOrderByModal(true) }}>
                                                <IconCommunity
                                                    name={'dots-vertical'}
                                                    color={theme.COLORS.BLACK_LIGHT}
                                                    size={theme.moderateScale(25)}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View>
                                        <Text style={styles.textTile}>WEG EQUIPAMENTOS ELETRICOS S/A - MOTORES</Text>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={styles.labelValueContainer}>
                                                <Text style={styles.textLabelTile}>UC : </Text>
                                                <Text style={styles.textValueTile}>0</Text>
                                            </View>
                                            <View style={styles.labelValueContainer}>
                                                <Text style={styles.textLabelTile}>UO : </Text>
                                                <Text style={styles.textValueTile}>0</Text>
                                            </View>
                                            <View style={[styles.labelValueContainer, { backgroundColor: theme.COLORS.WARNING }]}>
                                                <Text style={styles.textLabelTile}>UV : </Text>
                                                <Text style={styles.textValueTile}>10</Text>
                                            </View>
                                            <View style={styles.labelValueContainer}>
                                                <Text style={styles.textLabelTile}>PM : </Text>
                                                <Text style={styles.textValueTile}>0</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />

                </View>
            </View>

            {orderByModal && <OrderByModal data={clienteOrderByData} visible={orderByModal} onModalClose={onOrderByClick} onModalOk={onOrderApplyChanges} selected={selectedOrderValue} />}
            {filterModal &&
                <FilterModal
                    data={clienteFilterData}
                    onModalClose={onFilterClick}
                    visible={filterModal}
                    navigation={navigation}
                    onCleanFilter={onCleanFilter}
                    onFilterCheckboxChecked={onFilterCheckboxChecked}
                    checkboxChecked={filterCheckboxChecked}
                />
            }
            {FabButton()}
        </View>
    );
}
export default Cliente;