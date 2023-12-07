import CheckBox, { CheckBoxProps } from "@react-native-community/checkbox";
import { View, Text, StyleSheet, Platform } from "react-native";
import theme from "../../theme";

interface CheckBoxInterface extends CheckBoxProps {
    type?: string;
    checkedColor?: string;
    lable?:string,
    checboxStyle?:any,
    disabled?:boolean
}

const Checkbox = ({
    type,
    value,
    onValueChange,
    checkedColor,
    lable,
    checboxStyle,
    disabled
}: CheckBoxInterface) => {
    return (
        <View style={style.conatiner}>
            <CheckBox
                value={value}
                onValueChange={onValueChange}
                boxType={type ? type : 'square'}
                style={checboxStyle ? checboxStyle : style.checboxStyle}
                onTintColor={checkedColor ? checkedColor : '#398F5A'}
                onCheckColor={checkedColor ? checkedColor : '#398F5A'}
                tintColors={{ true: checkedColor ? checkedColor : '#398F5A', false: '' }}
                disabled={disabled}
            />
            {lable && <Text style={style.lableStyle}>{lable}</Text>}
        </View>
    );
}

const style = StyleSheet.create({
  conatiner:{
    alignItems:'center',flexDirection:'row'
  },
  checboxStyle:{ marginRight: 10, margin: 5,transform: [{ scale: theme.moderateScale((Platform.OS === 'ios' ? 15 :20))/ theme.moderateScale(20) }] },
  lableStyle:{
    fontSize:theme.SIZES.MEDIUM,
    fontFamily:theme.FONTFAMILY.MEDIUM,
    color:theme.COLORS.BLACK,
    width:'100%'
  }

})

export default Checkbox;