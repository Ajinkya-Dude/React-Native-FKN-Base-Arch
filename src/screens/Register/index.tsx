import React, { useEffect, useState } from "react";
import { Alert, Image, PermissionsAndroid, Platform, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
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

  const handleonRegister = () => {
    NavigationService.navigate('register');
  }

  const PermissionAlert = () => {
    Alert.alert('Permission', FKNconstants.permissionPhonecall,
      [
        {
          text: 'CANCELAR',
          onPress: () => console.log('Ok Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => requestCallPermissions(1),
          //style: 'cancel',
        },
      ])
  }
  // const requestPhoneCallPermission = async () => {
  //   try {
  //     const status = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CALL_PHONE);
  //     console.log("Status permission", status);
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.CALL_PHONE
  //       // {
  //       //   title: 'Cool Photo App Camera Permission',
  //       //   message:
  //       //     'Cool Photo App needs access to your camera ' +
  //       //     'so you can take awesome pictures.',
  //       //   buttonNeutral: 'Ask Me Later',
  //       //   buttonNegative: 'Cancel',
  //       //   buttonPositive: 'OK',
  //       // },
  //     );
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       console.log('You can use the camera');
  //     } else {
  //       console.log('Camera permission denied',granted);
  //       requestPhoneCallPermission();
  //     }
  //   } catch (err) {
  //     console.warn(err);
  //   }
  // };
  const requestCallPermissions = async (value: number) => {
    if (Platform.OS === 'android') {
      const status = await check(PERMISSIONS.ANDROID.CALL_PHONE);
      console.log("Status permission", status);
      if (status === RESULTS.BLOCKED) {
        // Handle the case where the user has denied permission and blocked it.
        //PermissionAlert();
      } else {
        const result = await request(PERMISSIONS.ANDROID.CALL_PHONE);
        console.log("result permissions", result, "RESULT", RESULTS,"value",value);
        if (result === RESULTS.GRANTED) {
          // Permission granted, you can now manage calls.
        } else if (result === RESULTS.DENIED) {
          PermissionAlert();
        } else if(result === RESULTS.BLOCKED) {
          // if (!value)
          //   requestCallPermissions(0);
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
    requestCallPermissions(1);
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