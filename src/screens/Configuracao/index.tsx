import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Configuracao from './configuracao';

const Stack = createNativeStackNavigator();
function ConfiguracaoNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'configuracao'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='configuracao' component={Configuracao} />
        </Stack.Navigator>
    );
}

export default ConfiguracaoNavigator;