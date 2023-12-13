import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contatotab from './contatoTab';
const Stack = createNativeStackNavigator();
function ContatoTabNavigator(props:any): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'contatotab'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='contatotab' component={Contatotab} initialParams={(props && props.route && props.route.params) || {}}/>
        </Stack.Navigator>
    );
}

export default ContatoTabNavigator;