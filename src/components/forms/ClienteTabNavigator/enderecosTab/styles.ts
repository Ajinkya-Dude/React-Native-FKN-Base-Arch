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
    }
});

export default styles;