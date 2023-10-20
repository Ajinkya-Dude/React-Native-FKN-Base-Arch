import { StyleSheet } from "react-native";
import theme from "../../theme";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: theme.COLORS.GRAY
    },
    subContainer:{ width: '100%',marginTop:20},
    userDetailContainer:{ alignItems: 'center', width: '100%',marginVertical:40 },
    userText:{ 
        color: theme.COLORS.BLACK,
        fontSize:theme.SIZES.MEDIUM
    },
    userTextValue:{ 
        color: theme.COLORS.BLACK,
        fontSize:theme.SIZES.BASE,
        fontFamily:theme.FONTFAMILY.BOLD,
        fontWeight:'bold'
    },
    checkBoxContainer:{ 
        width: '80%',
        margin:theme.moderateScale(10)
    },
    attentionContainer:{ 
        width: '90%',
        margin:theme.moderateScale(20)
    },
    attentionText:{
        color:theme.COLORS.BLACK,
        fontSize:theme.SIZES.MEDIUM
    }
});

export default styles;