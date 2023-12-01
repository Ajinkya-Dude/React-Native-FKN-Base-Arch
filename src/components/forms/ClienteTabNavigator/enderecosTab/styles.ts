import { StyleSheet } from "react-native";
import theme from "../../../../theme";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: theme.COLORS.GRAY
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
    subContainer:{
        width:'100%',
        paddingHorizontal:theme.horizontalScale(15),
        // paddingBottom:100
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
    cardMainContainer:{
        width: '90%',
        paddingHorizontal: theme.moderateScale(10),
        paddingBottom:theme.verticalScale(10),
        margin: theme.moderateScale(5),
        alignSelf: 'center',
        backgroundColor: theme.COLORS.WHITE,
        borderRadius: theme.moderateScale(10),
        elevation: 6,
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: { width: 1, height: 0 },
        shadowOpacity: 0.2
    },
    textTile: {
        fontFamily: theme.FONTFAMILY.MEDIUM,
        fontSize: theme.SIZES.MEDIUM,
        color: theme.COLORS.BLACK,
        margin: theme.moderateScale(3)
    },
});

export default styles;