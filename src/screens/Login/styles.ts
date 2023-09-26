import { StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
    // onbording Register
    mainContainer: {
        //justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: theme.COLORS.WHITE
    },
    subContainer: {
        width: '100%',
        flex: 3,
        paddingTop: theme.verticalScale(15)
    },
    loginTitle:{
        alignItems:'center',
        width:'100%',
        margin:10
    },
    titleContainer: {
        alignItems: 'center',
        flex: 1,
    },
    title: {
        fontSize: theme.SIZES.EXTRA_LARGE,
        fontFamily: theme.FONTFAMILY.BOLD,
        color: theme.COLORS.BLACK,
        fontWeight: 'bold'
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin:10
        //flex: 0.5,
    },
    logo: {
        height: theme.horizontalScale(80),
        width: theme.horizontalScale(80)
    },
    greenLogo: {
        height: theme.horizontalScale(50),
        width: theme.horizontalScale(150),
        marginBottom: 10
    },
    buttonContainer: {
        //flex:0.5 ,
        width: '100%',
        margin:10
    },
    registerButtonContainer: {
        width: '70%',
        paddingVertical: theme.verticalScale(15),
        paddingHorizontal: theme.horizontalScale(15),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.COLORS.BUTTON_BG,
        alignSelf: 'center',
        borderRadius: theme.moderateScale(10),
        elevation: 16,
        shadowColor: theme.COLORS.BLACK_LIGHT,
        shadowOffset: {
            width: theme.horizontalScale(3),
            height: theme.verticalScale(3)
        },
        shadowOpacity: 0.6
    },
    registerButtonText: {
        fontSize: theme.SIZES.MEDIUM,
        color: theme.COLORS.WHITE,
        fontWeight: 'bold'
    },
    copyRightContainer: {
        width: '100%',
        // justifyContent: 'center',
         alignItems: 'center',
        //paddingBottom: 10,
        //flex: 0.5,
        //position:'absolute',
        bottom:0,
        marginTop:100
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
        margin:10
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
export default styles;