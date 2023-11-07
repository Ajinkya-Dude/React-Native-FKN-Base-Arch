import { memo } from "react"
import { StyleSheet, TextInput } from "react-native";
import { View } from "react-native";
import theme from "../../theme";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TextInputFieldIconProps {
    fieldName: string,
    value: string,
    onChangeFieldValue: (item1:any,item2:string) => void;
    style?: any,
    onIconClick?: (item:string) => void;
    type?:string,
    placeholderText?:string
}
const TextInputFieldIcon: React.FC<TextInputFieldIconProps> = ({
    fieldName='',
    value,
    onChangeFieldValue,
    onIconClick,
    type,
    placeholderText
}) => {
    return (
        <View style={{width:'100%',justifyContent:'space-between',flexDirection:'row',backgroundColor: theme.COLORS.WHITE,borderRadius: theme.moderateScale(10),paddingHorizontal: theme.horizontalScale(10),marginBottom:5}}>
            <TextInput
                style={styles.textInputStyle}
                id={fieldName}
                value={value}
                onChangeText={(value)=>onChangeFieldValue(value,fieldName)}
                keyboardType={type || 'default'}
                placeholder={placeholderText?placeholderText: ''}
                placeholderTextColor={theme.COLORS.GREY}
            />
            <TouchableOpacity onPress={()=>onIconClick(fieldName)} style={styles.iconContainer}>
                <Icon
                    name={fieldName=== 'cpfcnpj' ?'magnify': 'phone'}
                    color={'black'}
                    size={25}
                />
            </TouchableOpacity>
        </View>
    );
}

const styles=StyleSheet.create({
    textInputStyle:{
        width: '90%',
        padding: theme.moderateScale(5),
        color: theme.COLORS.BLACK
    },
    iconContainer:{ 
        paddingLeft: 5, 
        width: '10%',
        alignItems:'center',
        justifyContent:'center' 
    }
});

export default memo(TextInputFieldIcon);