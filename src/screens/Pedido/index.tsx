import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Pedido from './pedido';

const Stack = createNativeStackNavigator();
function PedidoNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'pedido'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='pedido' component={Pedido} />
        </Stack.Navigator>
    );
}

export default PedidoNavigator;