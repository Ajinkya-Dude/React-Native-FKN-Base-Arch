import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ClienteTabNavigator from './clienteTab';
import theme from '../../../theme';
import { FKNconstants } from '../../constants';
import EnderecosTabNavigator from './enderecosTab';
import ContatoTabNavigator from './contatoTab';
import Routes from '../../../routes';

const Tab = createMaterialTopTabNavigator();

function ClienteNavigatorTabs({props}:any) {
  
  return (
    <Tab.Navigator  screenOptions={{
      tabBarLabelStyle: { fontSize: 12},
      tabBarIndicatorStyle:{backgroundColor:theme.COLORS.GREEN_DARK}
    }}>
      <Tab.Screen name={FKNconstants.clienteTab} component={ClienteTabNavigator} initialParams={(props && props.route && props.route.params) || {}} />
      <Tab.Screen name={FKNconstants.enderecosTab} component={EnderecosTabNavigator} initialParams={(props && props.route && props.route.params) || {}}/>
      <Tab.Screen name={FKNconstants.contatoTab} component={ContatoTabNavigator} initialParams={(props && props.route && props.route.params) || {}}/>
    </Tab.Navigator>
  );
}

export default ClienteNavigatorTabs;