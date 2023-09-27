import React from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import * as NavigationService from "../../navigation/NavigationService";
import { verifyStyles } from "./styles";
import { FKNconstants } from "../../components/constants";
import { FKNGreenlogo, FKNlogo } from "../../assets";
import Button from "../../components/common/Button";
import theme from "../../theme";

interface Props {
    navigate: any;
}

const Verify = () => {
    const handleonRegister = () => {
        NavigationService.navigate('register');
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
                        <Button label={FKNconstants.verify} onClick={() => { NavigationService.navigate('onboarding') }} />
                    </View>
                </View>
                <View style={verifyStyles.copyRightContainer}>
                    <Text style={verifyStyles.copyRightTextContainer}>{FKNconstants.copyRight1}</Text>
                    <Text style={verifyStyles.copyRightTextContainer}>{FKNconstants.copyRight2}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

export default Verify;