import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import theme from '../../theme';

interface CustomDropdownProps {
    options: { label: string; value: string }[];
    selectedValue: string;
    onSelect: (value: string) => void;
    dropStyle?: any;
    dropdownStyle?: any;
}

const Dropdown: React.FC<CustomDropdownProps> = ({
    options,
    selectedValue,
    onSelect,
    dropStyle,
    dropdownStyle
}) => {
    const [isModalVisible, setModalVisible] = useState<boolean>(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={styles.container}>
            <DropDownPicker
                maxHeight={200}
                items={options}
                open={isModalVisible}
                setOpen={setModalVisible}
                value={selectedValue}
                setValue={onSelect}
                style={dropStyle ? dropStyle : styles.dropDownText}
                dropDownContainerStyle={dropdownStyle ? dropdownStyle : styles.dropdownContainer}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: theme.moderateScale(5),
        justifyContent:'center',
        alignItems: 'center',
        zIndex:1,
        right:theme.horizontalScale(10)
    },
    dropDownText: {
        borderWidth: 0,
        width: '100%',
        alignSelf: 'flex-end',
        elevation:6,
        shadowColor:theme.COLORS.GRAY,
        shadowOffset:{width:10,height:10},
        shadowOpacity:0.3
    },
    dropdownContainer: {
        width: '100%',
        alignSelf: 'flex-end',
        borderWidth: 0,
        elevation:6,
        shadowColor:theme.COLORS.GRAY,
        shadowOffset:{width:10,height:10},
        shadowOpacity:0.3
    }

});

export default Dropdown;