import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Produto from './produto';

const Stack = createNativeStackNavigator();
function ProdutoNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'produto'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='produto' component={Produto} />
        </Stack.Navigator>
    );
}

export default ProdutoNavigator;