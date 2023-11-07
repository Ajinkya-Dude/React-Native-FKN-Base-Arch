import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import FilterAniversarios from '../../components/common/FilterComponents/filterAniversarios';
import FilterClassification from '../../components/common/FilterComponents/filterClassification';
import FilterRamo from '../../components/common/FilterComponents/filterRamo';
import FilterRegiao from '../../components/common/FilterComponents/filterRegiao';
import FilterUFCidade from '../../components/common/FilterComponents/filterUFCidade';
import FilterUFCidadeBairro from '../../components/common/FilterComponents/filterUFCidadeBairro';
import Cliente from './cliente';
import RegisterCliente from './registerCliente';
import EnderecosCadastro from '../../components/forms/ClienteTabNavigator/enderecosTab/cadastroEnderecos';
import ContatoCadastro from '../../components/forms/ClienteTabNavigator/contatoTab/cadastroContato';

const Stack = createNativeStackNavigator();
function ClienteNavigator(): JSX.Element {
    return (
        <Stack.Navigator
            initialRouteName={'cliente'}
            screenOptions={{ gestureEnabled: false, headerShown: false }}>
            <Stack.Screen name='cliente' component={Cliente} />
            <Stack.Screen name='filterRamo' component={FilterRamo} />
            <Stack.Screen name='filterRegiao' component={FilterRegiao} />
            <Stack.Screen name='filterUFCidade' component={FilterUFCidade} />
            <Stack.Screen name='filterUFCidadeBairro' component={FilterUFCidadeBairro} />
            <Stack.Screen name='filterClassification' component={FilterClassification} />
            <Stack.Screen name='filterAniversarios' component={FilterAniversarios} />
            <Stack.Screen name='clienteRegister' component={RegisterCliente} />
            <Stack.Screen name='enderecosCadastro' component={EnderecosCadastro} />
            <Stack.Screen name='contatoCadastro' component={ContatoCadastro} />
        </Stack.Navigator>
    );
}

export default ClienteNavigator;