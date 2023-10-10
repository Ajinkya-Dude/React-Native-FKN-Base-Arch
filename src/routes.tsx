import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { SafeAreaView, StatusBar, View, Dimensions } from 'react-native';
import { HomeNavigator, SincronizarNavigator } from './screens';
import { FKNconstants } from './components/constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import style from './styles';
import theme from './theme';
import FKNDrawer from './components/common/FKNdrawer';

const { width, height } = Dimensions.get('window');

const Drawer = createDrawerNavigator();
const iconSize = 20;
const Routes = (props: any) => {
    console.log("SDfghjk");

    return (
        <SafeAreaView>
            <View style={{ width: width, height: '100%', backgroundColor: 'grey' }}>
                <Drawer.Navigator
                    initialRouteName={FKNconstants.sincronizar}
                    screenOptions={{drawerType:'front', headerShown: false, drawerActiveTintColor: theme.COLORS.GREEN_DARK, drawerStyle: { width: '65%' }, }}
                    drawerContent={props => <FKNDrawer
                        // setNavigation={(navigation) => {
                        //   drawerNavigation.current = navigation
                        // }}
                        // setDrawerStatus={(value) => {
                        //   setDrawerState(value)
                        // }}
                        {...props} />}
                >
                    <Drawer.Screen name={FKNconstants.inicio} component={HomeNavigator}
                        options={{
                            title: FKNconstants.inicio,
                            drawerIcon: ({ focused }) => {
                                return (
                                    <IconIonicons name='home' size={iconSize} style={style.drawerIconStyle} />
                                );
                            }
                        }} />
                    <Drawer.Screen name={FKNconstants.cliente} component={HomeNavigator}
                        options={{
                            title: FKNconstants.cliente,
                            drawerIcon: ({ focused }) => {
                                return (
                                    <Icon name='co-present' size={iconSize} style={style.drawerIconStyle} />
                                );
                            }
                        }} />
                    <Drawer.Screen name={FKNconstants.prospeccao} component={HomeNavigator}
                        options={{
                            title: FKNconstants.prospeccao,
                            drawerIcon: ({ focused }) => {
                                return (
                                    <Icon name='person' size={iconSize} style={style.drawerIconStyle} />
                                );
                            }
                        }} />
                    <Drawer.Screen name={FKNconstants.produto} component={HomeNavigator}
                        options={{
                            title: FKNconstants.produto,
                            drawerIcon: ({ focused }) => {
                                return (
                                    <IconOcticons name='container' size={iconSize} style={style.drawerIconStyle} />
                                );
                            }
                        }} />
                    <Drawer.Screen name={FKNconstants.pedido} component={HomeNavigator}
                        options={{
                            title: FKNconstants.pedido,
                            drawerIcon: ({ focused }) => {
                                return (
                                    <IconOcticons name='list-unordered' size={iconSize} style={style.drawerIconStyle} />
                                );
                            }
                        }} />
                    <Drawer.Screen name={FKNconstants.duplicatas} component={HomeNavigator}
                        options={{
                            title: FKNconstants.duplicatas,
                            drawerIcon: ({ focused }) => {
                                return (
                                    <IconOcticons name='duplicate' size={iconSize} style={style.drawerIconStyle} />
                                );
                            }
                        }} />
                    <Drawer.Screen name={FKNconstants.agenda} component={HomeNavigator}
                        options={{
                            title: FKNconstants.agenda,
                            drawerIcon: ({ focused }) => {
                                return (
                                    <Icon name='view-agenda' size={iconSize} style={style.drawerIconStyle} />
                                );
                            }
                        }} />
                    <Drawer.Screen name={FKNconstants.ordem} component={HomeNavigator}
                        options={{
                            title: FKNconstants.ordem,
                            drawerIcon: ({ focused }) => {
                                return (
                                    <IconFontAwesome name='pencil' size={iconSize} style={style.drawerIconStyle} />
                                );
                            }
                        }} />
                    <Drawer.Screen name={FKNconstants.relatorios} component={HomeNavigator}
                        options={{
                            title: FKNconstants.relatorios,
                            drawerIcon: ({ focused }) => {
                                return (
                                    <IconIonicons name='document-text' size={iconSize} style={style.drawerIconStyle} />
                                );
                            }
                        }} />
                    <Drawer.Screen name={FKNconstants.sincronizar} component={SincronizarNavigator}
                        options={{
                            title: FKNconstants.sincronizar,
                            drawerIcon: ({ focused }) => {
                                return (
                                    <Icon name='sync' size={iconSize} style={style.drawerIconStyle} />
                                );
                            }
                        }} />
                    <Drawer.Screen name={FKNconstants.configuraccao} component={HomeNavigator}
                        options={{
                            title: FKNconstants.configuraccao,
                            drawerIcon: ({ focused }) => {
                                return (
                                    <IconIonicons name='settings' size={iconSize} style={style.drawerIconStyle} />
                                );
                            }
                        }} />
                    <Drawer.Screen name={FKNconstants.suporte} component={HomeNavigator}
                        options={{
                            title: FKNconstants.suporte,
                            drawerIcon: ({ focused }) => {
                                return (
                                    <Icon name='headset-mic' size={iconSize} style={style.drawerIconStyle} />
                                );
                            }
                        }} />
                    <Drawer.Screen name={FKNconstants.sobre} component={HomeNavigator}
                        options={{
                            title: FKNconstants.sobre,
                            drawerIcon: ({ focused }) => {
                                return (
                                    <IconOcticons name='info' size={iconSize} style={style.drawerIconStyle} />
                                );
                            }
                        }} />
                    <Drawer.Screen name={FKNconstants.sair} component={HomeNavigator}
                        options={{
                            title: FKNconstants.sair,
                            drawerIcon: ({ focused }) => {
                                return (
                                    <IconFontAwesome name='sign-out' size={iconSize} style={style.drawerIconStyle} />
                                );
                            }
                        }} />
                </Drawer.Navigator>
            </View>
        </SafeAreaView>
    );
}

export default Routes;