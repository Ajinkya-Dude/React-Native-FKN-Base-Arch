import { StyleSheet } from "react-native";
import theme from "../../../../theme";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: theme.COLORS.GRAY
    },
    subContainer:{
        width:'100%',
        paddingHorizontal:theme.horizontalScale(15),
        // paddingBottom:100
    },
    fab: {
        position: 'absolute',
        marginHorizontal:16,
        marginVertical:30,
        right: 0,
        bottom: 0,
        backgroundColor:theme.COLORS.GREEN_DARK,
        borderRadius:50
    },
    fieldContainer:{
        marginVertical:theme.verticalScale(5)
    },
    fieldLabel:{
        fontFamily:theme.FONTFAMILY.BLACK,
        fontSize:theme.SIZES.MEDIUM,
        color:theme.COLORS.BLACK,
        marginBottom:theme.moderateScale(5)
    },
    infoStyle:{
        alignItems:'center',
        marginTop:theme.verticalScale(10)
    }
});

export default styles;