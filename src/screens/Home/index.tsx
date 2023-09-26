import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Home from './home';

const Stack = createNativeStackNavigator();
function HomeNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'home'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='home' component={Home} />
        </Stack.Navigator>
    );
}

export default HomeNavigator;