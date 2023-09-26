import React from "react";
import { Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import * as NavigationService from "../../navigation/NavigationService";
import styles from "./styles";
import { FKNconstants } from "../../components/constants";
import { FKNGreenlogo, FKNlogo } from "../../assets";
import Button from "../../components/common/Button";

interface Props {
  navigate: any;
}

const App = () => {
  const handleonRegister = () => {
    NavigationService.navigate('register');
  }

  // const requesForPhoneCall = () =>{
  //   request(PERMISSIONS.IOS.ca)
  // }

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.subContainer}>
          <View style={styles.logoContainer}>
            <Image resizeMode={'stretch'} source={FKNlogo} style={styles.logo} />
          </View>
          <View style={styles.titleContainer}>
            <Image resizeMode={'stretch'} source={FKNGreenlogo} style={styles.greenLogo} />
            <Text style={styles.title}>{FKNconstants.appTitle}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button label={FKNconstants.register} onClick={handleonRegister} />
          </View>
        </View>
        <View style={styles.copyRightContainer}>
          <Text style={styles.copyRightTextContainer}>Copyright © 2016 FKN Informática.</Text>
          <Text style={styles.copyRightTextContainer}>Todos os direitos reservados.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;