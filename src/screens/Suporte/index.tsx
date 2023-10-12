import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Suporte from './suporte';

const Stack = createNativeStackNavigator();
function SuporteNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'suporte'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='suporte' component={Suporte} />
        </Stack.Navigator>
    );
}

export default SuporteNavigator;