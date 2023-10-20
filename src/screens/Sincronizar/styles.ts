import { StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: theme.COLORS.GRAY
    },
    container1: {
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center',
        padding: theme.moderateScale(20),
    },
    attentionText: {
        fontSize: theme.SIZES.LARGE,
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: theme.FONTFAMILY.BOLD,
        color: theme.COLORS.BLACK
    },
    container2: {
        width: '80%',
        alignItems: 'center',
        alignSelf: 'center',
        padding: theme.moderateScale(10),
    },
    container2Sub1: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: theme.verticalScale(10)
    },
    container2Sub2: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: theme.verticalScale(10)
    },
    container2Sub1Text: {
        fontSize: theme.SIZES.BASE,
        textAlign: 'center',
        fontFamily: theme.FONTFAMILY.MEDIUM,
        color: theme.COLORS.BLACK
    },
    conatiner3: {
        paddingLeft: theme.horizontalScale(20),
        width: '80%',
        alignItems: 'flex-start',
        marginBottom: 10
    },
    conatiner4: {
        paddingLeft: theme.horizontalScale(20),
        width: '80%',
        alignItems: 'flex-start',
        marginBottom: 10
    },
    conatiner5: {
        paddingLeft: theme.horizontalScale(20),
        width: '80%',
        alignItems: 'flex-start'
    },
    container5Text: {
        fontFamily: theme.FONTFAMILY.MEDIUM,
        fontSize: theme.SIZES.BASE,
        color: theme.COLORS.BLACK,
        marginVertical: theme.verticalScale(20)
    },
    buttonContainer: { width: '100%', alignItems: 'center' },
    buttonStyle: {
        width: '85%',
        paddingVertical: theme.verticalScale(15),
        paddingHorizontal: theme.horizontalScale(15),
        marginVertical: theme.verticalScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.COLORS.BUTTON_BG,
        alignSelf: 'center',
        borderRadius: theme.moderateScale(10),
    },
    conatiner6: {
        paddingLeft: theme.horizontalScale(20),
        width: '80%',
        alignItems: 'flex-start'
    },
    modalConatainer: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        flex: 1,
        width: '100%',
        borderRadius: 10,
    },
    modalSubConatiner: {
        alignSelf: 'center',
        justifyContent: 'center',
        width: '90%',
        backgroundColor: 'white',
        alignItems: 'center',
        padding: theme.moderateScale(15),
        borderRadius: theme.moderateScale(10)
    },
    modalTitleContainer: { width: '100%', alignItems: 'center' },
    modalTitle: {
        fontSize: theme.SIZES.LARGE,
        fontFamily: theme.FONTFAMILY.BOLD,
        fontWeight: 'bold',
        color: theme.COLORS.BLACK
    },
    modalContentContainer: {
        width: '90%', paddingVertical: 10, alignItems: 'center'
    },
    modalContentText: {
        fontFamily: theme.FONTFAMILY.MEDIUM,
        fontSize: theme.SIZES.BASE,
        color: theme.COLORS.BLACK
    },
    modalButtonContainer: {
        flexDirection: 'row', justifyContent: 'space-between', width: '80%'
    },
    modalCloseButton: {
        padding: theme.moderateScale(10)
    },
    modalCloseButtonText: {
        fontFamily: theme.FONTFAMILY.MEDIUM,
        fontSize: theme.SIZES.BASE,
        color: theme.COLORS.ERROR
    },
    modalOkButton: {
        padding: theme.moderateScale(10)
    },
    modalOkButtonText: {
        fontFamily: theme.FONTFAMILY.MEDIUM,
        fontSize: theme.SIZES.BASE,
        color: theme.COLORS.COLOR_PRIMARY
    }
});

export default styles;