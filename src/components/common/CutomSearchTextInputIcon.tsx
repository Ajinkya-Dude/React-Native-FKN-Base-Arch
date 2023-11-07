import { memo } from "react"
import { StyleSheet, TextInput } from "react-native";
import { View } from "react-native";
import theme from "../../theme";
import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from "react-native";

interface TextFieldIconProps {
    fieldName: string;
    value: string;
    onChangeFieldValue: (item2: string) => void;
    style?: any;
    onEraserClick?: (item2: string) => void;
    placeholder?:string;
}
const TextFieldIcon: React.FC<TextFieldIconProps> = ({
    fieldName = '',
    value,
    onChangeFieldValue,
    onEraserClick,
    placeholder
}) => {
    return (
        <TouchableOpacity onPress={() => onChangeFieldValue(fieldName)} style={styles.container}>
            <View style={{ flexDirection: 'row', width:onEraserClick ? '90%': '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Icon
                    name={'magnify'}
                    color={'black'}
                    size={25}
                />
                <Text
                    style={[styles.textInputStyle,{color:value ? theme.COLORS.BLACK  :theme.COLORS.GREY}]}
                    id={fieldName}
                >{value || placeholder}</Text>
            </View>
            {onEraserClick &&
                <TouchableOpacity onPress={()=>onEraserClick(fieldName)} style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                    <Icon
                        name={'eraser'}
                        color={'black'}
                        size={theme.moderateScale(25)}
                    />
                </TouchableOpacity>
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{ width: '100%', justifyContent: 'space-between', flexDirection: 'row',backgroundColor:theme.COLORS.WHITE,borderRadius: theme.moderateScale(10),paddingHorizontal: theme.horizontalScale(10),padding:theme.moderateScale(3)},
    textInputStyle: {
        width: '90%',
        padding: theme.moderateScale(5),
        paddingHorizontal: theme.horizontalScale(10),
        color: theme.COLORS.BLACK,
        fontSize: theme.SIZES.MEDIUM,
        // borderBottomWidth: 1,
        // borderBottomColor:theme.COLORS.BLACK,
    },
    iconContainer: {
        paddingLeft: 5,
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default memo(TextFieldIcon);