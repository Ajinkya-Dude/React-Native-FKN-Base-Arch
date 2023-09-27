import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Login from './Login';
import RegisterIndex from '../Register';
import Home from '../Home/home';
import Register from '../Register/register';
import Verify from './Verify';

const Stack = createNativeStackNavigator();
function AuthNavigator({ initialRouteName }: { initialRouteName: string }): JSX.Element {
    console.log("initialRouteName",initialRouteName);
    
    return (
        <Stack.Navigator
            initialRouteName={initialRouteName}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='login' component={Login} />
            <Stack.Screen name='onboarding' component={RegisterIndex} />
            <Stack.Screen name='register' component={Register} />
            <Stack.Screen name='home' component={Home} />
            <Stack.Screen name='verify' component={Verify} />

        </Stack.Navigator>
    );
}

export default AuthNavigator;