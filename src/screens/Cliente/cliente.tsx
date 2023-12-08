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
import { useDispatch, useSelector } from "react-redux";
import { fknVendasidClienteNumber } from "../../store/reducer/clientsReducer";
import { ActivityIndicator } from "react-native";


const Cliente = (props: any) => {
    const { navigation } = props && props;
    const realm = realmContext.useRealm();

    const dispatch = useDispatch<any>();
    const loginData: any = useSelector((state: any) => state.loginReducer);
    const fknIdEmpresa = loginData.verifyData.FKN.vendedores[0].vendedor.empresas[0].empresa.idEmpresa;

    const [onSearchIconClick, setOnSearchIconClick] = useState<boolean>(false);
    const [searchTextValue, setSearchTextValue] = useState<string>('');
    const [orderByModal, setOrderByModal] = useState<boolean>(false);
    const [selectedOrderValue, setSelectedOrderValue] = useState('codingo');
    const [filterModal, setFilterModal] = useState<boolean>(false);
    const [filterCheckboxChecked, setFilterCheckboxChecked] = useState<any>(false);
    const [selectedDropdownFilter, setDropdownFilter] = useState('ativo');

    const [clientList, setClientList] = useState([]);
    const [limit, setLimit] = useState<number>(10);
    const [lastOffset, setLastOffset] = useState<number>(0);
    const [loading,setLoading] = useState<boolean>(false);

    const enderecoRealm:any = realm.objects('endereco');
    const contatoRealm:any = realm.objects('contato');

    // console.log("EnderecoRealm",enderecoRealm);
    // console.log("\nContatoRealm ",contatoRealm);

    // const results: any = realm.objects('endereco')
    //         .filtered('idEmpresaFK = $0 AND idClienteFK = $1', fknIdEmpresa, fknIdCliente).sorted('endFaturamento', true);
    
    


   
    const drawerOpen = () => {
        navigation.openDrawer();
    };
    const generateEnderecoData = (idClienteWeb:any) =>{
        const results: any = realm.objects('endereco')
                .filtered('idEmpresaFK = $0 AND idClienteFK = $1 AND endFaturamento = $2 ', fknIdEmpresa, idClienteWeb,1);
        console.log("Results",results);
        if(results.length){
            return results;
        }
        return null;
    }
    const generateClienteData = (item:any) =>{
        const payload ={
            "_id":item._id,
            "atualizado":item.atualizado,
            "celular":item.celular,
            "cnae":item.cnae,
            "cpfCnpj":item.cpfCnpj,
            "dtCadastro":item.dtCadastro,
            "dtFundacao":item.dtFundacao,
            "dtUltCon":item.dtUltCon,
            "dtUltOrc":item.dtUltOrc,
            "dtUltVen":item.dtUltVen,
            "email":item.email,
            "emailNfe":item.emailNfe,
            "enviado":item.enviado,
            "fantasia":item.fantasia,
            "fax":item.fax,
            "idClassificacaoFK":item.idClassificacaoFK,
            "idCliente":item.idCliente,
            "idClienteWeb":item.idClienteWeb,
            "idEmpresaFK":item.idEmpresaFK,
            "idPortadorFK":item.idPortadorFK,
            "idPrazoPagamentoFK":item.idPrazoPagamentoFK,
            "idProspeccaoFK":item.idProspeccaoFK,
            "idRamoFK":item.idRamoFK,
            "idRegiaoFK":item.idRegiaoFK,
            "idSegmentoFK":item.idSegmentoFK,
            "idSituacaoFK":item.idSituacaoFK,
            "idTransportadoraFK":item.idTransportadoraFK,
            "idVendedor":item.idVendedor,
            "novoCadastro":item.novoCadastro,
            "obsCadastral":item.obsCadastral,
            "permiteAltPortador":item.permiteAltPortador,
            "permiteAltPrazoPgto":item.permiteAltPrazoPgto,
            "razaoSocial":item.razaoSocial,
            "rgIe":item.rgIe,
            "tabelaPadrao":item.tabelaPadrao,
            "telefone":item.telefone,
            "tipo":item.tipo,
            "enderecoData":generateEnderecoData(item.idClienteWeb)
         }
         return payload;
    }
    const fetchClienteData = async() =>{
        const clienteRealm:any = realm.objects('cliente').slice(0, limit);
        if (clienteRealm.length) {
            setTimeout(()=>{
                const data = clienteRealm.map((item:any)=>{
                    const payload = generateClienteData(item);
                    return payload
                });
                setClientList(data);
                setLoading(false);
            },500);
        }
    }
    useEffect(() => {
        fetchClienteData()
    }, [limit]);

    // function onRealmChange(clienteRealm: any, changes: any) {
    //     console.log("Something changed!",realm.objects('cliente'));
    // }
    // useEffect(() => {
    //     try {
    //         clienteRealm.addListener("change", onRealmChange);
    //     } catch (error) {
    //         console.error(
    //             `An exception was thrown within the change listener: ${error}`
    //         );
    //     }
    //     // Remember to remove the listener when you're done!
    //     return () => {
    //         clienteRealm.removeListener("change", onRealmChange);
    //     };
    // }, [realmContext]);
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
        console.log("Value selected-", value);
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
        dispatch(fknVendasidClienteNumber())
        navigation.navigate('clienteRegister');
    }

    const onListItemClick = (item:any) => {
        console.log("onListItemClick",item.enderecoData);
        
        // navigation.navigate('clienteRegister', {
        //     clienteEdit: true
        // });
    }
    const FabButton = () => (
        <FAB
            icon="plus"
            color={theme.COLORS.BLACK}
            style={styles.fab}
            onPress={() => onFabButtonClick()}
        />
    );

    const handleLoadMoreCliente = () => {
        setLimit(prev => prev + 10);
        setLoading(true);
    }
    const handleScroll = (event: any) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        if (currentOffset > lastOffset) {
            console.log("Calling down");
        } else if (currentOffset < lastOffset) {
            console.log("Calling up");
            if (limit > 10)
                setLimit(prev => prev - 10);
        }
        // Update the last offset for the next scroll event
        setLastOffset(currentOffset);
    };

    const renderFooter = () => {
        if (!loading) return null;
    
        return (
          <View style={{ paddingVertical: 20 }}>
            <ActivityIndicator animating size="large" color={'#f76345'} />
          </View>
        );
      };
    
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
                    {clientList.length > 0 ?
                    <FlatList
                        data={clientList}
                        keyExtractor={(item:any) => item._id}
                        style={{ width: '100%' }}
                        onEndReached={handleLoadMoreCliente}
                        onEndReachedThreshold={0.1}
                        onScroll={handleScroll}
                        ListFooterComponent={renderFooter}
                        contentContainerStyle={{ paddingBottom: theme.verticalScale(200) }}
                        renderItem={({ item }:any) => {
                            return (
                                <TouchableOpacity onPress={() => { onListItemClick(item) }} style={styles.mainTileContainer}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                                        <View style={{ width: '95%' }}>
                                            <Text style={[styles.textTile, { fontWeight: 'bold' }]}>100010802</Text>
                                            <Text style={styles.textTile}>{item.razaoSocial || ''}</Text>
                                            <Text style={styles.textTile}>{item.fantasia || ''}</Text>
                                        </View>
                                        <View style={{ width: '5%' }}>
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
                                        <Text style={styles.textTile}>{`${item.enderecoData[0].cidade} - ${item.enderecoData[0].bairro}`}</Text>
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
                    /> : 
                    <View></View>
                    }
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