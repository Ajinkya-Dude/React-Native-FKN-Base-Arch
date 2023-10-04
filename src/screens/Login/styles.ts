import { StyleSheet } from "react-native";
import theme from "../../theme";

export const styles = StyleSheet.create({
    // onbording Register
    mainContainer: {
        //justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: theme.COLORS.GRAY
    },
    subContainer: {
        width: '100%',
        //flex: ,
        paddingTop: theme.verticalScale(15)
    },
    loginTitle: {
        alignItems: 'center',
        width: '100%',
        margin: 10
    },
    titleContainer: {
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontSize: theme.SIZES.LARGE,
        fontFamily: theme.FONTFAMILY.BOLD,
        color: theme.COLORS.BLACK,
        fontWeight: 'bold'
    },
    pagetitle: {
        fontSize: theme.SIZES.EXTRA_LARGE,
        fontFamily: theme.FONTFAMILY.BOLD,
        color: theme.COLORS.BLACK,
        fontWeight: 'bold'
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        //flex: 0.5,
    },
    logo: {
        height: theme.horizontalScale(40),
        width: theme.horizontalScale(40)
    },
    greenLogo: {
        height: theme.horizontalScale(50),
        width: theme.horizontalScale(150),
        marginBottom: 10
    },
    buttonContainer: {
        //flex:0.5 ,
        //width: '100%',
        //margin: 10
    },
    copyRightContainer: {
        width: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        //paddingBottom: 10,
        //flex: 0.5,
        //position:'absolute',
        bottom: 0,
        marginTop: theme.verticalScale(80)
    },
    copyRightTextContainer: {
        fontSize: theme.SIZES.BASE,
        color: theme.COLORS.BLACK
    },
    // register
    inputContainer: {
        //flex: 0.8,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        margin: theme.verticalScale(10)
    },
    inputSubContainer: {
        width: theme.horizontalScale(260),
        marginVertical: theme.verticalScale(10),
    },
    textInputLabel: {
        color: theme.COLORS.BLACK,
        fontSize: theme.SIZES.MEDIUM
    },
    textInput: {
        color: theme.COLORS.BLACK,
        fontFamily: theme.FONTFAMILY.BLACK,
        height: theme.verticalScale(50),
        marginVertical: theme.verticalScale(5),
        width: '100%',
        borderWidth: theme.moderateScale(1),
        padding: theme.moderateScale(10),
        borderRadius: theme.moderateScale(5),
        fontSize: theme.SIZES.MEDIUM
    }

});
export const verifyStyles = StyleSheet.create({
    mainContainer: { height: '100%', justifyContent: 'space-between', alignItems: 'center' },
    titleButtonContainer:{ width: '100%', alignItems: 'center' },
    title: {
        fontSize: theme.SIZES.LARGE,
        fontFamily: theme.FONTFAMILY.BOLD,
        color: theme.COLORS.BLACK,
        fontWeight: 'bold'
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0, marginTop: theme.verticalScale(20)
    },
    logo: {
        height: theme.horizontalScale(40),
        width: theme.horizontalScale(40)
    },
    descriptionContainer:{ width: '80%', justifyContent: 'center', alignItems: 'center',paddingHorizontal:20},
    descriptionText:{ fontSize: 16, color: theme.COLORS.BLACK },
    copyRightContainer: {
        width: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
        //paddingBottom: 10,
        //flex: 0.5,
        // position:'absolute',
        // bottom: 0,
        marginBottom: theme.verticalScale(70)
    },
    copyRightTextContainer: {
        fontSize: theme.SIZES.BASE,
        color: theme.COLORS.BLACK
    },
    buttonContainer: {
        width: '100%',
        marginTop: 40, 
        margin: 0
    },
})