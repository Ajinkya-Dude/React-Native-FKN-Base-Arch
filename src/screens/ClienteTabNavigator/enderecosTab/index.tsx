import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Enderecostab from './enderecosTab';
import EnderecosCadastro from './cadastroEnderecos';
const Stack = createNativeStackNavigator();
function EnderecosTabNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'enderecostab'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='enderecostab' component={Enderecostab} />
            {/* <Stack.Screen name='enderecosCadastro' component={EnderecosCadastro} /> */}
        </Stack.Navigator>
    );
}

export default EnderecosTabNavigator;