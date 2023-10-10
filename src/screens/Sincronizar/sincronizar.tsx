import { Text, View } from "react-native";
import styles from "./styles";
import { Appbar } from "react-native-paper";
import style from "../../styles";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from "../../theme";
import { FKNconstants } from "../../components/constants";

const Sincronizar = (props: any) => {
    const { navigation } = props && props;
    const drawerOpen = () => {
        navigation.openDrawer();
    };
    return (
        <View style={styles.mainContainer}>
            <Appbar.Header style={style.appBarStyles}>
                {/* <Menu
                        onDismiss={() => { }}
                        anchor={<Appbar.Action icon={HamburgerMenu} onPress={drawerOpen} />}
                    /> */}
                <TouchableOpacity onPress={drawerOpen} style={{ paddingLeft: 5 }}>
                    <Icon
                        name={'menu'}
                        color={'black'}
                        size={30}
                    />
                </TouchableOpacity>
                <Appbar.Content title={FKNconstants.sincronizar} titleStyle={{ fontFamily: theme.FONTFAMILY.BOLD, fontSize: theme.SIZES.EXTRA_LARGE }} style={{ alignItems: 'center' }} />
            </Appbar.Header>
            <Text style={{ color: 'black' }}>Sincronizar</Text>
        </View>
    );
}
export default Sincronizar;