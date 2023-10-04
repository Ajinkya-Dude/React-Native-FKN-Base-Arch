import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import theme from "../../theme";

interface ButtonProps {
    label: string;
    lableStyle?: TextStyle;
    buttonStyle?: ViewStyle;
    onClick: () => void;
}
const Button = ({
    label,
    lableStyle,
    buttonStyle,
    onClick,

}: ButtonProps) => {
    return (
        <TouchableOpacity onPress={onClick} style={[buttonStyle ? buttonStyle : styles.buttonContainer]}>
            <Text style={[lableStyle ? lableStyle : styles.buttonText]}>{label}</Text>
        </TouchableOpacity>
    );
}
export default Button;
const styles = StyleSheet.create({
    buttonContainer: {
        width: '70%',
        paddingVertical: theme.verticalScale(15),
        paddingHorizontal: theme.horizontalScale(15),
        marginVertical:theme.verticalScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.COLORS.BUTTON_BG,
        alignSelf: 'center',
        borderRadius: theme.moderateScale(10),
        // elevation: 16,
        // shadowColor: theme.COLORS.BLACK_LIGHT,
        // shadowOffset: {
        //     width: theme.horizontalScale(3),
        //     height: theme.verticalScale(3)
        // },
        // shadowOpacity: 0.6
    },
    buttonText: {
        fontSize: theme.SIZES.MEDIUM,
        color: theme.COLORS.WHITE,
        fontWeight: 'bold'
    }
});