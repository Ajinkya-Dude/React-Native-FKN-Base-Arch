import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Sair from './sair';

const Stack = createNativeStackNavigator();
function SairNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'sair'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='sair' component={Sair} />
        </Stack.Navigator>
    );
}

export default SairNavigator;