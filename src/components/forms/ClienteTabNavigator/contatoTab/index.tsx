import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contatotab from './contatoTab';
const Stack = createNativeStackNavigator();
function ContatoTabNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'contatotab'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='contatotab' component={Contatotab} />
        </Stack.Navigator>
    );
}

export default ContatoTabNavigator;