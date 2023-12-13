import { StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: theme.COLORS.GRAY
    },
    fab: {
        position: 'absolute',
        marginHorizontal: 16,
        marginVertical: 30,
        right: 0,
        bottom: 0,
        backgroundColor: theme.COLORS.GREEN_DARK,
        borderRadius: 50
    },
    // Render Cliente Style 
    mainTileContainer: {
        width: '90%',
        padding: theme.moderateScale(10),
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
    labelValueContainer: {
        flexDirection: 'row',
        borderRadius: theme.moderateScale(5),
        margin: theme.moderateScale(3),
        paddingHorizontal: theme.moderateScale(3),
        alignItems: 'center',
    },
    textLabelTile: {
        fontFamily: theme.FONTFAMILY.MEDIUM,
        fontSize: theme.SIZES.MEDIUM,
        color: theme.COLORS.BLACK
    },
    textValueTile: {
        fontFamily: theme.FONTFAMILY.MEDIUM,
        fontSize: theme.SIZES.MEDIUM,
        color: theme.COLORS.BLACK
    },
    emptyTextTile: {
        fontFamily: theme.FONTFAMILY.MEDIUM,
        fontSize: theme.SIZES.LARGE,
        color: theme.COLORS.BLACK,
        fontWeight:'bold'
    },
});

export default styles;