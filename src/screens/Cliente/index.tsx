import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Cliente from './cliente';

const Stack = createNativeStackNavigator();
function ClienteNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'cliente'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='cliente' component={Cliente} />
        </Stack.Navigator>
    );
}

export default ClienteNavigator;