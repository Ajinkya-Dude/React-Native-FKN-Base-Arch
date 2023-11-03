import { TouchableOpacity, View } from "react-native";
import { Appbar } from "react-native-paper";
import styles from "./styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FKNconstants } from "../../../components/constants";
import style from "../../../styles";
import theme from "../../../theme";


const EnderecosCadastro = ({navigation}:any) =>{

    const onGoback = () =>{
        navigation.pop()
    }

    return(
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
        </View>
    );

}

export default EnderecosCadastro;