import { memo, useState } from "react";
import { FlatList, Modal, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import style from "../../styles";
import theme from "../../theme";
import { FKNconstants } from "../constants";
import Checkbox from "./Checkbox";

interface FilterInterface {
    visible: boolean;
    data?: any[];
    onModalClose: () => void;
    navigation?: any,
    onCleanFilter?: any,
    onFilterCheckboxChecked?: any,
    checkboxChecked?: boolean
}
const FilterModal = ({
    visible,
    data,
    onModalClose,
    navigation,
    onCleanFilter,
    onFilterCheckboxChecked,
    checkboxChecked
}: FilterInterface) => {
    const onFilterItemSelect = (item: any) => {
        if (item.name === 'filterLimpar') {
            onCleanFilter();
        } else if (!item.checkBox) {
            navigation.navigate(`${item.name}`);
            onModalClose();
        } else {

        }
    }
    return (
        <Modal
            animationType={'fade'}
            visible={visible}
            transparent={true}
            onRequestClose={onModalClose}
        >
            <TouchableOpacity  onPress={onModalClose} style={[styles.modalConatainer, { paddingTop: Platform.OS === 'ios' ? 30 : 10 }]}>
                    <View
                        style={styles.modalSubConatiner}
                    >
                        <View style={styles.modalContentContainer}>
                            <FlatList
                                data={data}
                                keyExtractor={(item) => item.value}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity onPress={() => { onFilterItemSelect(item) }} style={styles.customRadioButtonContainer}>
                                            <Text style={styles.label}>{item.label}</Text>
                                            {item.checkBox && <Checkbox value={checkboxChecked} onValueChange={(newValue) => { onFilterCheckboxChecked(newValue) }} />}
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        </View>
                    </View>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalConatainer: {
        alignSelf: 'center',
        flex: 1,
        width: '100%',
        paddingTop: 10
    },
    modalSubConatiner: {
        alignSelf: 'flex-end',
        justifyContent: 'center',
        right: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        paddingHorizontal: theme.moderateScale(15),
        borderRadius: theme.moderateScale(10)
    },
    modalTitleContainer: { width: '100%', alignItems: 'center' },
    modalTitle: {
        fontSize: theme.SIZES.LARGE,
        fontFamily: theme.FONTFAMILY.BOLD,
        fontWeight: 'bold',
        color: theme.COLORS.BLACK
    },
    modalContentContainer: {
        width: '90%', padding: 10, alignItems: 'flex-start'
    },
    label: {
        fontSize: theme.SIZES.MEDIUM,
        fontFamily: theme.FONTFAMILY.BLACK,
        color: theme.COLORS.BLACK
    },
    customRadioButtonContainer: {
        flexDirection: 'row',
        paddingVertical: theme.moderateScale(10),
        alignItems: 'center'
    }
})

export default memo(FilterModal);