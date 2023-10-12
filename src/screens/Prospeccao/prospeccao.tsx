import { Text, TouchableOpacity, View } from "react-native";
import { FKNconstants } from "../../components/constants";
import style from "../../styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Appbar } from "react-native-paper";
import styles from "./styles";
import theme from "../../theme";

const Prospeccao = (props:any) => {
    const { navigation } = props && props;
    const drawerOpen = () => {
        navigation.openDrawer();
    };
    return (
        <View style={styles.mainContainer}>
            <Appbar.Header statusBarHeight={0} style={[style.appBarStyles]}>
                <TouchableOpacity onPress={drawerOpen} style={{ paddingLeft: 5 }}>
                    <Icon
                        name={'menu'}
                        color={'black'}
                        size={30}
                    />
                </TouchableOpacity>
                <Appbar.Content title={FKNconstants.prospeccao} titleStyle={{ fontFamily: theme.FONTFAMILY.BOLD, fontSize: theme.SIZES.EXTRA_LARGE }} style={{ alignItems: 'center' }} />
            </Appbar.Header>
            <Text>Inicio</Text>
        </View>
    );
}
export default Prospeccao;