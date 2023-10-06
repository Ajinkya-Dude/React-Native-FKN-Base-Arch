import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import * as NavigationService from "../../navigation/NavigationService";
import { verifyStyles } from "./styles";
import { FKNconstants } from "../../components/constants";
import { FKNGreenlogo, FKNlogo } from "../../assets";
import Button from "../../components/common/Button";
import theme from "../../theme";
import DeviceInfo from "react-native-device-info";
import { useDispatch, useSelector } from "react-redux";
import { VerifyRequest } from "../../store/reducer/loginReducer/loginActions";
import { version } from "../../../package.json";
import Loader from "../../components/common/Loader";

interface Props {
    navigate: any;
}

const Verify = () => {
    const [uniqueId, setUniqueId] = useState<string>('')
    const [deviceModel, setDeviceModel] = useState<string>('');
    const dispatch = useDispatch<any>();

    const loginData: any = useSelector((state: any) => state.loginReducer);
    const registerData: any = useSelector((state: any) => state.registerReducer);

    console.log("loginData", loginData.verifyData);

    const isLoading = loginData.loading;

    const handleOnVerify = () => {
        //NavigationService.navigate('onboarding')
        const payload = {
            url: `${registerData && registerData.data.FKN.url}vendedor/listar?formato=JSON&nome=Thinkitive&nomeAndroid=${deviceModel}&idAndroid=${uniqueId}&idSerial=unknown&usuario=${loginData.data.usuario_api.email}&download=0&filial=1&versao=${version}&token=${loginData.data.usuario_api.token}`
        }
        dispatch(VerifyRequest(payload));
    }
    useEffect(() => {
        GetDeviceUniqueID();
    }, []);
    const GetDeviceUniqueID = () => {
        const model = DeviceInfo.getModel();
        setDeviceModel(model);
        DeviceInfo.getUniqueId().then((uniqueId) => {
            console.log("uniqueID", uniqueId);
            setUniqueId(uniqueId);
            // iOS: "FCDBD8EF-62FC-4ECB-B2F5-92C9E79AC7F9"
            // Android: "dd96dec43fb81c97"
            // Windows: "{2cf7cb3c-da7a-d508-0d7f-696bb51185b4}"
        });
    }

    return (
        <SafeAreaView>
            <View style={verifyStyles.mainContainer}>
                <View style={verifyStyles.logoContainer}>
                    <Image resizeMode={'stretch'} source={FKNlogo} style={verifyStyles.logo} />
                    <Text style={verifyStyles.title}>{FKNconstants.appFullTitle}</Text>
                </View>
                <View style={verifyStyles.titleButtonContainer}>
                    <View style={verifyStyles.descriptionContainer}>
                        <Text style={verifyStyles.descriptionText}>{FKNconstants.verifyDescription}</Text>
                    </View>
                    <View style={verifyStyles.buttonContainer}>
                        <Button label={FKNconstants.verify} onClick={handleOnVerify} />
                    </View>
                </View>
                <View style={verifyStyles.copyRightContainer}>
                    <Text style={verifyStyles.copyRightTextContainer}>{FKNconstants.copyRight1}</Text>
                    <Text style={verifyStyles.copyRightTextContainer}>{FKNconstants.copyRight2}</Text>
                </View>
                {isLoading && <Loader />}
            </View>
        </SafeAreaView>
    );
}

export default Verify;