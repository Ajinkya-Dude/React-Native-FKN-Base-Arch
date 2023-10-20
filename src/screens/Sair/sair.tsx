import { Alert, Text, TouchableOpacity, View } from "react-native";
import { FKNconstants } from "../../components/constants";
import style from "../../styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Appbar } from "react-native-paper";
import styles from "./styles";
import theme from "../../theme";
import Button from "../../components/common/Button";
import Checkbox from "../../components/common/Checkbox";
import { useState } from "react";
import { setUserFirstSync } from "../../store/reducer/registerReducer";
import { useDispatch } from "react-redux";

const Sair = (props: any) => {
    const { navigation } = props && props;
    const [removeData,setRemoveData] = useState<boolean>(false);

    const dispatch = useDispatch<any>();

    const drawerOpen = () => {
        navigation.openDrawer();
    };

    const onLogout = () =>{
        dispatch(setUserFirstSync(false));
    }
    const onSairAlert = () => {
        Alert.alert(FKNconstants.message, FKNconstants.sairMessage, [
            {
                text: FKNconstants.sairCancel,
                onPress: () => console.log('Ok Pressed'),
                style: 'cancel',
            },
            {
                text: FKNconstants.sairYes,
                onPress: () => console.log('Ok Pressed'),
                style: 'cancel',
            }
        ]);
    }
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
                <Appbar.Content title={FKNconstants.sair} titleStyle={{ fontFamily: theme.FONTFAMILY.BOLD, fontSize: theme.SIZES.EXTRA_LARGE }} style={{ alignItems: 'center' }} />
            </Appbar.Header>
            <View style={styles.subContainer}>
                    <View style={styles.userDetailContainer}>
                        <Text style={styles.userText}>{FKNconstants.sairUser}</Text>
                        <Text style={styles.userTextValue}>Harish</Text>
                    </View>
                    <Button label={FKNconstants.sairButton} onClick={onSairAlert} />
                    <View style={styles.checkBoxContainer}>
                        <Checkbox lable={FKNconstants.sairCheckboxText} onValueChange={(value)=>setRemoveData(value)} value={removeData} />
                    </View>
                    <View style={styles.attentionContainer}>
                        <Text style={styles.attentionText}>{FKNconstants.sairAttentionText}</Text>
                    </View>
            </View>
        </View>
    );
}
export default Sair;