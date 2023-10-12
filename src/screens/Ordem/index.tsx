import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Ordem from './ordem';

const Stack = createNativeStackNavigator();
function OrdemNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'ordem'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='ordem' component={Ordem} />
        </Stack.Navigator>
    );
}

export default OrdemNavigator;