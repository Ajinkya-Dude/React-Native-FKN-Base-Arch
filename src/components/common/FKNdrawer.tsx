import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Image, StyleSheet, Text, View } from "react-native";
import { FKNlogo } from "../../assets";
import theme from "../../theme";

const FKNDrawer = (props: any) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={style.profileContainer}>
                <Image source={FKNlogo} style={style.logoStyle} />
                <View style={style.textContainer}>
                    <Text style={style.textStyle}>Harish Rakhonde</Text>
                </View>
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

const style = StyleSheet.create({
    profileContainer: {
        width: '100%', paddingVertical: 20, paddingHorizontal: 10, flexDirection: 'row',
    },
    logoStyle: { width: theme.horizontalScale(40), height: theme.horizontalScale(40) },
    textContainer: { marginLeft: theme.horizontalScale(20), justifyContent: 'center' },
    textStyle: { color: 'black', fontSize: theme.moderateScale(16), fontWeight: 'bold',fontFamily:theme.FONTFAMILY.BOLD }
});

export default FKNDrawer;