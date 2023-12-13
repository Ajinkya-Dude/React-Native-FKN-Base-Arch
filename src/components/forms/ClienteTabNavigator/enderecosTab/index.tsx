import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Enderecostab from './enderecosTab';
import EnderecosCadastro from './cadastroEnderecos';
const Stack = createNativeStackNavigator();
function EnderecosTabNavigator(props:any): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'enderecostab'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='enderecostab' component={Enderecostab} initialParams={(props && props.route && props.route.params) || {}}/>
            {/* <Stack.Screen name='enderecosCadastro' component={EnderecosCadastro} /> */}
        </Stack.Navigator>
    );
}

export default EnderecosTabNavigator;