import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Sincronizar from './sincronizar';

const Stack = createNativeStackNavigator();
function SincronizarNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'sincronizar'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='sincronizar' component={Sincronizar} />
        </Stack.Navigator>
    );
}

export default SincronizarNavigator;