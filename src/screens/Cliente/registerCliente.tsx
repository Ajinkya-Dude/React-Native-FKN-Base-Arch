import { TouchableOpacity, View } from "react-native";
import { Appbar } from "react-native-paper";
import style from "../../styles";
import styles from "./styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from "../../theme";
import { FKNconstants } from "../../components/constants";
import ClienteNavigatorTabs from "../../components/forms/ClienteTabNavigator";

const RegisterCliente = (props: any) => {
    const { navigation, route } = props && props;
    const isEdit = route && route.params && route.params.clienteEdit
   
    const onGoback = () => {
        navigation.pop()
    }

    return (
        <View style={styles.mainContainer}>
            <Appbar.Header statusBarHeight={0} style={[style.appBarStyles, { justifyContent: 'space-between' }]}>
                <TouchableOpacity onPress={onGoback} style={{ paddingLeft: 5, width: '10%' }}>
                    <Icon
                        name={'arrow-back'}
                        color={'black'}
                        size={25}
                    />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row' }}>
                    {!isEdit ? <Appbar.Content title={FKNconstants.clienteRegister} titleStyle={{ fontFamily: theme.FONTFAMILY.BOLD, fontSize: theme.SIZES.EXTRA_LARGE }} style={{ marginLeft: 10, alignItems: 'flex-start' }} /> :
                        <>
                            <Appbar.Action color={theme.COLORS.BLACK_LIGHT} icon="format-list-bulleted" />
                            <Appbar.Action color={theme.COLORS.BLACK_LIGHT} icon="alpha-s-circle-outline" />
                            <Appbar.Action color={theme.COLORS.BLACK_LIGHT} icon="bag-checked" />
                            <Appbar.Action color={theme.COLORS.BLACK_LIGHT} icon="playlist-remove" />
                            <Appbar.Action color={theme.COLORS.BLACK_LIGHT} icon="cart-outline" />
                            <Appbar.Action color={theme.COLORS.BLACK_LIGHT} icon="content-paste" />
                        </>
                    }
                </View>
            </Appbar.Header>
            <ClienteNavigatorTabs props={props} />
        </View>
    );

}

export default RegisterCliente;