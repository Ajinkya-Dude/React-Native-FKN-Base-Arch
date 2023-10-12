import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Sobre from './sobre';

const Stack = createNativeStackNavigator();
function SobreNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'sobre'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='sobre' component={Sobre} />
        </Stack.Navigator>
    );
}

export default SobreNavigator;