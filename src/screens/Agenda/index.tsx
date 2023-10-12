import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Agenda from './agenda';

const Stack = createNativeStackNavigator();
function AgendaNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'agenda'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='agenda' component={Agenda} />
        </Stack.Navigator>
    );
}

export default AgendaNavigator;