import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Duplicatas from './duplicatas';

const Stack = createNativeStackNavigator();
function DuplicatasNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'duplicatas'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='duplicatas' component={Duplicatas} />
        </Stack.Navigator>
    );
}

export default DuplicatasNavigator;