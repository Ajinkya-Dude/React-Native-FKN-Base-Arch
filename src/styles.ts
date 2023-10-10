import { Dimensions, StyleSheet } from "react-native";
import theme from "./theme";
const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
    appBarStyles: {
        width: width,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        backgroundColor: theme.COLORS.WHITE,
        height:theme.verticalScale(60)
    },
    drawerIconStyle:{
        color:theme.COLORS.GREEN_DARK
    }
});

export default style;