import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import * as NavigationService from "../../navigation/NavigationService";
import { Appbar, Menu } from "react-native-paper";
import styles from "./style";
import style from "../../styles";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HamburgerMenu } from "../../assets";
import theme from "../../theme";

const Home = ({ navigation }: any) => {
    console.log("Home ----", navigation);
    const drawerOpen = () => {
        navigation.openDrawer();
    };
    return (
        <SafeAreaView>
            <View style={styles.mainContainer}>
                <Appbar.Header style={style.appBarStyles}>
                    {/* <Menu
                        onDismiss={() => { }}
                        anchor={<Appbar.Action icon={HamburgerMenu} onPress={drawerOpen} />}
                    /> */}
                    <TouchableOpacity onPress={drawerOpen} style={{ paddingLeft:5}}>
                        <Icon
                            name={'menu'}
                            color={'black'}
                            size={30}
                        />
                    </TouchableOpacity>
                    <Appbar.Content title={'Sincronizar'} titleStyle={{ fontFamily: theme.FONTFAMILY.BOLD, fontSize: theme.SIZES.EXTRA_LARGE }} style={{alignItems:'center'}} />
                    {/* <Menu
                        visible={true}
                        onDismiss={() => ({})}
                        anchor={<Appbar.Action icon={HamburgerMenu} onPress={drawerOpen} />}
                    >
                        <Menu.Item onPress={() => { console.log('Option 1 was pressed') }} title="Option 1" />
                        <Menu.Item onPress={() => { console.log('Option 2 was pressed') }} title="Option 2" />
                        <Menu.Item onPress={() => { console.log('Option 3 was pressed') }} title="Option 3" disabled />
                    </Menu> */}

                </Appbar.Header>
                {/* <View style={{ width: '100%', backgroundColor: 'white', padding: 10, alignItems: 'flex-start', flexDirection: 'row',justifyContent:'center'}}>
                    <TouchableOpacity style={{left:10,position:'absolute'}} onPress={drawerOpen}>
                        <Icon
                            name={'menu'}
                            color={'black'}
                            size={30}
                        />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontFamily: theme.FONTFAMILY.BOLD, fontSize: theme.SIZES.EXTRA_LARGE, color: theme.COLORS.BLACK }}>Sincronizar</Text>
                    </View>
                    <View style={{right:10,position:'absolute'}}>
                        <Text style={{ fontFamily: theme.FONTFAMILY.BOLD, fontSize: theme.SIZES.EXTRA_LARGE, color: theme.COLORS.BLACK }}>Sincronizar</Text>
                    </View>
                </View> */}
                <View>
                    <Text style={{ color: 'black' }}>
                        Harish Rakhonde
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    );
}
export default Home;