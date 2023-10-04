import { StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
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
        flex: 3,
        paddingTop: theme.verticalScale(15)
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
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical:theme.verticalScale(20),
        //flex: 0.8,
        //backgroundColor:'red'
    },
    logo: {
        height: theme.horizontalScale(40),
        width: theme.horizontalScale(40)
    },
    greenLogo: {
        height: theme.horizontalScale(50),
        width: theme.horizontalScale(150),
        marginBottom: theme.verticalScale(10)
    },
    buttonContainer: {
        //flex: 1,
       // width: '100%'
    },
    copyRightContainer: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    copyRightTextContainer: {
        fontSize: theme.SIZES.BASE,
        color: theme.COLORS.BLACK
    },
    // register
    inputContainer: {
        //flex: 1,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center'
    },
    inputSubContainer: {
        width: theme.horizontalScale(260),
        marginVertical: theme.verticalScale(10),
    },
    textInputLabel: {
        color: theme.COLORS.BLACK,
        fontSize: theme.SIZES.MEDIUM
    },
    textRequired: {
        color: 'red',
        fontSize: theme.SIZES.SAMLL
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
export default styles;