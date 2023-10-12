import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Relatorios from './relatorios';

const Stack = createNativeStackNavigator();
function RelatoriosNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'relatorios'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='relatorios' component={Relatorios} />
        </Stack.Navigator>
    );
}

export default RelatoriosNavigator;