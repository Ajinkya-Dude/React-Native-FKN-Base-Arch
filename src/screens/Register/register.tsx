import React, { useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import styles from './styles';
import { FKNlogo } from '../../assets';
import Button from '../../components/common/Button';
import { FKNconstants } from '../../components/constants';
import theme from '../../theme';
import * as NavigationService from '../../navigation/NavigationService';
import { useDispatch, useSelector } from 'react-redux';
import { RegisterRequest } from '../../store/reducer/registerReducer/registerActions';
import { AppDispatch } from '../../store';
import Loader from '../../components/common/Loader';
import { setChaveCredentials } from '../../store/reducer/registerReducer';

const Register = () => {
    const [isFocused, setIsFocused] = useState<Number>(0);
    const [chaveInput, setChaveInput] = useState<string>('');
    const [required, setRequired] = useState<Boolean>(false);
    const dispatch = useDispatch<any>();

    const handleFocus = (value: Number) => {
        setIsFocused(value);
    };

    const handleBlur = (value: Number) => {
        setIsFocused(value);
    };
    const handleScreenPress = () => {
        Keyboard.dismiss();
    };
    const registerData: any = useSelector((state: any) => state.registerReducer);
    const isLoading = registerData.loading;
    console.log("register", registerData);

    const handleOnChangeText = (value: string) => {
        setChaveInput(value.trim());
        setRequired(false);
    }

    const onHandleButton = () => {
        NavigationService.navigate('login')
        // setRequired(false);
        // if (chaveInput === '') {
        //     setRequired(true);
        //     return
        // }
        // const payload = {
        //     chave: chaveInput
        // }
        // console.log("Payload", payload);
        // dispatch(RegisterRequest(payload))
        //dispatch(setChaveCredentials(chaveInput));
    }

    return (
        <SafeAreaView>
            <TouchableWithoutFeedback onPress={handleScreenPress}>
                <View style={{ height: '100%' }}>
                    <KeyboardAvoidingView
                        contentContainerStyle={{
                            padding: 5,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    >
                        <ScrollView contentContainerStyle={{ height: '100%' }}>
                            <View style={styles.mainContainer}>
                                <View style={styles.logoContainer}>
                                    <Image resizeMode={'stretch'} source={FKNlogo} style={styles.logo} />
                                    <Text style={styles.title}>{FKNconstants.appFullTitle}</Text>
                                </View>
                                <View style={styles.inputContainer}>
                                    {/* <View style={styles.inputSubContainer}>
                                        <Text style={styles.textInputLabel}>{FKNconstants.registerLable1}</Text>
                                        <TextInput
                                            onFocus={() => handleFocus(1)}
                                            onBlur={() => handleBlur(0)}
                                            style={[styles.textInput, { borderColor: isFocused === 1 ? theme.COLORS.GREEN_DARK : theme.COLORS.DARK_GREY }]}
                                            placeholder='Ex. Pessol, Trabalho, Tablet, Celular, etc..'
                                            placeholderTextColor={theme.COLORS.DARK_GREY}
                                        />
                                    </View> */}
                                    <View style={styles.inputSubContainer}>
                                        <Text style={styles.textInputLabel}>{FKNconstants.registerLabel2}</Text>
                                        <TextInput
                                            placeholderTextColor={theme.COLORS.DARK_GREY}
                                            onFocus={() => handleFocus(2)}
                                            onBlur={() => handleBlur(0)}
                                            style={[styles.textInput, { borderColor: isFocused === 2 ? theme.COLORS.GREEN_DARK : theme.COLORS.DARK_GREY }]}
                                            placeholder='Chave'
                                            onChangeText={handleOnChangeText}
                                            value={chaveInput}
                                        />
                                        {required && <Text style={styles.textRequired}>{FKNconstants.required}</Text>}
                                    </View>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button label={FKNconstants.confirm} onClick={onHandleButton} />
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

export default Register;