import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { FKNconstants } from "../../components/constants";
import style from "../../styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Appbar } from "react-native-paper";
import styles from "./styles";
import theme from "../../theme";
import { useState } from "react";
import OrderByModal from "../../components/common/OrderByModal";
import { clienteOrderByData } from "./ClienteData";

const Cliente = (props: any) => {
    const { navigation } = props && props;
    const [onSearchIconClick, setOnSearchIconClick] = useState<boolean>(false);
    const [searchTextValue, setSearchTextValue] = useState<string>('');
    const [orderByModal, setOrderByModal] = useState<boolean>(false);
    const [selectedOrderValue,setSelectedOrderValue] = useState('codingo');

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
                <Appbar.Action color={theme.COLORS.BLACK_LIGHT} icon="dots-vertical" onPress={() => { }} />
            </Appbar.Header>
            <Text>Inicio</Text>
            {orderByModal && <OrderByModal data={clienteOrderByData} visible={orderByModal} onModalClose={onOrderByClick} onModalOk={onOrderApplyChanges} selected={selectedOrderValue} />}
        </View>
    );
}
export default Cliente;