import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Register from '../screens/Register';
import Home from '../screens/Home/home';
import { navigationRef } from './NavigationService';
const Stack = createNativeStackNavigator();
function App() {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator>
                <Stack.Screen name='register' component={Register} />
                <Stack.Screen name='home' component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;