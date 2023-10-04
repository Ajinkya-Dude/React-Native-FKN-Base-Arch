import React, { useEffect, useState } from 'react';
import { Alert, Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from './styles';
import { FKNlogo } from '../../assets';
import Button from '../../components/common/Button';
import { FKNconstants } from '../../components/constants';
import theme from '../../theme';
import { useDispatch, useSelector } from 'react-redux';
import { LoginRequest } from '../../store/reducer/loginReducer/loginActions';
import Loader from '../../components/common/Loader';
import { setDeviceNameEnter } from '../../store/reducer/loginReducer';
import * as NavigationService from '../../navigation/NavigationService';

const Login = () => {
    const [isFocused, setIsFocused] = useState<Number>(0);
    const [deviceName, setDeviceName] = useState<string>('');
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useDispatch<any>();


    const loginData: any = useSelector((state: any) => state.loginReducer);
    const registerData: any = useSelector((state: any) => state.registerReducer);

    const isLoading = loginData.loading;

    const handleOnChange = (value: string, type: String) => {
        if (type === 'name') {
            setDeviceName(value)
        } else if (type === 'user') {
            setUserName(value);
        } else if (type === 'pass') {
            setPassword(value)
        }
    }

    const handleFocus = (value: Number) => {
        setIsFocused(value);
    };

    const handleBlur = (value: Number) => {
        setIsFocused(value);
    };
    const handleScreenPress = () => {
        Keyboard.dismiss();
    };

    const onAlert = () => {
        Alert.alert(FKNconstants.alertLoginTitle, FKNconstants.alertLoginMessage,
            [
                {
                    text: 'Ok',
                    onPress: () => console.log('Ok Pressed'),
                    style: 'cancel',
                },
            ])
    }

    const onHandleSubmit = () => {
        if ((deviceName || userName || password) === '') {
            onAlert();
            return
        }
        const payload = {
            url: registerData && registerData.data.FKN.url,
            loginPayload: {
                "usuario_api": {
                    "email": userName,
                    "pass": password
                }
            }
        }
        dispatch(LoginRequest(payload));
        dispatch(setDeviceNameEnter(deviceName))
       // NavigationService.navigate('verify');

    }
    return (
        <SafeAreaView>
            <TouchableWithoutFeedback onPress={handleScreenPress}>
                <View style={{ height: '100%', backgroundColor: theme.COLORS.WHITE }}>
                    <KeyboardAvoidingView
                        contentContainerStyle={{
                            padding: 5,
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    >
                        <ScrollView contentContainerStyle={{ height: '100%' }}>
                            <View style={styles.mainContainer}>
                                <View style={styles.logoContainer}>
                                    <Image resizeMode={'stretch'} source={FKNlogo} style={styles.logo} />
                                    <Text style={styles.title}>FKN Vendas Externas</Text>
                                </View>
                                <View style={styles.loginTitle}>
                                    <Text style={styles.pagetitle}>Força de Vendas FKN</Text>
                                </View>
                                <View style={{backgroundColor:theme.COLORS.WHITE,padding:theme.moderateScale(20),borderRadius:theme.moderateScale(20),marginVertical:theme.verticalScale(20)}}>
                                    <View style={styles.inputContainer}>
                                        <View style={styles.inputSubContainer}>
                                            <Text style={styles.textInputLabel}>{FKNconstants.registerLable1}</Text>
                                            <TextInput
                                                //ref={input => (this.userInput = input)}
                                                onFocus={() => handleFocus(1)}
                                                onBlur={() => handleBlur(0)}
                                                style={[styles.textInput, { borderColor: isFocused === 1 ? theme.COLORS.GREEN_DARK : theme.COLORS.DARK_GREY }]}
                                                placeholder='Ex. Pessol, Trabalho, Tablet, Celular, etc..'
                                                placeholderTextColor={theme.COLORS.DARK_GREY}
                                                onChangeText={(value) => { handleOnChange(value, 'name') }}
                                                value={deviceName}
                                                onSubmitEditing={() => {
                                                    this.userInput.focus();
                                                }}
                                            />
                                        </View>
                                        <View style={styles.inputSubContainer}>
                                            <Text style={styles.textInputLabel}>{FKNconstants.userName}</Text>
                                            <TextInput
                                                ref={input => (this.userInput = input)}
                                                onFocus={() => handleFocus(3)}
                                                onBlur={() => handleBlur(0)}
                                                style={[styles.textInput, { borderColor: isFocused === 3 ? theme.COLORS.GREEN_DARK : theme.COLORS.DARK_GREY }]}
                                                placeholder={FKNconstants.userName}
                                                placeholderTextColor={theme.COLORS.DARK_GREY}
                                                onChangeText={(value) => { handleOnChange(value, 'user') }}
                                                value={userName}
                                                onSubmitEditing={() => {
                                                    this.password.focus();
                                                }}
                                            />
                                        </View>
                                        <View style={styles.inputSubContainer}>
                                            <Text style={styles.textInputLabel}>{FKNconstants.password}</Text>
                                            <TextInput
                                                ref={input => (this.password = input)}
                                                placeholderTextColor={theme.COLORS.DARK_GREY}
                                                onFocus={() => handleFocus(2)}
                                                onBlur={() => handleBlur(0)}
                                                style={[styles.textInput, { borderColor: isFocused === 2 ? theme.COLORS.GREEN_DARK : theme.COLORS.DARK_GREY }]}
                                                placeholder={FKNconstants.password}
                                                onChangeText={(value) => { handleOnChange(value, 'pass') }}
                                                value={password}
                                                secureTextEntry
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <Button label={FKNconstants.access} onClick={onHandleSubmit} />
                                    </View>
                                </View>
                                <View style={styles.copyRightContainer}>
                                    <Text style={styles.copyRightTextContainer}>{FKNconstants.copyRight1}</Text>
                                    <Text style={styles.copyRightTextContainer}>{FKNconstants.copyRight2}</Text>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </TouchableWithoutFeedback>
            {isLoading && <Loader />}
        </SafeAreaView>
    );
}

export default Login;