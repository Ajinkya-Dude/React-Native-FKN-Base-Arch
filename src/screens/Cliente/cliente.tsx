import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FKNconstants } from "../../components/constants";
import style from "../../styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Appbar } from "react-native-paper";
import styles from "./styles";
import theme from "../../theme";
import { useEffect, useState } from "react";
import OrderByModal from "../../components/common/OrderByModal";
import { clienteFilterData, clienteOrderByData } from "./ClienteData";
import FilterModal from "../../components/common/FilterModal";
//import { getDBConnection } from "../../sqliteDatabase/database";
import * as NavigationServicec from '../../navigation/NavigationService';


const Cliente = (props: any) => {
    const { navigation } = props && props;
    const [onSearchIconClick, setOnSearchIconClick] = useState<boolean>(false);
    const [searchTextValue, setSearchTextValue] = useState<string>('');
    const [orderByModal, setOrderByModal] = useState<boolean>(false);
    const [selectedOrderValue, setSelectedOrderValue] = useState('codingo');
    const [filterModal, setFilterModal] = useState<boolean>(false);
    const [filterCheckboxChecked,setFilterCheckboxChecked] = useState<any>(false);

    //const db = SQLite.openDatabase({ name: 'fkn_vendas_react-native.db', location: 'default' });
    //SQLite.enablePromise(true);

    const drawerOpen = () => {
        navigation.openDrawer();
    };
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
    // const createTable = async() => {
    //     const db = await getDBConnection();
    //     console.log("calling create table",db);

    //     await db.transaction((txn:any) => {
    //         console.log("is db running ",db);
    //               const data = txn.execute(
    //                 'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',[]);
    //         console.log("Data",data);
    //       });
    //   };

    //   useEffect(() => {
    //     createTable();
    //   }, []);

    const onFilterClick = () => {
        setFilterModal(!filterModal);
    }
    const onCleanFilter = () => {
        setFilterModal(!filterModal);
    }

    const onFilterCheckboxChecked = (value:boolean) =>{
        setFilterCheckboxChecked(value);
        onFilterClick();
    }

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
            <Text>Inicio</Text>
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
        </View>
    );
}
export default Cliente;