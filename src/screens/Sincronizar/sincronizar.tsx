import { Modal, Platform, ScrollView, Text, View } from "react-native";
import styles from "./styles";
import { Appbar } from "react-native-paper";
import style from "../../styles";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from "../../theme";
import { FKNconstants } from "../../components/constants";
import CheckBox from "@react-native-community/checkbox";
import { useEffect, useState } from "react";
import Checkbox from "../../components/common/Checkbox";
import Button from "../../components/common/Button";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { useIsFocused } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Sincronizar = (props: any) => {
    const { navigation } = props && props;
    const [syncChangesOnlyBox, setSyncChangesOnlyCheckBox] = useState<boolean>(false);
    const [forceFullSyncBox, setForceFullSyncCheckBox] = useState<boolean>(false);
    const [generalHistoryBox, setGeneralHistoryCheckBox] = useState<boolean>(false);
    const [textProduceBox, setTextProduceCheckBox] = useState<boolean>(false);
    const [productImagesBox, setProductImagesCheckBox] = useState<boolean>(false);
    const [submitOrdersBox, setSubmitOrdersCheckBox] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(true);

    const isFocused = useIsFocused();
    const registerData: any = useSelector((state: any) => state.registerReducer);
    console.log("registerData.data.FKN.url",registerData.data.FKN);
    

    const drawerOpen = () => {
        navigation.openDrawer();
    };
    const requestCallPermissions = async (value: number) => {
        if (Platform.OS === 'android') {
            const status = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
            console.log("Status permission android", status);
            if (status === RESULTS.BLOCKED) {
                // Handle the case where the user has denied permission and blocked it.
                //PermissionAlert();
            } else {
                const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
                console.log("result permissions", result, "RESULT", RESULTS, "value", value);
                if (result === RESULTS.GRANTED) {
                    // Permission granted, you can now manage calls.
                } else if (result === RESULTS.DENIED) {
                    //PermissionAlert();
                } else if (result === RESULTS.BLOCKED) {
                    // if (!value)
                    //   requestCallPermissions(0);
                }
            }
        } else {
            const status = await check(PERMISSIONS.IOS.CAMERA);
            console.log("Status permission ios", status);
            if (status === RESULTS.BLOCKED) {
                // Handle the case where the user has denied permission and blocked it.
            } else {
                const result = await request(PERMISSIONS.IOS.CAMERA);
                console.log("Request permission ios", result);
                if (result === RESULTS.GRANTED) {
                    // Permission granted, you can now manage calls.
                } else {
                    // Permission denied, handle accordingly.
                }
            }
        }
    };

    useEffect(() => {
        requestCallPermissions(1);
    }, []);
    useEffect(()=>{
if(isFocused){
    setOpenModal(true);
}
    },[isFocused])

    const onCloseModal = () =>{
        setOpenModal(false);
    }
    const onOkModal = () =>{
        setOpenModal(false);
    }

    const attentionModal = () => {
        console.log("Opnmodal",openModal);
        
        return (
            <Modal
                animationType={'fade'}
                visible={openModal}
                transparent={true}
            >
                <View style={styles.modalConatainer}>
                    <View
                        style={styles.modalSubConatiner}
                    >
                        <View style={styles.modalTitleContainer}>
                            <Text style={styles.modalTitle}>
                                {FKNconstants.attentionModal}
                            </Text>
                        </View>
                        <View style={styles.modalContentContainer}>
                            <Text style={styles.modalContentText}>{FKNconstants.content}</Text>
                        </View>
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.modalCloseButton} onPress={onCloseModal}><Text style={styles.modalCloseButtonText}>{FKNconstants.close}</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.modalOkButton} onPress={onOkModal}><Text style={styles.modalOkButtonText}>{FKNconstants.ok}</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
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
                <Appbar.Content title={FKNconstants.sincronizar} titleStyle={{ fontFamily: theme.FONTFAMILY.BOLD, fontSize: theme.SIZES.EXTRA_LARGE }} style={{ alignItems: 'center' }} />
            </Appbar.Header>
            <View style={{ width: '100%' }}>
                <ScrollView contentContainerStyle={{ paddingBottom: 70 }}>
                    <View style={styles.container1}>
                        <Text style={styles.attentionText}>
                            {FKNconstants.attention}
                        </Text>
                    </View>
                    <View style={styles.container2}>
                        <View style={styles.container2Sub1}>
                            <Text style={styles.container2Sub1Text}>{FKNconstants.lastSync}</Text>
                            <Text style={styles.container2Sub1Text}>harish</Text>
                        </View>
                        <View style={styles.container2Sub2}>
                            <Text style={styles.container2Sub1Text}>{FKNconstants.lastCompleteSync}</Text>
                            <Text style={styles.container2Sub1Text}>harish</Text>
                        </View>
                    </View>
                    <View style={styles.conatiner3}>
                        <Text style={styles.attentionText}>{FKNconstants.synchronization}</Text>
                        <View style={{ marginVertical: 10 }}>
                            <Checkbox value={syncChangesOnlyBox} onValueChange={(newValue) => setSyncChangesOnlyCheckBox(newValue)} lable={FKNconstants.syncChangesOnly} />
                            <Checkbox value={forceFullSyncBox} onValueChange={(newValue) => setForceFullSyncCheckBox(newValue)} lable={FKNconstants.forceFullSync} />
                        </View>
                    </View>
                    <View style={styles.conatiner4}>
                        <Text style={styles.attentionText}>{FKNconstants.optional}</Text>
                        <View style={{ marginVertical: 10 }}>
                            <Checkbox value={textProduceBox} onValueChange={(newValue) => setTextProduceCheckBox(newValue)} lable={FKNconstants.textProduce} />
                            <Checkbox value={generalHistoryBox} onValueChange={(newValue) => setGeneralHistoryCheckBox(newValue)} lable={FKNconstants.generalHistory} />
                            <Checkbox value={productImagesBox} onValueChange={(newValue) => setProductImagesCheckBox(newValue)} lable={FKNconstants.productImages} />
                        </View>
                    </View>
                    <View style={styles.conatiner5}>
                        <Text style={styles.attentionText}>{FKNconstants.sendOnly}</Text>
                        <View style={{ marginVertical: 10 }}>
                            <Checkbox value={submitOrdersBox} onValueChange={(newValue) => setSubmitOrdersCheckBox(newValue)} lable={FKNconstants.submitOrders} />
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button buttonStyle={styles.buttonStyle} label={FKNconstants.synchronizeButtonText} onClick={() => { }} />
                    </View>
                    <View style={styles.conatiner6}>
                        <Text style={styles.container5Text}>{FKNconstants.recommendedWifi}</Text>
                        <Text style={styles.container5Text}>{FKNconstants.largeDataAttention}</Text>
                        <Text style={styles.container5Text}>{FKNconstants.longTimeProcess}</Text>
                    </View>
                </ScrollView>
            </View>
            {attentionModal()}
        </View>
    );
}
export default Sincronizar; 