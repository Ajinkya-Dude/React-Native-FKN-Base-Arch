import CheckBox, { CheckBoxProps } from "@react-native-community/checkbox";
import { View, Text, StyleSheet } from "react-native";
import theme from "../../theme";

interface CheckBoxInterface extends CheckBoxProps {
    type?: string;
    checkedColor?: string;
    lable?:string,
    checboxStyle?:any
}

const Checkbox = ({
    type,
    value,
    onValueChange,
    checkedColor,
    lable,
    checboxStyle
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
            />
            {lable && <Text style={style.lableStyle}>{lable}</Text>}
        </View>
    );
}

const style = StyleSheet.create({
  conatiner:{
    alignItems:'center',flexDirection:'row'
  },
  checboxStyle:{ marginRight: 10, margin: 5 },
  lableStyle:{
    fontSize:theme.SIZES.MEDIUM,
    fontFamily:theme.FONTFAMILY.MEDIUM,
    color:theme.COLORS.BLACK
  }

})

export default Checkbox;