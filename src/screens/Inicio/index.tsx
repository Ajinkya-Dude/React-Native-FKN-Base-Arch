import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Inicio from './inicio';

const Stack = createNativeStackNavigator();
function InicioNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'inicio'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='inicio' component={Inicio} />
        </Stack.Navigator>
    );
}

export default InicioNavigator;