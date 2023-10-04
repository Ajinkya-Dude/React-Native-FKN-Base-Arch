import React, { useEffect, useState } from "react";
import { Alert, Image, Platform, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import * as NavigationService from "../../navigation/NavigationService";
import styles from "./styles";
import { FKNconstants } from "../../components/constants";
import { FKNGreenlogo, FKNlogo } from "../../assets";
import Button from "../../components/common/Button";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";

interface Props {
  navigate: any;
}

const App = () => {

  const [permissionDenied, setPermissionDenied] = useState(false);
  const handleonRegister = () => {
    NavigationService.navigate('register');
  }

  const PermissionAlert = () => {
    setPermissionDenied(true);
    Alert.alert('Permission', FKNconstants.permissionPhonecall,
      [
        {
          text: 'CANCELAR',
          onPress: () => console.log('Ok Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => requestCallPermissions(),
          //style: 'cancel',
        },
      ])
  }
  const requestCallPermissions = async () => {
    if (Platform.OS === 'android') {
      const status = await check(PERMISSIONS.ANDROID.CALL_PHONE);
      console.log("Status permission", status);
      if (status === RESULTS.BLOCKED) {
        // Handle the case where the user has denied permission and blocked it.
      } else {
        const result = await request(PERMISSIONS.ANDROID.CALL_PHONE);
        console.log("result permission", result, "RESULTS", RESULTS);
        if (result === RESULTS.GRANTED) {
          // Permission granted, you can now manage calls.
        } else if (result === RESULTS.DENIED) {
          console.log("Permission denied------------", permissionDenied);
          PermissionAlert();
        } else {
          console.log("Permission bloked after ok denied------------", permissionDenied);
          // if (permissionDenied) {
          //   console.log("Permission Denied with value------------",permissionDenied);
          // } else {
          //   requestCallPermissions();
          // }
          // Permission denied, handle accordingly.
        }
      }
    } else {
      // const status = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
      // console.log("Status permission", status);
      // if (status === RESULTS.BLOCKED) {
      //   // Handle the case where the user has denied permission and blocked it.
      // } else {
      //   const result = await request(PERMISSIONS.IOS.MICROPHONE);
      //   if (result === RESULTS.GRANTED) {
      //     // Permission granted, you can now manage calls.
      //   } else {
      //     // Permission denied, handle accordingly.
      //   }
      // }
    }
  };

  useEffect(() => {
    requestCallPermissions();
  }, []);

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
          <Text style={styles.copyRightTextContainer}>{FKNconstants.copyRight1}</Text>
          <Text style={styles.copyRightTextContainer}>{FKNconstants.copyRight2}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default App;