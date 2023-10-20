import { Dimensions, StyleSheet } from "react-native";
import theme from "./theme";
const { width, height } = Dimensions.get('window');

const style = StyleSheet.create({
    appBarStyles: {
        width: width,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        backgroundColor: theme.COLORS.GREEN_DARK,
        height: theme.verticalScale(60)
    },
    drawerIconStyle: {
        color: theme.COLORS.GREEN_DARK
    },
    appSearchBar: {
        width: '55%',
        marginLeft: '10%',
        borderBottomWidth: 0.5,
        borderBottomColor: theme.COLORS.BLACK,
        flexDirection: 'row'
    },
    appSearchTextInput: {
        paddingVertical: 0,
        color: theme.COLORS.BLACK,
        fontSize: theme.SIZES.MEDIUM,
        width: '85%'
    },
    modalConatainer:{
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        flex: 1,
        width: '100%',
        borderRadius: theme.moderateScale(10),
    },
    modalSubConatiner:{
        alignSelf: 'center',
        justifyContent: 'center',
        width: '90%',
        backgroundColor: 'white',
        alignItems: 'center',
        padding: theme.moderateScale(15),
        borderRadius:theme.moderateScale(10)
    },
    modalTitleContainer:{width:'100%',alignItems:'center'},
    modalTitle:{
        fontSize:theme.SIZES.LARGE,
        fontFamily:theme.FONTFAMILY.BOLD,
        fontWeight:'bold',
        color:theme.COLORS.BLACK
    },
    modalContentContainer:{
        width:'90%',padding:10,alignItems:'flex-start'
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

export default style;