import { memo } from "react"
import { StyleSheet, TextInput } from "react-native";
import { View } from "react-native";
import theme from "../../theme";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TextInputFieldProps {
    fieldName: string,
    value: any,
    onChangeFieldValue: (item1:any,item2:string) => void;
    style?: any,
    type?:string,
    maxLength?:number,
    placeholder?:string,
    editable?:boolean
}
const TextInputField: React.FC<TextInputFieldProps> = ({
    fieldName='',
    value,
    onChangeFieldValue,
    type,
    maxLength,
    placeholder,
    editable
}) => {
    return (
        <View style={{width:'100%'}}>
            <TextInput
                style={styles.textInputStyle}
                id={fieldName}
                value={value}
                onChangeText={(value)=>onChangeFieldValue(value,fieldName)}
                keyboardType={type}
                maxLength={maxLength || undefined}
                placeholder={placeholder}
                placeholderTextColor={theme.COLORS.GREY}
                editable={editable}
            />
        </View>
    );
}

const styles=StyleSheet.create({
    textInputStyle:{
        width: '100%',
        backgroundColor: theme.COLORS.WHITE,
        padding: theme.moderateScale(5),
        paddingHorizontal: theme.horizontalScale(10),
        borderRadius: theme.moderateScale(10),
        color: theme.COLORS.BLACK
    }
});

export default memo(TextInputField);