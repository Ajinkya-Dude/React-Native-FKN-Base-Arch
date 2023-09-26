import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Auth from './screens/Login'
import { navigationRef } from './navigation/NavigationService';
import SplashScreen from './screens/SplashScreen';

const FKNapp = () => {
    const [showSplash, setShowSplash] = useState<Boolean>(true);
    useEffect(() => {
        const timer = setTimeout(async () => {
            await setShowSplash(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, [])
    return (
        <NavigationContainer ref={navigationRef}>
            {
                showSplash ?
                    <SplashScreen /> :
                    <Auth initialRouteName='onboarding' />

            }
        </NavigationContainer>
    );
}

export default FKNapp;