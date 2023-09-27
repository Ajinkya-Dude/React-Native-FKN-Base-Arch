import React, { useState } from 'react';
import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import {styles} from './styles';
import { FKNlogo } from '../../assets';
import Button from '../../components/common/Button';
import { FKNconstants } from '../../components/constants';
import theme from '../../theme';
import * as NavigationService from '../../navigation/NavigationService';
import { useSelector } from 'react-redux';

const Login = () => {
    const [isFocused, setIsFocused] = useState<Number>(0);

    const handleFocus = (value: Number) => {
        setIsFocused(value);
    };

    const handleBlur = (value: Number) => {
        setIsFocused(value);
    };
    const handleScreenPress = () => {
        Keyboard.dismiss();
    };
    const loginData: any = useSelector((state: any) => state.loginReducer.login);

    const onHandleSubmit = () => {
        NavigationService.navigate('verify')
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
                        <ScrollView contentContainerStyle={{ height: '100%', paddingBottom: 100 }}>
                            <View style={styles.mainContainer}>
                                <View style={styles.logoContainer}>
                                    <Image resizeMode={'stretch'} source={FKNlogo} style={styles.logo} />
                                    <Text style={styles.title}>FKN Vendas Externas</Text>
                                </View>
                                <View style={styles.loginTitle}>
                                    <Text style={styles.title}>Força de Vendas FKN</Text>
                                </View>
                                <View style={styles.inputContainer}>
                                    <View style={styles.inputSubContainer}>
                                        <Text style={styles.textInputLabel}>{FKNconstants.registerLable1}</Text>
                                        <TextInput
                                            onFocus={() => handleFocus(1)}
                                            onBlur={() => handleBlur(0)}
                                            style={[styles.textInput, { borderColor: isFocused === 1 ? theme.COLORS.GREEN_DARK : theme.COLORS.DARK_GREY }]}
                                            placeholder='Ex. Pessol, Trabalho, Tablet, Celular, etc..'
                                            placeholderTextColor={theme.COLORS.DARK_GREY}
                                        />
                                    </View>
                                    <View style={styles.inputSubContainer}>
                                        <Text style={styles.textInputLabel}>{FKNconstants.userName}</Text>
                                        <TextInput
                                            onFocus={() => handleFocus(3)}
                                            onBlur={() => handleBlur(0)}
                                            style={[styles.textInput, { borderColor: isFocused === 3 ? theme.COLORS.GREEN_DARK : theme.COLORS.DARK_GREY }]}
                                            placeholder={FKNconstants.userName}
                                            placeholderTextColor={theme.COLORS.DARK_GREY}
                                        />
                                    </View>
                                    <View style={styles.inputSubContainer}>
                                        <Text style={styles.textInputLabel}>{FKNconstants.password}</Text>
                                        <TextInput
                                            placeholderTextColor={theme.COLORS.DARK_GREY}
                                            onFocus={() => handleFocus(2)}
                                            onBlur={() => handleBlur(0)}
                                            style={[styles.textInput, { borderColor: isFocused === 2 ? theme.COLORS.GREEN_DARK : theme.COLORS.DARK_GREY }]}
                                            placeholder={FKNconstants.password}
                                        />
                                    </View>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button label={FKNconstants.access} onClick={onHandleSubmit} />
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
        </SafeAreaView>
    );
}

export default Login;