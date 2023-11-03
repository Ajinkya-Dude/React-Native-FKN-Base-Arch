import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Auth from './screens/Login'
import { navigationRef } from './navigation/NavigationService';
import SplashScreen from './screens/SplashScreen';
import { useSelector } from 'react-redux';
import Routes from './routes';

const FKNapp = () => {
    const [showSplash, setShowSplash] = useState<Boolean>(true);
    const [initialScreen, setInitialScreen] = useState<string>('onboarding');

    const registerData: any = useSelector((state: any) => state.registerReducer);
    const loginData: any = useSelector((state: any) => state.loginReducer);
    const isLoggedIn = loginData && loginData.isLoggedIn;
    useEffect(() => {
        if (registerData && registerData.data && registerData.data.FKN && registerData.data.FKN.contrato) {
            setInitialScreen('login')
        }
    }, [registerData, loginData]);
    useEffect(() => {
        const timer = setTimeout(async () => {
            await setShowSplash(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <NavigationContainer ref={navigationRef}>
            {
                showSplash ?
                    <SplashScreen /> :
                    // !isLoggedIn ?
                    //     <Auth initialRouteName={initialScreen} />
                    //     :
                        <Routes />

            }
        </NavigationContainer>
    );
}

export default FKNapp;