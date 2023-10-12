import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Prospeccao from './prospeccao';

const Stack = createNativeStackNavigator();
function ProspeccaoNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'prospeccao'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='prospeccao' component={Prospeccao} />
        </Stack.Navigator>
    );
}

export default ProspeccaoNavigator;