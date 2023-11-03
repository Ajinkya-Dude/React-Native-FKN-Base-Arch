import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Clientetab from './clienteTab'
const Stack = createNativeStackNavigator();
function ClienteTabNavigator(props:any): JSX.Element {
    
    return (
        <Stack.Navigator
            initialRouteName={'clientetab'}
            screenOptions={{ gestureEnabled: false, headerShown: false }} >
            <Stack.Screen name='clientetab' component={Clientetab} initialParams={(props && props.route && props.route.params)||{}}/>
        </Stack.Navigator>
    );
}

export default ClienteTabNavigator;