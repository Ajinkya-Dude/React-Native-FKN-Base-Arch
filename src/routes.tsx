import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { View } from 'react-native';
import { HomeNavigator } from './screens';
import { FKNconstants } from './components/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import style from './styles';
import theme from './theme';

const Drawer = createDrawerNavigator();
const Routes = (props: any) => {
    console.log("SDfghjk");

    return (
        <View style={{ width: '100%', height: '100%', backgroundColor: 'grey' }}>
            <Drawer.Navigator
                initialRouteName={FKNconstants.sincronizar}
                screenOptions={{ headerShown: false, drawerActiveTintColor: theme.COLORS.GREEN_DARK, drawerStyle: { width: '65%' } }}
            >
                <Drawer.Screen name={FKNconstants.inicio} component={HomeNavigator}
                    options={{
                        title: FKNconstants.inicio,
                        drawerIcon: ({ focused }) => {
                            return (
                                <IconIonicons name='home' size={20} style={style.drawerIconStyle} />
                            );
                        }
                    }} />
                <Drawer.Screen name={FKNconstants.cliente} component={HomeNavigator}
                    options={{
                        title: FKNconstants.cliente,
                        drawerIcon: ({ focused }) => {
                            return (
                                <Icon name='co-present' size={20} style={style.drawerIconStyle} />
                            );
                        }
                    }} />
                <Drawer.Screen name={FKNconstants.prospeccao} component={HomeNavigator}
                    options={{
                        title: FKNconstants.prospeccao,
                        drawerIcon: ({ focused }) => {
                            return (
                                <Icon name='person' size={20} style={style.drawerIconStyle} />
                            );
                        }
                    }} />
                <Drawer.Screen name={FKNconstants.produto} component={HomeNavigator}
                    options={{
                        title: FKNconstants.produto,
                        drawerIcon: ({ focused }) => {
                            return (
                                <IconOcticons name='container' size={20} style={style.drawerIconStyle} />
                            );
                        }
                    }} />
                <Drawer.Screen name={FKNconstants.pedido} component={HomeNavigator}
                    options={{
                        title: FKNconstants.pedido,
                        drawerIcon: ({ focused }) => {
                            return (
                                <IconOcticons name='list-unordered' size={20} style={style.drawerIconStyle} />
                            );
                        }
                    }} />
                <Drawer.Screen name={FKNconstants.duplicatas} component={HomeNavigator}
                    options={{
                        title: FKNconstants.duplicatas,
                        drawerIcon: ({ focused }) => {
                            return (
                                <IconOcticons name='duplicate' size={20} style={style.drawerIconStyle} />
                            );
                        }
                    }} />
                <Drawer.Screen name={FKNconstants.agenda} component={HomeNavigator}
                    options={{
                        title: FKNconstants.agenda,
                        drawerIcon: ({ focused }) => {
                            return (
                                <Icon name='view-agenda' size={20} style={style.drawerIconStyle} />
                            );
                        }
                    }} />
                <Drawer.Screen name={FKNconstants.ordem} component={HomeNavigator}
                    options={{
                        title: FKNconstants.ordem,
                        drawerIcon: ({ focused }) => {
                            return (
                                <IconFontAwesome name='pencil' size={20} style={style.drawerIconStyle} />
                            );
                        }
                    }} />
                <Drawer.Screen name={FKNconstants.relatorios} component={HomeNavigator}
                    options={{
                        title: FKNconstants.relatorios,
                        drawerIcon: ({ focused }) => {
                            return (
                                <IconIonicons name='document-text' size={20} style={style.drawerIconStyle} />
                            );
                        }
                    }} />
                <Drawer.Screen name={FKNconstants.sincronizar} component={HomeNavigator}
                    options={{
                        title: FKNconstants.sincronizar,
                        drawerIcon: ({ focused }) => {
                            return (
                                <Icon name='sync' size={20} style={style.drawerIconStyle} />
                            );
                        }
                    }} />
                <Drawer.Screen name={FKNconstants.configuraccao} component={HomeNavigator}
                    options={{
                        title: FKNconstants.configuraccao,
                        drawerIcon: ({ focused }) => {
                            return (
                                <IconIonicons name='settings' size={20} style={style.drawerIconStyle} />
                            );
                        }
                    }} />
                <Drawer.Screen name={FKNconstants.suporte} component={HomeNavigator}
                    options={{
                        title: FKNconstants.suporte,
                        drawerIcon: ({ focused }) => {
                            return (
                                <Icon name='headset-mic' size={20} style={style.drawerIconStyle} />
                            );
                        }
                    }} />
                <Drawer.Screen name={FKNconstants.sobre} component={HomeNavigator}
                    options={{
                        title: FKNconstants.sobre,
                        drawerIcon: ({ focused }) => {
                            return (
                                <IconOcticons name='info' size={20} style={style.drawerIconStyle} />
                            );
                        }
                    }} />
                <Drawer.Screen name={FKNconstants.sair} component={HomeNavigator}
                    options={{
                        title: FKNconstants.sair,
                        drawerIcon: ({ focused }) => {
                            return (
                                <IconFontAwesome name='sign-out' size={20} style={style.drawerIconStyle} />
                            );
                        }
                    }} />
            </Drawer.Navigator>
        </View>
    );
}

export default Routes;