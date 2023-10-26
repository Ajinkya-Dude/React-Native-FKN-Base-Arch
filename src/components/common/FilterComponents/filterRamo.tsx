import { Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Appbar } from "react-native-paper";
import { FKNconstants } from "../../constants";
import style from "../../../styles";
import styles from "./styles";
import theme from "../../../theme";

const FilterRamo = (props:any) => {
    const { navigation } = props && props;
    const drawerOpen = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.mainContainer}>
            <Appbar.Header statusBarHeight={0} style={[style.appBarStyles]}>
                <TouchableOpacity onPress={drawerOpen} style={{ paddingLeft: 5 }}>
                    <Icon
                        name={'arrow-back'}
                        color={'black'}
                        size={30}
                    />
                </TouchableOpacity>
                <Appbar.Content title={'Ramos'} titleStyle={{ fontFamily: theme.FONTFAMILY.BOLD, fontSize: theme.SIZES.EXTRA_LARGE }} style={{ alignItems: 'center' }} />
            </Appbar.Header>
        </View>
    );
}
export default FilterRamo;